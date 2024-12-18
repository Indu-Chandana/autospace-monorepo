'use client'
import React from 'react'
import { IsLoggedIn } from '@autospace/ui/src/components/organisms/IsLoggedIn'
import { IsManager } from '@autospace/ui/src/components/organisms/IsManager'
import { ListGarages } from '@autospace/ui/src/components/organisms/ListGarages'
// return <IsLoggedIn>{(uid) => <div>{uid}</div>}</IsLoggedIn>

const Home = () => {
  return (
    <IsLoggedIn>
      <IsManager>
        {(companyId) => <ListGarages companyId={companyId} />}
      </IsManager>
    </IsLoggedIn>
  )
}

export default Home
