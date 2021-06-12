import React from "react";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { useAuth } from "./auth";

import { Route, Redirect } from "react-router-dom";
import {
  home as homeIcon,
  settings as settingsIcon,
  bicycle as bicycleIcon,
} from "ionicons/icons";

import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import EntryPage from "./pages/EntryPage";
import AddEntryPage from "./pages/AddEntryPage";
import TripPage from "./pages/TripPage";
import TripOrderPage from "./pages/TripOrderPage";


const AppTabs: React.FC = () => {

  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/my/entries">
          <HomePage />
        </Route>
        <Route exact path="/my/entries/view/:id">
          <EntryPage />
        </Route>
        <Route exact path="/my/entries/add">
          <AddEntryPage />
        </Route>
        <Route exact path="/my/trip">
          <TripPage />
        </Route>
        <Route exact path="/my/trip/order">
          <TripOrderPage />
        </Route>
        <Route exact path="/my/settings">
          <SettingsPage />
        </Route>
        <Redirect exact path="/" to="/my/entries" />
      </IonRouterOutlet>
      <IonTabBar slot="top" color="dark">
        <IonTabButton tab="home" href="/my/entries">
          <IonIcon icon={homeIcon} />
          <IonLabel>COD</IonLabel>
        </IonTabButton>
        <IonTabButton tab="trip" href="/my/trip">
          <IonIcon icon={bicycleIcon} />
          <IonLabel>Trip</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/my/settings">
          <IonIcon icon={settingsIcon} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppTabs;
