import React from 'react'
import { IsLoggedIn } from '@autospace/ui/src/components/organisms/IsLoggedIn'
import { ListCustomerBookings } from '@autospace/ui/src/components/templates/ListCustomerBookings'

const page = () => {
  return (
    <IsLoggedIn>
      <ListCustomerBookings />
    </IsLoggedIn>
  )
}
export default page
