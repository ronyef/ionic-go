import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
} from '@ionic/react';
import React from 'react';
import { entries } from '../data'

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {entries.map(entry => {
            return <IonItem 
              button key={entry.id}
              routerLink={'/my/entries/' + entry.id}>
                {entry.title}
            </IonItem>
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
