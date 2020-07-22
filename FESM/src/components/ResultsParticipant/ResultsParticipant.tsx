import React from 'react';
import { useHistory, useLocation  } from "react-router-dom";
import firebase from 'firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  IonList,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';

import './ResultsParticipant.css';

export default function ResultsParticipant(){
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  let history = useHistory();
  let participantId = query.get("id");
  let participantName = query.get("name") ? ' - ' + query.get("name") : '';

  const [value, loading, error] = useCollection(
    firebase.firestore().collection("Evaluations").orderBy("lastModifiedOn", "desc"),
    {
      snapshotListenOptions:{includeMetadataChanges: true}
    }
  );

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>FESM</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="title">Resultados{participantName}</div>
          <IonGrid>
            <IonRow>
              <IonCol>Fecha</IonCol>
              <IonCol>value 1</IonCol>
              <IonCol>Value 2</IonCol>
              <IonCol>Value 3</IonCol>
              <IonCol>Value 4</IonCol>
              <IonCol>Value 5</IonCol>
              <IonCol>Value 6</IonCol>
              <IonCol>Value 7</IonCol>
            </IonRow>
            {value && value.docs.map(doc => {
              const result = doc.data();
              return (
                !loading && (
                <IonRow key = {doc.id} >
                  <IonCol>{result.lastModifiedOn}</IonCol>
                  <IonCol>{result.cardio}</IonCol>
                  <IonCol>{result.flexibility}</IonCol>
                  <IonCol>{result.nutritional}</IonCol>
                  <IonCol>{result.resistanceABS}</IonCol>
                  <IonCol>{result.resistancePushUps}</IonCol>
                  <IonCol>{result.StrengthLower}</IonCol>
                  <IonCol>{result.StrengthUpper}</IonCol>
                </IonRow>
                )
              );
            })}
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
}