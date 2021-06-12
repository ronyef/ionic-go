import { AndroidPermissions } from '@ionic-native/android-permissions'
import { LocationAccuracy } from '@ionic-native/location-accuracy'
import { Capacitor } from '@capacitor/core'


const LocationService = {
    // Cek apakah aplikasi punya GPS permission
    checkGPSPermission: async (): Promise<boolean> => {
        return await new Promise((resolve, reject) => {
            if (Capacitor.isNative) {
                AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
                    result => {
                        if (result.hasPermission) {
                            // Jika punya permission tampilkan 'Turn On GPS' dialogue
                            resolve(true)
                        } else {
                            // jika tidak punya permission, minta permission
                            resolve(false)
                        }
                    },
                    err => { alert(err) }
                )
            } else {
                resolve(true)
            }
        })
    },

    requestGPSPermission: async (): Promise<string> => {
        return await new Promise((resolve, reject) => {
            LocationAccuracy.canRequest().then((canRequest: boolean) => {
                if (canRequest) {
                    resolve('CAN_REQUEST')
                } else {
                    // Tampilkan 'GPS Permission Request' dialogue
                    AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
                        .then(
                            (result) => {
                                if (result.hasPermission) {
                                    //call method untuk hidupkan GPS
                                    resolve('GOT_PERMISSION')
                                } else {
                                    resolve('DENIED_PERMISSION')
                                }
                            },
                            error => {
                                // Tampilkan alert jika user klik "No Thanks"
                                alert('requestPermission Error requesting location permissions ' + error)
                            }
                        )
                }
            })
        })
    },

    askToTurnOnGPS: async (): Promise<boolean> => {
        return await new Promise((resolve, reject) => {
            LocationAccuracy.canRequest().then((canRequest: boolean) => {
                if (canRequest) {
                    //the accuracy option will be ignored by iOS
                    LocationAccuracy.request(LocationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                        () => {
                            resolve(true)
                        },
                        error => { resolve(false)}
                    )
                } else {
                    resolve( false)
                }
            })
        })
    }
}

export default LocationService