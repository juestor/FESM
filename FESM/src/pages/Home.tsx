import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import NewParticipant from '../components/NewParticipant/NewParticipant';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>FESM</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <NewParticipant />
      </IonContent>
    </IonPage>
  );
};

export default Home;
