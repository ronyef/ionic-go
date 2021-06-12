import React, { useEffect, useState } from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import withScriptjs from 'react-google-maps/lib/withScriptjs'
import Location from '../Interfaces/Location'


const  MapComponent = withScriptjs(withGoogleMap((props: any) => {

    let refs = {}
    const [position, setPosition]: any = useState()
    const { bound, center, destination } = props

    useEffect(() => {
        setPosition({
            bounds: null,
            center: props.center,
            markers: []
        })
    }, [])

    return (
        <>
            <GoogleMap
                defaultZoom={props.zoom}
                defaultCenter={center}
                options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                    restriction: {
                        latLngBounds: {north: bound.north, south: bound.south, west: bound.west, east: bound.east},
                        strictBounds: true
                    }
                }}
            >
                <Marker position={{ lat: -34.397, lng: 150.644 }} />
            </GoogleMap>
        </>
    )
}))

export default function Map(props: any) {
    const sangataBounds = {
        north: 0.608,
        south: 0.314,
        west: 117.285,
        east: 117.685
    }

    const depokBounds = {
        north: -6.366,
        south: -6.466,
        west: 106.722,
        east: 106.894
    }

    const sangataCenter = { lat: 0.513878, lng: 117.536352 }
    const sawanganCenter = { lat: 6.41839, lng: 106.77940 }
    const zoom = 15

    const destination: Location = props.destination

    return (
        <div>
            <MapComponent 
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GMAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `40vh` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                bound={depokBounds}
                center={sawanganCenter}
                zoom={zoom}
            />
        </div>
    )
}


