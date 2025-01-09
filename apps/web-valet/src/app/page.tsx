'use client'
import React from 'react'
import { IsLoggedIn } from '@autospace/ui/src/components/organisms/IsLoggedIn'
import { IsValet } from '@autospace/ui/src/components/organisms/IsValet'
import { ListGarages } from '@autospace/ui/src/components/organisms/ListGarages'
// return <IsLoggedIn>{(uid) => <div>{uid}</div>}</IsLoggedIn>

const Home = () => {
  return (
    <IsLoggedIn>
      {(uid) => (
        <IsValet uid={uid}>
          {(companyId) => (
            <>
              <h1>Heloo {companyId}</h1>
            </>
          )}
        </IsValet>
      )}
    </IsLoggedIn>
  )
}

export default Home
