'use client'
import { useState } from "react"
import { Tab, TabPanel, Tabs } from '../molecules/Tabs'
import { ShowCustomerBookings } from "../organisms/ShowCustomerBookings"
import { BookingStatus } from "@autospace/network/src/gql/generated"

// export enum BookingTypes {
//     ONGOING = 'ONGOING',
//     PAST = 'PAST'
// }

// export const BookingType = {
//     [BookingTypes.ONGOING]: {
//         title: 'Ongoing bookings',
//         where: {
//             endTime: { gt: new Date().toISOString() }
//         }
//     },
//     [BookingTypes.PAST]: {
//         title: 'Past bookings',
//         where: {
//             endTime: { lt: new Date().toISOString() }
//         }
//     }
// }

export const ListCustomerBookings = () => {
    const [value, setValue] = useState<0 | 1>(1)

    return (
        <>
            <Tabs
                value={value}
                onChange={(e, v) => setValue(v)}
                aria-label="bookings"
            >
                <Tab label={'PAST'} />
                <Tab label={'ON GOING'} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <ShowCustomerBookings statuses={[BookingStatus.CheckedOut]} />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <ShowCustomerBookings statuses={[
                    BookingStatus.Booked,
                    BookingStatus.ValetPickedUp,
                    BookingStatus.ValetAssignedForCheckOut,
                    BookingStatus.ValetAssignedForCheckIn,
                    BookingStatus.CheckedIn
                ]} />
            </TabPanel>
        </>
    )


}