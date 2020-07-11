import React from 'react';
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
  IonCardContent,
  IonList,
  IonItem,
  IonIcon,
} from '@ionic/react';
import { heartSharp, barbellSharp, bicycleSharp, roseSharp, fastFoodSharp} from 'ionicons/icons';

import './TestMenu.css';

export default function TestMenu(){
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
            Evaluaciones
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