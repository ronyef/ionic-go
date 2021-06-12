import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/react';
import React from 'react';
import { auth } from '../firebase';


const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton 
          expand="block" 
          color="medium"
          onClick={() => auth.signOut()}
          >Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
