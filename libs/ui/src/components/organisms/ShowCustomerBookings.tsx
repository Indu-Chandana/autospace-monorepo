import { BookingsForCustomerDocument, BookingStatus } from "@autospace/network/src/gql/generated"
import { useTakeSkip } from "@autospace/util/hooks/pagination"
import { useSession } from "next-auth/react"
import { useQuery } from '@apollo/client'
import { ShowData } from "./ShowData"
import { CustomerBookingCard } from "./CustomerBookingCard"

export const ShowCustomerBookings = ({ statuses }: {
    statuses: BookingStatus[]
}) => {
    const session = useSession()
    const uid = session.data?.user?.uid

    const { skip, take, setTake, setSkip } = useTakeSkip()

    const { data, loading, error } = useQuery(BookingsForCustomerDocument, {
        variables: {
            skip,
            take,
            where: {
                customerId: { equals: uid },
                status: { in: statuses }
            }
        }
    })


    return (
        <ShowData
            error={error?.message}
            loading={loading}
            pagination={{
                skip,
                take,
                setSkip,
                setTake,
                resultCount: data?.bookingsForCustomer.length || 0,
                totalCount: data?.bookingsCount.count || 0
            }}
        >
            {data?.bookingsForCustomer.map((booking) => (
                <CustomerBookingCard key={booking.id} booking={booking} />
            ))}

        </ShowData>
    )
}