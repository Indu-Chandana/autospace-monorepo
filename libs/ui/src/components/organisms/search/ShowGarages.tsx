import { useLazyQuery } from '@apollo/client'
import { SearchGaragesDocument } from '@autospace/network/src/gql/generated'
import { useEffect } from 'react'
// import { useFormContext } from 'react-hook-form'
import { GarageMarker } from './GarageMarker'
// import { FormTypeSearchGarage } from '@autospace/forms/src/searchGarages'
import { useConvertSearchFormToVariables } from '@autospace/forms/src/adapters/searchFormAdapter'

export const ShowGarages = () => {
    const [searchGarages, {
        //loading,
        data,
        // error
    }] = useLazyQuery(SearchGaragesDocument)

    // const { watch } = useFormContext<FormTypeSearchGarage>()
    // const { endTime: end, startTime: start, locationFilter } = watch()

    const { variables } = useConvertSearchFormToVariables() // we can get form data inside the hook

    useEffect(() => {
        if (variables) { searchGarages({ variables }) }

        // searchGarages({
        // variables: {
        //     dateFilter: { end, start },
        //     locationFilter
        // }
        // })
        // }, [end, locationFilter, searchGarages, start])
    }, [searchGarages, variables])

    return (
        <>
            {data?.searchGarages.map((garage) => (
                <GarageMarker key={garage.id} marker={garage} />
            ))}
        </>
    )
}