import React, { useState } from 'react';
import { useHistory  } from "react-router-dom";
import firebase from 'firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonIcon,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton
} from '@ionic/react';

import MyParticipant from '../MyParticipant/MyParticipant';

export default function MyParticipants(){
  let history = useHistory();

  const [value, loading, error] = useCollection(
    firebase.firestore().collection("Participants").orderBy("name", "desc"),
    {
      snapshotListenOptions:{includeMetadataChanges: true}
    }
  );

  const closeSlidingParticipants = () => {
    /* let list = document.getElementById('participantList');
    list.closeSlidingParticipants(); */
  };

  const doEdit = (id: string) => {
    history.push('/FESM/NewParticipant?id=' + id);
  };

  const doDelete = (id: string) => {
    firebase.firestore().collection("Participants").doc(id).delete();
  };

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
          <h3>My Participants</h3>
          <IonList id="participantList">
            {value && value.docs.map(doc => {
              return (
                !loading && (
                  <MyParticipant
                    doc = {doc}
                    doEdit = {(i: any) => {
                      closeSlidingParticipants();
                      doEdit(i);
                    }}
                    doDelete = {(i: any) =>{
                      closeSlidingParticipants();
                      doDelete(i);
                    }}
                    key = { doc.id } 
                  />
                )
              );
            })}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
}