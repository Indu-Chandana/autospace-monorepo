import { useTakeSkip } from "@autospace/util/hooks/pagination"
import { ShowData } from "./ShowData"
import { useQuery } from '@apollo/client'
import { ValetPickupsDocument } from "@autospace/network/src/gql/generated"
import { ValetTripCard } from "./ValetTripCard"

// ALL -> PickupTrips
export const ShowValetAllPickupTrips = () => {
    const { data, loading, error } = useQuery(ValetPickupsDocument)
    const { skip, take, setSkip, setTake } = useTakeSkip()

    return (
        <ShowData
            loading={loading}
            error={error?.message}
            pagination={{
                skip,
                take,
                setSkip,
                setTake,
                resultCount: data?.valetPickups.length || 0,
                totalCount: data?.valetPickupsTotal || 0
            }}
        // title='Pickups'
        >
            {data?.valetPickups.map((booking) => (
                <ValetTripCard
                    key={booking.id}
                    booking={{
                        id: booking.id,
                        time: booking.startTime
                    }}
                    start={{
                        lat: booking.valetAssignment?.pickupLat,
                        lng: booking.valetAssignment?.pickupLng
                    }}
                    end={booking.slot.garage.address}
                >
                    <div>Hello</div>
                </ValetTripCard>
            ))}
        </ShowData>
    )
}