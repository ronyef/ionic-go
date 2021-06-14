import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonToggle,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../auth";
import { firestore, storage } from "../firebase";

// import MapComponent from "../components/Map";
import MapComponent from "../components/MapComponent";
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
  const [showHistory, setShowHistory] = useState(false)
  const history = useHistory();

  useEffect(() => {
    const ordersRef = firestore.collection('orders')
    ordersRef
    .where("userId", "==", userId)
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
    let activeOrders = []
    orders.map((order) => {
      if (order.status === 'order' || order.status === 'tunggu') {
        activeOrders.push(order)
      }
    })
    EventEmitter.emit('onOrderActive', activeOrders)
  }, [orders])

  const handleShowHistory = () => {
    setShowHistory(!showHistory)
  }

  return (
    <IonPage>
      <IonContent>
        {/* <MapComponent activeOrder={orders[0]}/> */}
        <MapComponent activeOrder={orders[0]} />
        <div className="ion-padding">
          <IonItem lines="none">
            <IonLabel>Tampilkan History?</IonLabel>
            <IonToggle
              checked={showHistory}
              onIonChange={handleShowHistory}
              color="success"
            />
          </IonItem>
          {orders.map((order) => {
              if (order.status === 'order' || order.status === 'tunggu') {
                return (
                  <div key={order.id} style={{marginBottom: '20px'}}>
                  <Order order={order}/>
                  </div>
                )
              }
            })
          }
          {showHistory && orders.map((order) => {
              if (order.status === 'selesai') {
                return (
                  <div key={order.id} style={{marginBottom: '20px'}}>
                  <Order order={order}/>
                  </div>
                )
              }
            })
          }
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TripPage;
