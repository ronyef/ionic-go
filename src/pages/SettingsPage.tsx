import {
  IonPage,
  IonContent,
  IonHeader,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCardContent,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
  IonChip,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { camera, phonePortraitOutline } from "ionicons/icons";
import { firestore, storage } from "../firebase";
import { useAuth } from "../auth";
import ProfileEdit from "../components/ProfileEdit";

interface Profile {
  name?: string;
  email?: string;
  phone?: string;
  photo_url?: string;
  status?: string;
}

const SettingsPage: React.FC = () => {
  const { userId } = useAuth();
  const [profile, setProfile] = useState<Profile>({});
  const [isEdit, setIsEdit] = useState(false)

  const getProfile = () => {
    const userRef = firestore.collection("users").doc(userId);
    userRef.get().then(
      (user) => {
        if (user.exists) {
          setProfile(user.data());
        } else {
          console.log("profile kosong");
        }
      },
      (err) => console.log(err)
    );
  }

  useEffect(() => {
    getProfile()
  }, []);

  const handleSave = (profile: Profile) => {
    const profileRef = firestore.collection('users').doc(userId)
    profileRef.set(profile)
    .then(() => {
      console.log('Profile updated.')
      getProfile()
    })
    .catch(error => console.log(error))
  };

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent color="light">
        <IonCard color="warning">
          <img src="assets/kumbang.png" alt="kumbang" />
          <IonCardHeader>
            <IonGrid>
              <IonRow className="ion-align-items-center">
                <IonCol size="7">
                  <div>
                    <IonCardTitle>{profile.name}</IonCardTitle>
                    <IonCardSubtitle>{profile.email}</IonCardSubtitle>
                  </div>
                </IonCol>
                <IonCol size="5">
                  <div>
                    <IonChip>
                      <IonIcon icon={phonePortraitOutline} />
                      <IonLabel>{profile.phone}</IonLabel>
                    </IonChip>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonButton color="danger" size="small" onClick={() => auth.signOut()}>
              Logout
            </IonButton>
            <IonButton color="dark" size="small" onClick={() => setIsEdit(!isEdit)}>
              {isEdit? "Selesai": "Edit"}
            </IonButton>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>
              Gunakan nama, alamat email dan nomor HP yang valid untuk
              memudahkan komunikasi dengan rider dan team admin kami.
            </IonLabel>
          </IonCardContent>
        </IonCard>
        {isEdit &&
          <ProfileEdit profile={profile} save={handleSave}/>
        }
        <IonFab vertical="top" horizontal="end">
          <IonFabButton color="warning">
            <IonIcon icon={camera} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
