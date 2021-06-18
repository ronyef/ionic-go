import React, { useEffect, useState, useRef } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/withScriptjs";
import { compose, withProps } from "recompose";
import Location from "../Interfaces/Location";
import EventEmitter from "../utils/EventEmitter";
import {firestore} from '../firebase'
import { OrderModel } from "../models";

const API_KEY = process.env.REACT_APP_GMAP_API_KEY;

const mapEnvironment = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
);

const MapLayout = (props) => {
  const sangataBounds = {
    north: 0.608,
    south: 0.314,
    west: 117.285,
    east: 117.685,
  };

  const depokBounds = {
    north: -6.366,
    south: -6.466,
    west: 106.722,
    east: 106.894,
  };

  const mapRef = useRef(null)

  const sangataCenter = { lat: 0.513878, lng: 117.536352 };
  const sawanganCenter = { lat: -6.41839, lng: 106.7794 };
  const depokCenter = { lat: -6.39987, lng: 106.81895 };

  const [activeOrder, setActiveOrder] = useState<OrderModel>()

  useEffect(() => {
    const onOrderListener = EventEmitter.addListener('onOrderActive', (activeOrders: OrderModel[]) => {
      if (activeOrders.length > 0) { 
        setActiveOrder(activeOrders[0])
      } else {setActiveOrder(null)}
    })
    return () => {
      onOrderListener.remove()
    }
  }, [])

  useEffect(() => {
    if (activeOrder) {
      const loc = activeOrder.originCoords.location
      mapRef.current.panTo(new google.maps.LatLng(loc.latitude, loc.longitude))
    }
  }, [activeOrder])

  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={depokCenter}
      options={{
        streetViewControl: false,
        restriction: {
          latLngBounds: depokBounds
        },
        mapTypeControl: false,
        draggable: true
      }}
      ref={mapRef}
    >
      <Marker 
        position={{ lat: -6.41839, lng: 106.7794 }} 
        icon={{
          url: 'assets/icon/place.png',
          scaledSize: new google.maps.Size(50, 50)
        }}
      />
    </GoogleMap>
  );
};

const MapComponent = mapEnvironment(MapLayout);

export default MapComponent;
