import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonToggle,
  // IonLabel,
} from '@ionic/react';
import React, { useContext, useState, useEffect } from 'react';
import { OrderContext } from '../OrderContext';
// import { auth } from '../firebase';
// import Search from '../components/Search'

interface Order {
  order: {
    name: string
    formatted_address: string
    vicinity: string
  }
}

const TripOrderPage: React.FC = (props) => {
  const orderCtx = useContext(OrderContext)
  
  useEffect(() => {
    setOrder(orderCtx)
    console.log('UseEffect dipanggil')
    console.log(order)
  }, [orderCtx])

  // const sangataBound = {
  //   north: 0.60,
  //   south: 0.37,
  //   west: 117.2,
  //   east: 117.8
  // }

  const changeLocation = () => {
    setIsCurrentLocation(!isCurrentLocation) 
  }

  const [isCurrentLocation, setIsCurrentLocation] = useState(true)

  const fromCtx = orderCtx.state.order[0]
  const toCtx = orderCtx.state.order[1]
  console.log("From", fromCtx)
  console.log("To", toCtx)

  const [order, setOrder] = useState({state: {
    order: [
      {
        name: "from",
        formatted_address: "address",
        vicinity: "vicinity",
      },
      {
        name: "to",
        formatted_address: "address",
        vicinity: "vicinity",
      },
    ],}
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Go Skuter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>{toCtx.vicinity}</IonCardSubtitle>
            <IonCardTitle>Ke: {toCtx.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {toCtx.formatted_address}
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton expand="block" color="danger">10 Ribu</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="block" color="warning">15 Ribu</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="block" color="success">20 Ribu</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonItem lines="none">
              <IonLabel>Dari lokasimu saat ini</IonLabel>
              <IonToggle 
                checked={isCurrentLocation} 
                onIonChange={changeLocation}/>
            </IonItem>
          </IonCardContent>
        </IonCard>
        
      </IonContent>
    </IonPage>
  );
};

export default TripOrderPage;
