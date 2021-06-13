import {
  IonPage,
  IonContent,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../auth";
import { firestore, storage } from "../firebase";
import firebase from "firebase";
import * as dayjs from "dayjs";

import MapComponent from "../components/Map";
import Location from "../Interfaces/Location";
import Order from '../components/Order'
import { OrderModel } from '../models'
import EventEmitter from "../utils/EventEmitter";

interface Props {
  destination: Location;
}

const TripPage = () => {
  const { userId } = useAuth();
  const [orders, setOrders] = useState<OrderModel[]>([])

  // const [yourLoc, setYourLoc] = useState({ lat: 0.513878, lng: 117.536352 });
  const [riderLoc, setRiderLoc] = useState({});
  const [destinationLoc, setDestinationLoc] = useState({});
  const history = useHistory();

  useEffect(() => {
    const ordersRef = firestore.collection('orders')

    ordersRef
    // .where("status", "==", "order")
    .orderBy('dateTime', 'desc')
    .limit(10)
    .onSnapshot((docs) => {
      const docsArray = []
      docs.forEach((doc) => {
        const newDoc: any = {id: doc.id, ...doc.data()}
        docsArray.push(newDoc)
      })
      setOrders(docsArray)
    })
  }, [])

  useEffect(() => {
    let count = 0
    orders.map((order) => {
      if (order.status === 'order' || order.status === 'tunggu') {
        count++
      }
    })
    if (count > 0) {
      console.log("Emmit Block", count)
      EventEmitter.emit('onOrderActive', true)
    } else {
      EventEmitter.emit('onOrderActive', false)
    }
  }, [orders])

  return (
    <IonPage>
      <IonContent>
        {/* <Map destination={destinationLoc} /> */}
        <MapComponent />
        <div className="ion-padding">
          {orders.map((order) => {
              return (
                <div key={order.id} style={{marginBottom: '20px'}}>
                <Order order={order}/>
                </div>
              )
            })
          }
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TripPage;
