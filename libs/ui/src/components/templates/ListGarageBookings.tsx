'use client'
import { useState } from "react"
import { Tab, TabPanel, Tabs } from "../molecules/Tabs"
import { ShowGarageBookings } from "../organisms/ShowGarageBookings"
import { BookingStatus } from "@autospace/network/src/gql/generated"

export interface IListBookingsProps {
    garageId: number
}

export const ListGarageBookings = ({ garageId }: IListBookingsProps) => {
    const [value, setValue] = useState<0 | 1 | 2>(0) // three tabs (-prev -current -future)

    return (
        <div>
            <Tabs
                value={value}
                onChange={(e, v) => setValue(v)}
                arial-label="bookings"
            >
                <Tab label='IN' />
                <Tab label='OUT' />
                <Tab label='RESOLVED' />
            </Tabs>

            {/* In */}
            <TabPanel value={value} index={0}>
                <ShowGarageBookings
                    garageId={garageId}
                    statuses={[
                        BookingStatus.Booked,
                        BookingStatus.ValetPickedUp,
                        BookingStatus.ValetAssignedForCheckIn
                    ]}
                    showCheckIn
                />
            </TabPanel>

            {/* OUT */}
            <TabPanel value={value} index={1}>
                <ShowGarageBookings
                    garageId={garageId}
                    statuses={[
                        BookingStatus.CheckedIn,
                        BookingStatus.ValetAssignedForCheckOut,
                    ]}
                    showCheckOut
                />
            </TabPanel>

            {/* Resolved */}
            <TabPanel value={value} index={2}>
                <ShowGarageBookings
                    garageId={garageId}
                    statuses={[
                        BookingStatus.CheckedOut,
                    ]}
                />
            </TabPanel>
        </div>
    )
}