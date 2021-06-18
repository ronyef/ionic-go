import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import EventEmitter from "../utils/EventEmitter";

interface Address {
    label: string
    value: any
}

export interface LatLng {
  lat: number;
  lng: number;
}

const SearchAuto = (props: any) => {
 
  const [disableSearch, setDisableSearch] = useState(false)
  const [value, setValue] = useState<Address>();
  const { setDestination  } = props
  // const bounds: [LatLng, LatLng] = props.bounds
  const rgpa = useRef(null);

  const depokBounds: [LatLng, LatLng] = [
    { lat: -6.366, lng: 106.722 },
    { lat: -6.466, lng: 106.894 },
  ];

  const sangattaBounds: [LatLng, LatLng] = [
    { lat: 0.314, lng: 117.285 },
    { lat: 0.608, lng: 117.685 },
  ];

  useEffect(() => {
      setDestination(value)
  }, [value])

  useEffect(() => {
    const enableSearchSubscribe = EventEmitter.addListener('onOrderActive', (activeOrders: any[]) => {
      if (activeOrders.length > 0) {
        setDisableSearch(true)
      } else {
        setDisableSearch(false)
      }
      
    })
    return () => {
      enableSearchSubscribe.remove()
    }
  }, [])

  return (
    <div>
      <GooglePlacesAutocomplete
        selectProps={{
          value,
          onChange: setValue,
          isDisabled: disableSearch
        }}
        apiKey={process.env.REACT_APP_GMAP_API_KEY}
        minLengthAutocomplete={3}
        autocompletionRequest={{
            componentRestrictions: {
                country: "id"
            },
            bounds: depokBounds,
            // types: ['geocode'],
        }}
        
      />
    </div>
  );
}

export default SearchAuto
