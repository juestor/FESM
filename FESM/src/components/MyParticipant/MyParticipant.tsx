import React from 'react';
import { IonItem, IonLabel, IonText, IonItemSliding, IonItemOption, IonItemOptions, IonIcon } from '@ionic/react';
import { document, trash, analytics } from 'ionicons/icons';

export default function MyParticipant({doEvaluation, doEdit, doDelete, doc}: any){
  let data = doc.data();

  return(
    <IonItemSliding>
      <IonItem>
        <IonLabel class = "ion-text-wrap">
          <IonText class= "item-title">
            <div>{data.name}</div>
          </IonText>
          <IonText class= "item-sub-title">
            <div>{data.lastName}</div>
          </IonText>
          <IonText class= "item-id">
            <div>{new Date(data.lastModifiedOn) + ''}</div>
          </IonText>
        </IonLabel>
        <div></div>
      </IonItem>
      <IonItemOptions>
        <IonItemOption color="primary" onClick= {() => doEvaluation(doc.id)}>
          <IonIcon slot="icon-only" icon={analytics}>
          </IonIcon>
        </IonItemOption>
        <IonItemOption color="secondary" onClick={() => doEdit(doc.id)}>
          <IonIcon slot="icon-only" icon={document}>
          </IonIcon>
        </IonItemOption>
        <IonItemOption color="danger" onClick= {() => doDelete(doc.id)}>
          <IonIcon slot="icon-only" icon={trash}>
          </IonIcon>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
}
