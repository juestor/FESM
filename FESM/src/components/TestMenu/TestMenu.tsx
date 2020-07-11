import React from 'react';
import { useHistory, useLocation  } from "react-router-dom";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonIcon,
} from '@ionic/react';
import { heartSharp, barbellSharp, bicycleSharp, roseSharp, fastFoodSharp} from 'ionicons/icons';

import './TestMenu.css';

export default function TestMenu(){
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  let history = useHistory();
  let participantId = query.get("id");
  let participantName = query.get("name");

  if(!participantId)
    history.push('/FESM');

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
          <div className="title">
            Evaluacion - {participantName}
          </div>
          <IonList>
            <IonItem>
              <IonCard className="card">
                <IonIcon className="iconClass" icon={heartSharp}></IonIcon>
                <IonCardHeader>
                  <IonCardTitle>Cardiovascular</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonItem>
            <IonItem>
              <IonCard className="card">
                <IonIcon className="iconClass" icon={barbellSharp}></IonIcon>
                <IonCardHeader>
                  <IonCardTitle>Fuerza</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonItem>
            <IonItem>
              <IonCard className="card">
                <IonIcon className="iconClass" icon={bicycleSharp}></IonIcon>
                <IonCardHeader>
                  <IonCardTitle>Resistencia</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonItem>
            <IonItem>
              <IonCard className="card">
                <IonIcon className="iconClass" icon={roseSharp}></IonIcon>
                <IonCardHeader>
                  <IonCardTitle>Flexibilidad</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonItem>
            <IonItem>
              <IonCard className="card">
                <IonIcon className="iconClass" icon={fastFoodSharp}></IonIcon>
                <IonCardHeader>
                  <IonCardTitle>Estado Nutricional</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};