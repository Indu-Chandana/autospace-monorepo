'use client'
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider as Provider } from '@apollo/client'
import { ReactNode } from 'react' // installed 'react' as a --peer dependency
import { setContext } from '@apollo/client/link/context'

export interface IApolloProviderProps {
    children: ReactNode
}

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
    const httpLink = new HttpLink({
        uri: process.env.NEXT_PUBLIC_API_URL + '/graphql'
    })
    const authLink = setContext(async (_, { headers }) => {
        const token = await fetch('/api/auth/token').then((res) => res.json())
        // cookie is typically HttpOnly, meaning it is inaccessible to client-side JavaScript.
        // Accessing cookies directly on the client can be tricky due to security concerns.

        console.log('token', token)
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            }
        }
    })

    const apolloClient = new ApolloClient({
        link: authLink.concat(httpLink),
        // link: httpLink,
        cache: new InMemoryCache()
    })

    return <Provider client={apolloClient}>{children}</Provider>
}