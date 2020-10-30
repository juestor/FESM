import React from 'react';
import './ImportantAdvice.css';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton
} from '@ionic/react';

interface ContainerProps { }

const ImportantAdvice: React.FC<ContainerProps> = () => {
  
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
          <IonCard>
            <IonImg src="assets/img/jogging.jpg" />
            <IonCardHeader>
              <IonCardTitle class="card-title">Aviso Importante</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
            El objetivo de esta aplicación es determinar el nivel del fitness en personas sanas, no atletas, mayores de 18 años. Exclusiva para médicos del deporte.
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ImportantAdvice;