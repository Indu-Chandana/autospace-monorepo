import { BookingsForGarageDocument, BookingStatus, QueryMode } from "@autospace/network/src/gql/generated"
import { IconSearch } from "@tabler/icons-react"
import { useState } from "react"
import { ShowData } from "./ShowData"
import { useTakeSkip } from "@autospace/util/hooks/pagination"
import { useQuery } from '@apollo/client'
import { ManageBookingCard } from "./ManageBookingCard"
import { CheckInOutButton } from "./CheckInOutButtons"

export const ShowGarageBookings = ({
    garageId,
    statuses,
    showCheckIn = false,
    showCheckOut = false
}: {
    garageId: number
    statuses: BookingStatus[]
    showCheckIn?: boolean
    showCheckOut?: boolean
}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const { take, skip, setTake, setSkip } = useTakeSkip()

    const { data, loading,
        //  error
    } = useQuery(BookingsForGarageDocument, {
        variables: {
            garageId,
            skip,
            take,
            where: {
                status: { in: statuses },
                ...(searchTerm && {
                    vehicleNumber: {
                        contains: searchTerm,
                        mode: QueryMode.Insensitive // doesn't matter if it is (lower or upper)
                    }
                })
            }
        }
    })

    // console.log('data', data)
    return (
        <div className="mt-4">
            <div className="flex justify-center">
                {/* Search Box */}
                <div className="flex justify-start items-center gap-2 w-full max-w-xl rounded-full shadow-xl bg-white px-2">
                    <IconSearch />
                    <input
                        placeholder="Search vehicle number"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow py-4 bg-transparent outline-none"
                    />
                </div>
            </div>
            <ShowData
                loading={loading}
                pagination={{
                    skip,
                    take,
                    resultCount: data?.bookingsForGarage.length,
                    totalCount: data?.bookingsCount.count,
                    setSkip,
                    setTake
                }}
            >
                {data?.bookingsForGarage.map((booking) => (
                    <div key={booking.id}>
                        {/* ALl the info about booking */}
                        <ManageBookingCard booking={booking} />
                        {showCheckIn ? <CheckInOutButton
                            bookingId={booking.id}
                            buttonText="CHECK IN"
                            status={BookingStatus.CheckedIn}
                        /> : null}

                        {showCheckOut ? <CheckInOutButton
                            bookingId={booking.id}
                            buttonText="CHECK OUT"
                            status={BookingStatus.CheckedOut}
                        /> : null}
                    </div>
                ))}
            </ShowData>
        </div>
    )
}