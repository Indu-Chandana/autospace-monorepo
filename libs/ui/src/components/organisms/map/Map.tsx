import MapGl, { useMap } from 'react-map-gl'

type MapProps = React.ComponentProps<typeof MapGl> & { height?: string }

export const Map = ({ height = 'calc(100vh - 4rem)', ...props }: MapProps) => {
    return (
        <MapGl
            {...props}
            projection={{ name: 'globe' }} // user is too far away, we show globe
            mapStyle="mapbox://styles/iamkarthick/clebahxqe001701mo1i1adtw3" // custom css
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            style={{ height }} // I added |height| separately
            // pitch={45}
            scrollZoom={false}
        >
            <StyleMap />
            {props.children}
        </MapGl>
    )
}

// StyleMap -> how we change colors of the map.
export const StyleMap = () => {
    const { current } = useMap()

    current?.on('style.load', () => {
        current?.getMap().setFog({
            color: 'rgb(255, 255, 255)', // Lower atmosphere
            range: [1, 10],

            'high-color': 'rgb(200, 200, 200)', // Upper atmosphere
            'horizon-blend': 0.05, // Atmosphere thickness (default 0.2 at low zooms)
            'space-color': 'rgb(150, 150, 150)', // Background color
            'star-intensity': 0.5, // Background star brightness (default 0.35 at low zoooms )
        })
    })
    return null
}
