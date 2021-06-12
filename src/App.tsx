import {
  IonApp,
  IonLoading,
  IonRouterOutlet
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { AuthContext, useAuthInit } from './auth'

import LoginPage from "./pages/LoginPage";
import AppTabs from "./AppTabs";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";


const App: React.FC = () => {
  const { loading, auth }= useAuthInit()

  // console.log("rendering App with loggedIn = " + auth);

  if (loading) {
    return <IonLoading isOpen />
  }
  
  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
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
