import { LocationInfo, ViewState } from '@autospace/util/types'
import { useMap } from 'react-map-gl'
import { Autocomplete } from '../../atoms/Autocomplete'
import { majorCitiesLocationInfo } from '@autospace/util/constants'
import { useSearchLocation } from '@autospace/util/hooks/location'

export const SearchPlaceBox = ({
    onLocationChange
}: {
    onLocationChange?: (location: ViewState) => void
}) => {
    // this comp use inside the MAP, so we can use as a children 
    const { current: map } = useMap();
    const { loading, setLoading, searchText, setSearchText, locationInfo } = useSearchLocation()

    // <Autocomplete<LocationInfo>> uses ->
    // TypeScript generics to enforce that the options provided match the LocationInfo structure

    return (
        <Autocomplete<LocationInfo>
            options={locationInfo?.length ? locationInfo : majorCitiesLocationInfo}
            isOptionEqualToValue={(option, value) =>
                option.placeName === value.placeName // selected value is obj, this we we check selected value.
            }
            noOptionsText={searchText ? 'No options.' : 'Type something...'}
            getOptionLabel={(x) => x.placeName}
            onInputChange={(_, v) => {
                setLoading(true)
                setSearchText(v)
            }}
            loading={loading}
            onChange={async (_, v) => {
                if (v) {
                    const { latLng,
                        //    placeName
                    } = v
                    await map?.flyTo({
                        center: { lat: latLng[0], lng: latLng[1] },
                        zoom: 12,
                        // essential: true  -- animations
                    })
                    if (onLocationChange) {
                        // think -> call 'searchGerage query'
                        onLocationChange({ latitude: latLng[0], longitude: latLng[1] })
                    }
                }

            }}
        />
    )

}