import { Capacitor, Plugins, CallbackID } from "@capacitor/core";
import LocationService from "../Location";
const { Geolocation, Toast } = Plugins;


interface Coordinate {
    lat: number
    lng: number
}

var watchId: CallbackID = "";

let currentPosition: Coordinate = {lat: 0, lng: 0}

export async function getCurrentPosition (): Promise<Coordinate> {
    try {
      await checkPermission()
      return currentPosition
    } catch (err) {
      return (err)
    }
}

const checkPermission = async () => {
  const hasPermission = await LocationService.checkGPSPermission();
  if (hasPermission) {
    if (Capacitor.isNative) {
      const canUseGPS = await LocationService.askToTurnOnGPS();
      postGPSPermission(canUseGPS);
    } else {
      postGPSPermission(true);
    }
  } else {
    console.log("14");
    const permission = await LocationService.requestGPSPermission();
    if (permission === "CAN_REQUEST" || permission === "GOT_PERMISSION") {
      if (Capacitor.isNative) {
        const canUseGPS = await LocationService.askToTurnOnGPS();
        postGPSPermission(canUseGPS);
      } else {
        postGPSPermission(true);
      }
    } else {
      await Toast.show({
        text: "User denied location permission",
      });
    }
  }
}

const postGPSPermission = async (canUseGPS: boolean) => {
    if (canUseGPS) {
        watchPosition();
      } else {
        await Toast.show({
          text: "Please turn on GPS to get location",
        });
      }
}

const watchPosition = async () => {
    try {
        watchId = Geolocation.watchPosition({}, (position, err) => {
            if (err) {
                console.log(err)
                return
            }
            currentPosition = {lat: position.coords.latitude, lng: position.coords.longitude}
            clearWatch()
        })
    } catch (error) {
        console.log(error)
    }
}

const clearWatch = () => {
    if (watchId != null) {
        Geolocation.clearWatch({ id: watchId });
    }
}
