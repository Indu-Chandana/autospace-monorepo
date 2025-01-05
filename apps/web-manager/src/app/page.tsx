'use client'
import React from 'react'
import { IsLoggedIn } from '@autospace/ui/src/components/organisms/IsLoggedIn'
import { IsManager } from '@autospace/ui/src/components/organisms/IsManager'

// return <IsLoggedIn>{(uid) => <div>{uid}</div>}</IsLoggedIn>

const Home = () => {
  return (
    <IsLoggedIn>
      <IsManager>Hello</IsManager>
    </IsLoggedIn>
  )
}

export default Home
