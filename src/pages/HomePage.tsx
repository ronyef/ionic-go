import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonImg,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonToggle,
  IonCardSubtitle,
  IonTextarea,
  IonLoading,
  IonSegment,
  IonSegmentButton,
  IonText,
} from "@ionic/react";
// import { rocket as rocketIcon } from "ionicons/icons";
import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useAuth } from "../auth";
import { firestore, storage } from "../firebase";
import firebase from "firebase";
import * as dayjs from "dayjs";

import { Entry, toEntry } from "../models";
// import { formatDate } from "../date";
import SearchAuto from "../components/SearchAuto";
import EventEmitter from "../utils/EventEmitter";
import { useHistory } from "react-router";
import { Geolocation } from "@ionic-native/geolocation";

export interface LatLng {
  lat: number;
  lng: number;
}

const HomePage = (props: any) => {
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const history = useHistory();
  const searchRef: any = useRef();

  const sangattaBounds: [LatLng, LatLng] = [
    { lat: 0.314, lng: 117.285 },
    { lat: 0.608, lng: 117.685 },
  ];

  const depokBounds: [LatLng, LatLng] = [
    { lat: -6.366, lng: 106.722 },
    { lat: -6.466, lng: 106.894 },
  ];

  const sangataCenter = { lat: 0.513878, lng: 117.536352 };
  const sawanganCenter = { lat: 6.41839, lng: 106.7794 };

  const [destination, setDestination]: any = useState();
  const [origin, setOrigin] = useState("koordinat");
  const [isCurrentLocation, setIsCurrentLocation] = useState(true);
  const [originLocation, setOriginLocation] = useState(sangataCenter);
  const [showLoading, setShowLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [searchBounds, setSearchBounds] = useState(depokBounds);
  const [bidPrice, setBidPrice] = useState(20000)

  useEffect(() => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries");
    return entriesRef
      .orderBy("date", "desc")
      .limit(10)
      .onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
  }, [userId]);

  const handleOrigin = (e) => {
    setOrigin(e.detail.value);
  };

  const handleOrder = async () => {
    if (isCurrentLocation) {
      getCurrentPosition();
    }
    const orderRef = firestore.collection("orders");
    const originPosition = {
      location: new firebase.firestore.GeoPoint(
        originLocation.lat,
        originLocation.lng
      ),
    };
    setIsSending(true);
    const orderData = {
      userId: userId,
      origin: origin,
      destination: destination.label,
      price: bidPrice,
      status: "order",
      dateTime: new Date(),
      originCoords: originPosition,
    };
    const successRef = await orderRef.add(orderData).then(
      (res) => {
        EventEmitter.emit("onOrder", orderData);
        setOrderSent(true);
        history.push("/my/trip");
        console.log(res);
        setIsSending(false);
      },
      (err) => {
        console.log(err);
        setIsSending(false);
      }
    );
  };

  // const handle10 = () => {
  //   handleOrder(10000);
  // };

  // const handle15 = () => {
  //   handleOrder(15000);
  // };

  // const handle20 = () => {
  //   handleOrder(20000);
  // };

  const priceSet = (e) => {
    if (e.detail.value === '10k') {
      setBidPrice(10000)
    } 
    if (e.detail.value === '15k') {
      setBidPrice(15000)
    } 
    if (e.detail.value === '15k') { setBidPrice(20000) }
  }

  const getCurrentPosition = () => {
    // setShowLoading(false)
    Geolocation.getCurrentPosition().then(
      (resp) => {
        setOriginLocation({
          lat: resp.coords.latitude,
          lng: resp.coords.longitude,
        });
        console.log(originLocation);
        setShowLoading(false);
      },
      (err) => {
        console.log(err);
        setShowLoading(false);
      }
    );
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  const onCurrentLocChange = () => {
    setIsCurrentLocation(!isCurrentLocation);
  };

  useEffect(() => {
    if (isCurrentLocation) {
      setShowLoading(true);
      getCurrentPosition();
    }
  }, [isCurrentLocation]);

  useEffect(() => {
    setOrderSent(false);
  }, [destination]);

  return (
    <IonPage>
      <IonContent>
        <IonImg src="assets/atur.png" alt="atur aja" />
        <div className="ion-padding">
          <IonItem lines="none">
            <IonLabel>Dari posisimu sekarang?</IonLabel>
            <IonToggle
              checked={isCurrentLocation}
              onIonChange={onCurrentLocChange}
              color="success"
            />
          </IonItem>
          {!isCurrentLocation && (
            <IonItem lines="none">
              {/* <IonLabel position="stacked">Jemput di:</IonLabel> */}
              <IonTextarea
                placeholder="Beri catatan khusus titik jemput:"
                onIonChange={handleOrigin}
              ></IonTextarea>
            </IonItem>
          )}
          <div
            style={{
              paddingLeft: "15px",
              paddingRight: "20px",
              marginBottom: "30px",
            }}
          >
            <h5>Cari tujuanmu di sini:</h5>
            <SearchAuto
              ref={searchRef}
              setDestination={setDestination}
              bounds={searchBounds}
            />
          </div>
          {destination && (
            <IonCard color="light">
              <IonCardHeader>
                <IonCardSubtitle>Tujuan Order:</IonCardSubtitle>
                <IonCardTitle>
                  {destination.value.structured_formatting.main_text}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {destination.label}
                {isCurrentLocation && (
                  <div style={{ marginTop: "12px", marginBottom: "12px" }}>
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Dari posisimu saat ini.
                    </p>
                  </div>
                )}
                {!isCurrentLocation && (
                  <>
                    <p
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginTop: 14,
                      }}
                    >
                      Poin Penjemputan:
                    </p>
                    <p style={{ marginBottom: 12 }}>{origin}</p>
                  </>
                )}
                {/* <IonGrid>
                  <IonRow class="ion-justify-content-between">
                    <IonCol size="4">
                      <IonButton
                        expand="full"
                        color="danger"
                        onClick={handle10}
                        disabled={orderSent}
                      >
                        10 Ribu
                      </IonButton>
                    </IonCol>
                    <IonCol size="4">
                      <IonButton
                        expand="full"
                        color="warning"
                        onClick={handle15}
                        disabled={orderSent}
                      >
                        15 Ribu
                      </IonButton>
                    </IonCol>
                    <IonCol size="4">
                      <IonButton
                        expand="full"
                        color="success"
                        onClick={handle20}
                        disabled={orderSent}
                      >
                        20 Ribu
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid> */}
                <div style={{marginTop: '20px', marginBottom: '10px'}} className='ion-text-center'>
                  <IonText>
                    <p style={{fontSize: 14, fontWeight: 'bold'}}>Harga Penawaran:</p>
                  </IonText>
                </div>
                <div style={{marginBottom: '10px'}}>
                <IonSegment color="danger" mode='ios' onIonChange={priceSet}>
                  <IonSegmentButton value='10k'>10 Ribu</IonSegmentButton>
                  <IonSegmentButton value='15k'>15 Ribu</IonSegmentButton>
                  <IonSegmentButton value='20k'>20 Ribu</IonSegmentButton>
                </IonSegment>
                </div>
                <IonButton expand="full" onClick={handleOrder}>Order Sekarang</IonButton>
                
              </IonCardContent>
            </IonCard>
          )}
        </div>

        {/* <IonList>
          {entries.map((entry) => {
            return (
              <IonItem
                button
                key={entry.id}
                routerLink={"/my/entries/view/" + entry.id}
              >
                <IonThumbnail slot="end">
                  <IonImg src={entry.pictureUrl} />
                </IonThumbnail>
                <IonLabel>
                  <h2>{formatDate(entry.date)}</h2>
                  <h3>{entry.title}</h3>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList> */}
        {/* <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/my/entries/add">
            <IonIcon icon={rocketIcon} />
          </IonFabButton>
        </IonFab> */}
        <IonLoading
          message="Ambil koordinat..."
          spinner="crescent"
          isOpen={showLoading}
        />
        <IonLoading
          isOpen={isSending}
          message="Mengirim order..."
          spinner="dots"
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
