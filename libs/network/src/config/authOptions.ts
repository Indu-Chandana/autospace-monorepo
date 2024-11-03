import { getServerSession, NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthProviderType, GetAuthProviderDocument, LoginDocument, RegisterWithProviderDocument } from '@autospace/network/src/gql/generated'
import { fetchGraphQL } from '../fetch'
import { sign, verify } from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt'

const MAX_AGE = 1 * 24 * 60 * 60

export const authOptions: NextAuthOptions = {
    // Configure authentication providers
    providers: [
        // Google OAuth provider configuration
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),

        // Credentials provider configuration for email/password authentication
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            // Authorize function to validate user credentials
            async authorize(credentials) {
                // Implement credential validation logic
                if (!credentials) {
                    throw new Error('Email and Password are required')
                }

                const { email, password } = credentials

                try {
                    const { data, error } = await fetchGraphQL({
                        document: LoginDocument,
                        variables: { loginInput: { email, password } }
                    })

                    if (!data?.login.token || error) {
                        throw new Error('Authentication failed: Invalid credentials or user not found')
                    }

                    const uid = data.login.user.uid
                    const image = data.login.user.image
                    const name = data.login.user.name

                    return { id: uid, name, image, email }
                } catch (error) {

                }
                return null
            }
        })
    ],

    // Enable debug mode for development
    debug: true,

    // Configure session settings
    session: {
        strategy: 'jwt',
        maxAge: MAX_AGE
    },

    // Configure JWT settings
    jwt: {
        maxAge: MAX_AGE,
        // Custom JWT encoding function
        async encode({ token, secret }): Promise<string> {
            // Implement custom JWT encoding logic

            // 'secret' -> coming from web/.env "NEXTAUTH_SECRET" 
            // (Next auth check that is in their and it has to be name 'NEXTAUTH_SECRET')

            if (!token) {
                throw new Error('Token is undefined')
            }

            console.group('JWT encode')
            console.log('token', token)
            console.groupEnd()

            const { sub, ...tokenProps } = token
            const nowInSeconds = Math.floor(Date.now() / 1000)
            const expirationTimestamp = nowInSeconds + MAX_AGE

            return sign(
                { uid: sub, ...tokenProps, exp: expirationTimestamp },
                secret,
                { algorithm: 'HS256' }
            )

        },
        // Custom JWT decoding function
        async decode({ token, secret }): Promise<JWT | null> {
            // Implement custom JWT decoding logic
            if (!token) {
                throw new Error('Token is undefine')
            }
            try {
                const decodeToken = verify(token, secret, {
                    algorithms: ['HS256']
                })
                console.group('JWT decode')
                console.log('token', token)
                console.log('decodeToken', decodeToken)
                console.groupEnd()
                return decodeToken as JWT
            } catch (error) {
                console.error('JWT decode error', error)
                return null
            }
        }
    },

    // Configure callback functions
    callbacks: {
        // Sign-in callback
        async signIn({ user, account }) {
            // Implement sign-in logic, e.g: create user in database
            if (account?.provider === 'google') {
                const { id, name, image } = user

                const existingUser = await fetchGraphQL({
                    document: GetAuthProviderDocument,
                    variables: {
                        uid: id
                    }
                })

                if (!existingUser.data?.getAuthProvider?.uid) {
                    const newUser = await fetchGraphQL({
                        document: RegisterWithProviderDocument,
                        variables: {
                            registerWithProviderInput: {
                                uid: id,
                                type: AuthProviderType.Google,
                                image,
                                name: name || ''
                            }
                        }
                    })
                }

                console.log('SignIn with Google Done.')
            }
            return true
        },
        // Session callback
        async session({ token, session }) {
            // Customize session object based on token data

            if (token) {
                session.user = {
                    name: token.name,
                    email: token.email,
                    image: token.picture,
                    uid: (token.uid as string) || ''
                }
            }

            return session
        }
    },

    // Configure custom pages
    pages: {
        signIn: '/signIn'
    }
}

export const getAuth = () => getServerSession(authOptions)

// this is how we access authenticated user data in the |server| components
// for the client components we will use useSession from the 'next-auth'
// const {} = await getAuth()
