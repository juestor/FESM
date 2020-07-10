import React from 'react';
import { IonItem, IonLabel, IonText, IonItemSliding, IonItemOption, IonItemOptions, IonIcon } from '@ionic/react';
import { document, trash } from 'ionicons/icons';

export default function MyParticipant({doEdit, doDelete, doc}: any){
  let data = doc.data();

  return(
    <IonItemSliding>
      <IonItem>
        <IonLabel class = "ion-text-wrap">
          <IonText class= "item-title">
            <div>{data.name}</div>
          </IonText>
          <IonText class= "item-sub-title">
            TBD
            {/* <div>{new Date(data.createnOn)}</div> */}
          </IonText>
          <IonText class= "item-id">
            {doc.id} // check if is data?
          </IonText>
        </IonLabel>
        <div></div>
      </IonItem>
      <IonItemOptions>
        <IonItemOption onClick={() => doEdit(doc.id)}>
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
