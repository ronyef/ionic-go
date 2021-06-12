import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

interface Address {
    label: string
    value: any
}

export interface LatLng {
  lat: number;
  lng: number;
}

const SearchAuto = forwardRef((props: any, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      refresh() {
        if (rgpa && rgpa.current) {
          rgpa.current.refreshSessionToken();
        }
      }
    })

    
  )

  const [value, setValue] = useState<Address>();
  const { setDestination  } = props
  const bounds: [LatLng, LatLng] = props.bounds
  const rgpa = useRef(null);

  useEffect(() => {
      setDestination(value)
      console.log(value)
  }, [value])

  return (
    <div>
      <GooglePlacesAutocomplete
        selectProps={{
          value,
          onChange: setValue
        }}
        apiKey={process.env.REACT_APP_GMAP_API_KEY}
        minLengthAutocomplete={3}
        autocompletionRequest={{
            // location: {lat: 0.49524, lng: 117.53004},
            componentRestrictions: {
                country: "id"
            },
            // radius: 15000,
            bounds: bounds,
            // types: ['geocode'],
        }}
        
      />
    </div>
  );
})

export default SearchAuto
