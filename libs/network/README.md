This dev dependency, we are not going to use this in runtime.
"@apollo/client" -> using it in run time.

yarn add react --peer
yarn codegen

How this work...
1. have to copy gql operation from "Apollo | Explore | Sandbox"

2. paste that in the 'queries.graphql'

3. run -> 'yarn codegen' (this will create typesafe code in gql/generated.tsx)
4. then we can use in app/web (because we wrap the entire app with Apollo Provider and also we can use 'lib/network' dependencies in web because we wrap)
----------------------------
 const [, { data: regData }] = useMutation(RegisterWithCredentialsDocument)

  const { data, loading } = useQuery(CompaniesDocument , {
     variables: { skip: 1, take: 1, where: { Garages: { some: {} } } }
     }
  )
----------------------------

