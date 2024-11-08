'use client'
import { Map } from "../organisms/map/Map"
import { Panel } from "../organisms/map/Panel"
import { DefaultZoomControls } from "../organisms/map/ZoomControls"

export const SearchPage = () => {


    return (
        <Map>
            <Panel>
                <DefaultZoomControls />
            </Panel>
        </Map>
    )
}