import { useMapboxDirections } from "@autospace/util/hooks/directions";
import { isLatLng } from "@autospace/util";
import { LatLng } from "@autospace/util/types";
import { ReactNode } from "react";
import { AlertSection } from "../molecules/AlertSection";
import { MapLink } from "../molecules/MapLink";
import { StaticMapDirections } from "./map/StaticMapDirections";
import { formatDateCustom } from "@autospace/util/date";

export interface IValetTripCardProps {
    garage?: Partial<LatLng> | null
    start?: Partial<LatLng> | null
    end?: Partial<LatLng> | null
    booking: {
        id: number,
        time: string
    }
    children?: ReactNode
}

export const ValetTripCard = ({
    start,
    end,
    booking,
    children
}: IValetTripCardProps) => {

    const { data: coordinates, distance,
        // error, loading 
    } = useMapboxDirections(
        start,
        end
    )

    if (!isLatLng(start) || !isLatLng(end)) {
        return (
            <AlertSection>
                <div>Something went wrong.</div>
                <div className="text-xs">Start end locations not set.</div>
            </AlertSection>
        )
    }

    return (
        <div>
            <MapLink waypoints={[start, end]}>
                <StaticMapDirections start={start} end={end} coordinates={coordinates} />
            </MapLink>
            <div className="p-2 bg-white space-y-2 ">
                <div className="flex justify-between gap-2">
                    <div>
                        <div className="text-lg font-semibold">
                            {formatDateCustom(booking.time, 'p')}
                        </div>
                        <div className="text-xs text-gray">
                            {formatDateCustom(booking.time, 'PP')}
                        </div>
                    </div>
                    <div>
                        {((distance || 0) / 1000).toFixed(2)}Km
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}