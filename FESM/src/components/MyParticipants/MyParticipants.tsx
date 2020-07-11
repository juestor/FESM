import React from 'react';
import { useHistory  } from "react-router-dom";
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
  IonMenuButton
} from '@ionic/react';

import MyParticipant from '../MyParticipant/MyParticipant';
import './MyParticipants.css';

export default function MyParticipants(){
  let history = useHistory();

  const [value, loading, error] = useCollection(
    firebase.firestore().collection("Participants").orderBy("name", "desc"),
    {
      snapshotListenOptions:{includeMetadataChanges: true}
    }
  );

  const closeSlidingParticipants = () => {
    let list: any = document.getElementById('participantList');
    if(!list){
      return;
    }
    list.closeSlidingItems();
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
          <div className="title">Mis Participantes</div>
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