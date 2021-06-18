import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonList,
  IonLabel,
  IonInput,
  IonCardSubtitle,
  IonButton,
} from "@ionic/react";

interface Profile {
  name?: string;
  email?: string;
  phone?: string;
  photo_url?: string;
  status?: string;
}

function ProfileEdit(props) {
  const { profile, save } = props;

  const [name, setName] = useState(profile.name)
  const [phone, setPhone] = useState(profile.phone)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    let sentProfile: Profile = {}
    sentProfile.name = name
    sentProfile.email = profile.email
    sentProfile.phone = phone
    sentProfile.photo_url = profile.photo_url
    sentProfile.status = profile.status
    save(sentProfile)
  }

  const changeName = (e) => {
    setName(e.target.value)
  }

  const changePhone = (e) => {
    setPhone(e.target.value)
  }

  return (
    <div>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Edit Profile</IonCardTitle>
          <IonCardSubtitle>{profile.name}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonList>
            <form onSubmit={handleSubmit}>
              <IonItem>
                <IonLabel position="fixed">Nama</IonLabel>
                <IonInput 
                  type="text" 
                  placeholder={profile.name} 
                  onIonChange={changeName}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Email</IonLabel>
                <IonInput type="email" placeholder={profile.email} disabled={true} />
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Nomor HP</IonLabel>
                <IonInput 
                  type="text" 
                  placeholder={profile.phone} 
                  onIonChange={changePhone}
                />
              </IonItem>
              <div style={{ marginTop: "12px" }}>
                <IonButton type='submit'>Simpan</IonButton>
              </div>
            </form>
          </IonList>
        </IonCardContent>
      </IonCard>
    </div>
  );
}

export default ProfileEdit;
