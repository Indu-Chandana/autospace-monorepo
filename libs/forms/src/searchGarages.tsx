
import { SlotType } from '@autospace/network/src/gql/generated'
import { z } from 'zod'
import { toLocalISOString } from '@autospace/util/date'
import { ReactNode } from 'react'
import { DefaultValues, useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isEndTimeValid, isStartTimeValid } from './util'

const minMaxTuple = z.tuple([z.number(), z.number()])

export const formSchemaSearchGarage = z.object({
    startTime: z.string(),
    endTime: z.string(),

    locationFilter: z.object({
        ne_lat: z.number(),
        ne_lng: z.number(),
        sw_lat: z.number(),
        sw_lng: z.number()
    }),

    types: z.nativeEnum(SlotType).array(),

    pricePerHour: minMaxTuple.optional(),
    height: minMaxTuple.optional(),
    width: minMaxTuple.optional(),
    length: minMaxTuple.optional(),

    skip: z.number().optional(),
    take: z.number().optional()
})

export type FormTypeSearchGarage = z.infer<typeof formSchemaSearchGarage>

// const isStartTimeValid = (data: FormTypeSearchGarage) => {
//     const startDate = new Date(data.startTime)
//     const currentDate = new Date()
//     return startDate > currentDate
// }

// const isEndTimeValid = (data: FormTypeSearchGarage) => {
//     const startDate = new Date(data.startTime)
//     const endDate = new Date(data.endTime)
//     return endDate > startDate
// }

// ------- custom validation -------
formSchemaSearchGarage
    .refine(({ startTime }) => isStartTimeValid(startTime), {
        message: 'Start time should be greater than current time',
        path: ['startTime']
    })
    .refine(({ startTime, endTime }) => isEndTimeValid({ startTime, endTime }), {
        message: 'End time should be greater than start time',
        path: ['endTime']
    })

export const getCurrentTimeAndOneHourLater = () => {
    const startTime = new Date()
    startTime.setMinutes(startTime.getMinutes() + 5)

    const endTime = new Date(startTime)
    endTime.setHours(endTime.getHours() + 1)

    return {
        startTime: toLocalISOString(startTime).slice(0, 16),
        endTime: toLocalISOString(endTime).slice(0, 16),
    }
}

export const AllSlotTypes = [
    SlotType.Bicycle,
    SlotType.Bike,
    SlotType.Car,
    SlotType.Heavy
]

export const formDefaultValuesSearchGarages: DefaultValues<FormTypeSearchGarage> = {
    pricePerHour: [0, 200],
    width: [0, 20],
    height: [0, 100],
    length: [0, 100],
    types: AllSlotTypes.sort()
}

// why we use it like a context Provider -
// u can use it, in the different components. eg: 'GarageMarker.tsx', 'template/SearchPage.tsx'
export const FormProviderSearchGarage = ({
    children
}: { children: ReactNode }) => {
    const { startTime: currentTime, endTime: currentTimePlusOneHour } = getCurrentTimeAndOneHourLater()
    const methods = useForm<FormTypeSearchGarage>({
        resolver: zodResolver(formSchemaSearchGarage),
        defaultValues: {
            ...formDefaultValuesSearchGarages,
            startTime: currentTime,
            endTime: currentTimePlusOneHour
        }
    })
    return (
        <FormProvider {...methods}>
            {children}
        </FormProvider>
    )
}