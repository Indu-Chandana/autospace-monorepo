import { useState } from "react";
import { Tabs, Tab, TabPanel } from "../molecules/Tabs";
import { ShowValetAllPickupTrips } from "../organisms/ShowValetAllPickupTrips";
import { ShowValetAllDropOffTrips } from "../organisms/ShowValetAllDropOffTrips";

export function ValetHome({ companyId }: { companyId: number }) {
    const [value, setValue] = useState<0 | 1>(0)

    return (
        <>
            <Tabs
                value={value}
                onChange={(e, v) => setValue(v)}
                aria-label="bookings"
            >
                <Tab label="Pickup" />
                <Tab label="Drop" />
            </Tabs>

            <TabPanel value={value} index={0}>
                <ShowValetAllPickupTrips />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <ShowValetAllDropOffTrips />
            </TabPanel>
        </>
    )
}