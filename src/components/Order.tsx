import React from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonText,
} from "@ionic/react";
// import { formatDate } from '../date'
import dayjs from "dayjs";

export default function Order(props: any) {
  const { dateTime, destination, price, status } = props.order;
  return (
    <div>
      <IonCard color="light">
        <IonCardHeader color={status === 'order'? "light": status === 'tunggu'? "secondary": status === "jalan"? "warning": "success" }>
          <IonCardSubtitle>{dayjs(dateTime.toDate().toString()).format('D MMM YYYY HH:mm')}</IonCardSubtitle>
          <IonCardTitle>{status === 'selesai'? "History" : "Active" } Order</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonText>
            <p style={{ marginTop: "20px", fontSize: "1.2em", marginBottom: '12px' }}>
              {destination}
            </p>
          </IonText>
          <IonGrid>
            <IonRow>
              <IonCol size="7">
                <div style={{ marginBottom: "10px" }}>
                  <IonText>
                    <p style={{ fontSize: 14, fontWeight: "bold" }}>
                      Harga Penawaran:{' '}
                      <span style={{ color: "brown", fontSize: 16 }}>
                        {price.toLocaleString()}
                      </span>
                    </p>
                  </IonText>
                </div>
              </IonCol>
              <IonCol size="5">
                <div style={{ marginBottom: "10px" }}>
                  <IonText>
                    <p style={{ fontSize: 14, fontWeight: "bold" }}>
                      Status:{" "}
                      <span className="ion-text-uppercase" style={{ color: "brown", fontSize: 16 }}>
                        {status}
                      </span>
                    </p>
                  </IonText>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </div>
  );
}
