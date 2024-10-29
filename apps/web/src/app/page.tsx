'use client'
import { add } from '@autospace/sample-lib'
import { useMutation, useQuery } from '@apollo/client' // we warp 'lib/network' with lauout.tsx then we can use 'network' dependencies.

import {
  RegisterWithCredentialsDocument,
  CompaniesDocument,
} from '@autospace/network/src/gql/generated'

export default function Home() {
  const [, { data: regData }] = useMutation(RegisterWithCredentialsDocument)
  const { data, loading } = useQuery(
    CompaniesDocument, // token need to be provide
    //   , {  -------- also we can do sorting stuff  --------
    //   variables: { skip: 1, take: 1, where: { Garages: { some: {} } } }
    // }
  )

  console.log('data', data)

  return (
    <main className="bg-primary">
      Hello {add(222, 2)}
      <div>
        {data?.companies.map((company) => (
          <div className="p-4 rounded m-4" key={company.id}>
            {company.displayName}
          </div>
        ))}
      </div>
    </main>
  )
}
