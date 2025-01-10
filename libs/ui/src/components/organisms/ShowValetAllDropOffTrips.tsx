import { useQuery } from '@apollo/client'
import { ValetDropsDocument } from '@autospace/network/src/gql/generated'
import { useTakeSkip } from '@autospace/util/hooks/pagination'
import { ShowData } from './ShowData'
import { ValetTripCard } from './ValetTripCard'

// ALL -> DropOffTrips

export const ShowValetAllDropOffTrips = () => {
    const { data, loading, error } = useQuery(ValetDropsDocument)
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
                resultCount: data?.valetDrops.length,
                totalCount: data?.valetDropsTotal
            }}
        >
            {data?.valetDrops.map((booking) => (
                <ValetTripCard
                    key={booking.id}
                    booking={{
                        id: booking.id,
                        time: booking.endTime
                    }}
                    end={{ // end with return lat
                        lat: booking.valetAssignment?.returnLat || undefined, // {lat, lng} normally we created type partial, but it complaining -> "It can not be null" so we added, if it is NULL we change it to undefine (not GOOD way) 
                        lng: booking.valetAssignment?.returnLng || undefined
                    }}
                    start={booking.slot.garage.address} // start from garage
                />
            ))}
        </ShowData>
    )
}