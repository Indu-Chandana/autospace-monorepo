import { LatLng } from "@autospace/util/types";
import { IconMap2 } from "@tabler/icons-react";
import Link from "next/link";
import { ReactNode } from "react";

export interface IMapLinkProps {
    waypoints: LatLng[]
    children?: ReactNode
    className?: string
}

export const MapLink = ({
    waypoints,
    children = <IconMap2 />,
    className
}: IMapLinkProps) => {
    if (waypoints.length === 0) {
        return null
    }

    if (waypoints.length === 1) { // this use for -> customer cooking page to show garage.
        const { lat, lng } = waypoints[0]
        const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`

        return (
            <Link
                href={googleMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
            >
                {children}
            </Link>
        )
    }

    const origin = waypoints[0]
    const destination = waypoints[waypoints.length - 1]
    const waypointsParam = waypoints
        .slice(1, -1)
        .map(({ lat, lng }) => `${lat},${lng}`)
        .join('|')
    // this is for valet with directions
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&waypoints=${waypointsParam}`
    return (
        <Link
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
        // noopener -> prevent newly opened page gaining access to the 'window.opener' property of the parent page.
        // if the opened page is malicious, It could run scripts that affect the parent page.

        // noreferrer -> preventing the browser from sending the Referer HTTP header to the new page.
        >
            {children}
        </Link>
    )
}