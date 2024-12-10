import { useLazyQuery } from '@apollo/client'
import { SearchGaragesDocument } from '@autospace/network/src/gql/generated'
import { useEffect } from 'react'
// import { useFormContext } from 'react-hook-form'
import { GarageMarker } from './GarageMarker'
// import { FormTypeSearchGarage } from '@autospace/forms/src/searchGarages'
import { useConvertSearchFormToVariables } from '@autospace/forms/src/adapters/searchFormAdapter'
import { Panel } from '../map/Panel'
import { Loader } from '../../molecules/Loader'
import { IconInfoCircle } from '@tabler/icons-react'

export const ShowGarages = () => {
    const [searchGarages, {
        loading,
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

    if (data?.searchGarages.length === 0) {
        return (
            <Panel position='center-center'
                className='bg-white/50 shadow border-white border backdrop-blur-sm'
            >
                <div className='flex items-center justify-center gap-2'>
                    <IconInfoCircle /> <div>No Parking slots found in this area.</div>
                </div>
            </Panel>
        )
    }
    return (
        <>
            {loading ? (
                <Panel position='center-bottom'>
                    <Loader />
                </Panel>
            ) : null}
            {data?.searchGarages.map((garage) => (
                <GarageMarker key={garage.id} marker={garage} />
            ))}
        </>
    )
}