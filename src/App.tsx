import {
  IonApp,
  IonLoading,
  IonRouterOutlet
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { AuthContext } from './auth'
import { auth } from './firebase'

import LoginPage from "./pages/LoginPage";
import AppTabs from "./AppTabs";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";


const App: React.FC = () => {
  const [authState, setAuthState] = useState({ loading: true, loggedIn: false });

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setAuthState({loading: false, loggedIn: Boolean(user)})
    })
  }, [])

  console.log("rendering App with loggedIn = " + authState.loggedIn);

  if (authState.loading) {
    return <IonLoading isOpen />
  }
  
  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn: authState.loggedIn }}>
        <IonReactRouter>
          <IonRouterOutlet>
            <Switch>
              <Route exact path="/register">
                <RegisterPage />
              </Route>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route path="/my">
                <AppTabs />
              </Route>
              <Redirect exact path="/" to="/my" />
              <NotFoundPage />
            </Switch>
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
