import { IconMoonStars, IconSun, IconSunrise, IconSunset } from "@tabler/icons-react"

export const IconType = ({
    time, className
}: {
    time: string
    className?: string
}) => {

    const date = new Date(time)
    const hour = date.getHours() // get the hour in UTC

    if (hour >= 4 && hour < 10) return <IconSunrise className="w-5 h-5" />
    if (hour >= 10 && hour < 16) return <IconSun className="w-5 h-5" />
    if (hour >= 16 && hour < 20) return <IconSunset className="w-5 h-5" />
    return <IconMoonStars className={`w-5 h-5 ${className}`} />
}