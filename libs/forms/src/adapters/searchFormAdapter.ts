import { useEffect, useState } from 'react'
import { FormTypeSearchGarage } from '../searchGarages'
import { SearchGaragesQueryVariables } from '@autospace/network/src/gql/generated'
import { FieldNamesMarkedBoolean, useFormContext, useWatch } from 'react-hook-form'
import { useDebounce } from '@autospace/util/hooks/async'
import { intFilter } from './util'

type FormData = Partial<
    Pick<
        FormTypeSearchGarage,
        | 'endTime'
        | 'startTime'
        | 'height'
        | 'length'
        | 'width'
        | 'pricePerHour'
        | 'types'
        | 'locationFilter'
        | 'skip'
        | 'take'
    >>

export const useConvertSearchFormToVariables = () => {
    const [variables, setVariables] = useState<SearchGaragesQueryVariables | null>(null)

    const {
        formState: { dirtyFields },  // user does not some filters. we can check from it. 'pricePerHOur'
        watch
    } = useFormContext<FormTypeSearchGarage>()

    const formData = watch()

    const debouncedFormData = useDebounce(formData, 400)

    useEffect(() => {

        const {
            endTime, startTime, locationFilter,
            length, width, height, pricePerHour, types,
            skip, take
        } = debouncedFormData

        const dateFilter: SearchGaragesQueryVariables['dateFilter'] = {
            start: startTime,
            end: endTime
        }

        // this is optional so, we need to check before get from the DB
        const slotsFilter = createSlotFilter(dirtyFields, {
            length,
            width,
            height,
            pricePerHour,
            types
        })

        const garagesFilter = createGaregesFilter(dirtyFields, { skip, take })

        setVariables({
            dateFilter,
            locationFilter,
            ...(Object.keys(slotsFilter).length && { slotsFilter }),
            ...(Object.keys(garagesFilter).length && { garagesFilter })
        })
    }, [debouncedFormData])


    return { variables }
}

//////////////////////////////////////
export const createSlotFilter = (
    dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchGarage>,
    formData: FormData
) => {

    const length = dirtyFields.length && intFilter(formData.length)
    const width = dirtyFields.width && intFilter(formData.width)
    const height = dirtyFields.height && intFilter(formData.height)
    const pricePerHour = dirtyFields.pricePerHour && intFilter(formData.pricePerHour)
    const type = dirtyFields.types && { in: formData.types }

    return {
        ...(length && { length }),
        ...(width && { width }),
        ...(height && { height }),
        ...(pricePerHour && { pricePerHour }),
        ...(type && { type })
    }
}

//////////////////////////////////////
export const createGaregesFilter = (
    dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchGarage>,
    formData: FormData
) => {
    const skip = (dirtyFields.skip && formData.skip) || 0
    const take = (dirtyFields.take && formData.take) || 10

    return {
        ...(skip && { skip }),
        ...(take && { take })
    }
}