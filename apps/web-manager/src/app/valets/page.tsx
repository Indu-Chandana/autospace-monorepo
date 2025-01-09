import { IsLoggedIn } from '@autospace/ui/src/components/organisms/IsLoggedIn'
import ManageValets from '@autospace/ui/src/components/templates/ManageValets'

export default function Page() {
  return (
    <>
      <IsLoggedIn>
        <ManageValets />
      </IsLoggedIn>
    </>
  )
}
