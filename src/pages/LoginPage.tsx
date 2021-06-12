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

const LoginPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: false });
  const [present] = useIonToast()

  const handleLogin = async () => {
    try {
      setStatus({ loading: true, error: false });
      const credential = await auth.signInWithEmailAndPassword(email, password);
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
          <IonRow >
            <IonCol size="12" style={{"margin-bottom": "50px"}}>
              <div className="ion-text-center">
              <img src="assets/log_trans.png" height="70" alt="skuter" />
              </div>
            </IonCol>
            <IonCol>
              <img src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202104/Hermes_75_14.5303_1200x768.png?SZIg_1oz.dYa1Fr27auO4VQ6fqfAexh7&size=1200:675" alt="happy"/>
            </IonCol>
            <IonCol size="12">
              <IonList
                style={{ "background-color": "var(--ion-color-warning)" }}
              >
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
        {/* {status.error && <IonText color="danger" className="ion-text-center">Invalid Credential</IonText>} */}
        <IonButton expand="block" onClick={handleLogin} color="dark">
          Login
        </IonButton>
        <IonButton expand="block" routerLink="/register" fill="clear" size="small">
          Belum punya akun?
        </IonButton>
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
