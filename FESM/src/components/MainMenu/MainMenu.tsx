import React from 'react';
import { menuController } from "@ionic/core"; 
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel } from '@ionic/react';

import './MainMenu.css';

interface ContainerProps { }

const MainMenu: React.FC<ContainerProps> = () => {
  const navigate = (navigateTo: string) => {
    console.log('NAVIGATE TO', navigateTo);
    menuController.toggle();
  };

  return (
    <IonMenu side="start" content-id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menú</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem
            onClick={() => navigate('newParticipant')}
            routerLink="/FESM/NewParticipant"
          >
            <IonIcon name="person-add-outline"></IonIcon>
            <IonLabel>Nuevo Participante</IonLabel>
          </IonItem>
          <IonItem
            onClick={() => navigate('myParticipants')}
            routerLink="/FESM/MyParticipants"
          >
            <IonIcon name="people-outline"></IonIcon>
            <IonLabel>Mis Participantes</IonLabel>
          </IonItem>
          <IonItem
            onClick={() => navigate('information')}
            routerLink="/FESM/Information"
          >
            <IonIcon name="alert-outline"></IonIcon>
            <IonLabel>Información</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default MainMenu;