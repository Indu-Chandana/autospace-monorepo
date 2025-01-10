'use client'
import React from 'react'
import { IsLoggedIn } from '@autospace/ui/src/components/organisms/IsLoggedIn'
import { IsValet } from '@autospace/ui/src/components/organisms/IsValet'
import { ValetHome } from '@autospace/ui/src/components/templates/ValetHome'
// return <IsLoggedIn>{(uid) => <div>{uid}</div>}</IsLoggedIn>

const Home = () => {
  return (
    <IsLoggedIn>
      {(uid) => (
        <IsValet uid={uid}>
          {(companyId) => <ValetHome companyId={companyId} />}
        </IsValet>
      )}
    </IsLoggedIn>
  )
}

export default Home
