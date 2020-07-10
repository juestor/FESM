import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react';

import './Information.css';

interface ContainerProps { }

const Information: React.FC<ContainerProps> = () => {
  
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
          <div>
            Information Selection!!!!!!!
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Information;