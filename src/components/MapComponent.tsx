import React, { useEffect, useState } from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import withScriptjs from 'react-google-maps/lib/withScriptjs'
import {compose, withProps} from 'recompose'
import Location from '../Interfaces/Location'

const API_KEY = process.env.REACT_APP_GMAP_API_KEY

const mapEnvironment = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
);

const MapLayout = props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    {/* {props.isMarkerShown && (
      <Marker position={{ lat: -34.397, lng: 150.644 }} />
    )} */}
  </GoogleMap>
);

const MapComponent = mapEnvironment(MapLayout);