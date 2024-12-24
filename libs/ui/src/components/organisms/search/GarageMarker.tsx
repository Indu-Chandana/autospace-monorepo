import { useWatch } from 'react-hook-form'
import { SearchGaragesQuery } from "@autospace/network/src/gql/generated"
import { useState } from "react"
import { useKeypress } from '@autospace/util/hooks/keys'
import { FormTypeSearchGarage } from "@autospace/forms/src/searchGarages"
import { Dialog } from '../../atoms/Dialog'
import { Marker } from '../map/MapMarker'
import { ParkingIcon } from '../../atoms/ParkingIcon'
import { FormProviderBookSlot } from '@autospace/forms/src/bookSlot'
import BookSlotPopup from '../BookSlotPopup'

export const GarageMarker = ({
    marker
}: {
    marker: SearchGaragesQuery['searchGarages'][number]
}) => {
    const [showPopup, setShowPopup] = useState(false)
    useKeypress(['Escape'], () => setShowPopup(false))

    const { endTime, startTime } = useWatch<FormTypeSearchGarage>()

    if (!marker.address?.lat || !marker.address.lng) {
        return null
    }

    return (
        <>
            <Dialog
                title='Booking'
                widthClassName='max-w-3xl'
                open={showPopup}
                setOpen={setShowPopup}
            >
                <FormProviderBookSlot defaultValues={{ startTime, endTime }}>
                    <BookSlotPopup garage={marker} />
                </FormProviderBookSlot>
            </Dialog>

            <Marker
                latitude={marker.address.lat}
                longitude={marker.address.lng}
                onClick={(e) => {
                    e.originalEvent.stopPropagation()
                    setShowPopup((state) => !state)
                }}
            >
                <ParkingIcon />
            </Marker>
        </>
    )
}