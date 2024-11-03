'use client'
import { add } from '@autospace/sample-lib'
import { useMutation, useQuery } from '@apollo/client' // we warp 'lib/network' with lauout.tsx then we can use 'network' dependencies.

import {
  RegisterWithCredentialsDocument,
  CompaniesDocument,
} from '@autospace/network/src/gql/generated'
import { BrandIcon } from '@autospace/ui/src/components/atoms/BrandIcon'
import { Button } from '@autospace/ui/src/components/atoms/Button'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  const [, { data: regData }] = useMutation(RegisterWithCredentialsDocument)
  const { data, loading } = useQuery(
    CompaniesDocument, // token need to be provide
    //   , {  -------- also we can do sorting stuff  --------
    //   variables: { skip: 1, take: 1, where: { Garages: { some: {} } } }
    // }
  )
  const { data: sessionData, status } = useSession()

  console.log('data', data)

  return (
    <main className="">
      {sessionData?.user?.uid ? (
        <Button onClick={() => signOut()}>SignOut</Button>
      ) : (
        <Link href="/login">Login</Link>
      )}
      <BrandIcon />
      <Button>Hello</Button>
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
