import { FormTypeCreateGarage } from "@autospace/forms/src/createGarage";
import { useWatch, useFormContext } from 'react-hook-form'
import { Marker } from "./map/MapMarker";
import { ParkingIcon } from "../atoms/ParkingIcon";

export const GarageMapMarker = () => {
    const { location } = useWatch<FormTypeCreateGarage>() // need to get info about map
    const { setValue } = useFormContext<FormTypeCreateGarage>()

    return (
        <Marker
            pitchAlignment="auto"
            longitude={location?.lng || 0}
            latitude={location?.lat || 0}
            draggable
            onDragEnd={({ lngLat }) => {
                const { lat, lng } = lngLat
                setValue('location.lat', lat || 0)
                setValue('location.lng', lng || 0)
            }}
        >
            <ParkingIcon />
        </Marker>
    )
}