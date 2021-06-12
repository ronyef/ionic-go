import {
  IonPage,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonLoading,
  IonGrid,
  IonRow,
  IonCol,
  useIonToast,
} from "@ionic/react";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../auth";
import { auth } from "../firebase";

const RegisterPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: false });
  const [present] = useIonToast()

  const handleRegister = async () => {
    try {
      setStatus({ loading: true, error: false });
      const credential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(credential);
    } catch (error) {
      setStatus({ loading: false, error: true });
      present({
        message: error.message,
        duration: 3000
      })
    }
  };

  if (loggedIn) {
    return <Redirect to="/my/entries" />;
  }

  return (
    <IonPage>
      <IonContent className="ion-padding" color="warning">
        <IonGrid>
          <IonRow>
            <IonCol className="ion-text-center">
              <img src="assets/man_jump.png" height="400px" alt="happy"/>
            </IonCol>
            <IonCol size="12">
              <IonList style={{ "background-color": "var(--ion-color-warning)"}}>
                <IonItem color="warning">
                  <IonLabel position="floating">Email</IonLabel>
                  <IonInput
                    type="email"
                    value={email}
                    onIonChange={(event) => setEmail(event.detail.value)}
                  />
                </IonItem>
                <IonItem color="warning">
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={(event) => setPassword(event.detail.value)}
                  />
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
        {/* {status.error && <IonText color="danger">Invalid Credential</IonText>} */}
        <IonButton expand="block" onClick={handleRegister} color="dark">
          Create Account
        </IonButton>
        <IonButton expand="block" routerLink="/login" fill="clear" size="small">
          Sudah punya akun?
        </IonButton>
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
