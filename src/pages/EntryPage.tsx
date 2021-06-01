import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon
} from '@ionic/react';
import { trash as trashIcon } from 'ionicons/icons'
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth';
import { firestore } from '../firebase'
import { Entry, toEntry } from '../models'
import { formatDate } from '../date'

interface RouteParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const { userId } = useAuth()
  const { id } = useParams<RouteParams>()
  const history = useHistory()
  
  const [entry, setEntry] = useState<Entry>()
  useEffect(() => {
    const entryRef = firestore.collection('users').doc(userId).collection('entries')
      .doc(id)
    entryRef.get().then((doc) => {
      setEntry(toEntry(doc))
    })
  }, [id])

  const handleDelete = async () => {
    const entryRef = firestore.collection('users').doc(userId)
      .collection('entries').doc(id)
      await entryRef.delete()
      history.goBack()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{formatDate(entry?.date)}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleDelete}>
              <IonIcon icon={trashIcon} slot="icon-only"/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>{entry?.title}</h2>
        <img src={entry?.pictureUrl} alt={entry?.title} />
        <p>{entry?.description}</p>
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
