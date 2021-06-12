import {
  IonPage,
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle
} from "@ionic/react";
import React, { useState } from "react";
import Map from '../components/Map'
import Location from '../Interfaces/Location'

interface Props {
  destination: Location
}

const TripPage = () => {
  const [yourLoc, setYourLoc] = useState({lat: 0.513878, lng: 117.536352})
  const [riderLoc, setRiderLoc] = useState({})
  const [destinationLoc, setDestinationLoc] = useState({})

  return (
    <IonPage>
      <IonContent>
        <Map destination={destinationLoc}/>
        <IonCard color="light">
              <IonCardHeader>
                <IonCardSubtitle>Tujuan Order:</IonCardSubtitle>
                <IonCardTitle>
                  Warung Jati Golf Club
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Harga suka-suka
              </IonCardContent>
            </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default TripPage;
