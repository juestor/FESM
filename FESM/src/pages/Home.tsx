import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react';

import './Home.css';
import Information from '../components/Information/Information';
import NewParticipant from '../components/NewParticipant/NewParticipant';
import MyParticipants from '../components/MyParticipants/MyParticipants';
import ImportantAdvice from '../components/ImportantAdvice/ImportantAdvice';


const Home = (props: { mode: string; }) => {
  const { mode } = props;

  return (
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
        {mode === 'Information' ? (
          <Information />
        ) : mode === 'NewParticipant' ? (
          <NewParticipant />
        ) : mode === 'MyParticipants' ? (
          <MyParticipants />
        ) : <ImportantAdvice />}
      </IonContent>
    </IonPage>
  );
};

export default Home;
