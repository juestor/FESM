import React, { useState } from 'react';
import firebase from 'firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { IonList, IonItem, IonLabel, IonText, IonItemSliding, IonItemOption, IonItemOptions, IonIcon } from '@ionic/react';

import MyParticipant from '../MyParticipant/MyParticipant';

export default function MyParticipants({doEdit}: any){

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

  const doDelete = (id: string) => {
    firebase.firestore().collection("Participants").doc(id).delete();
  };

  return (
    <>
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
    </>
  );
}
/* interface ContainerProps { }

const MyParticipants: React.FC<ContainerProps> = () => {
  
  return (
    <div>
      My PArticipants Page!!!!
    </div>
  );
};

export default MyParticipants; */