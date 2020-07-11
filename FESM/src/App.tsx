import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import MainMenu from './components/MainMenu/MainMenu';
import Information from './components/Information/Information';
import ImportantAdvice from './components/ImportantAdvice/ImportantAdvice';
import NewParticipant from './components/NewParticipant/NewParticipant';
import MyParticipants from './components/MyParticipants/MyParticipants';
import TestMenu from './components/TestMenu/TestMenu';

/* Firebase imports */
import firebase from 'firebase/app';

//TODO: put in a separate file and exclude from git
const firebaseConfig = {
  apiKey: 'AIzaSyChw_Agub3eXHpHMx4yZ1Cl2tp78QETsjA',
  authDomain: 'fesm-e0720.firebaseapp.com',
  databaseURL: 'https://fesm-e0720.firebaseio.com',
  projectId: 'fesm-e0720',
  storageBucket: 'fesm-e0720.appspot.com',
  messagingSenderId: '36390058602',
  appId: '1:36390058602:web:440edfdd1927f63a48a813',
  measurementId: 'G-G997W60ZH1'
};

firebase.initializeApp(firebaseConfig);

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <MainMenu/>
      <IonRouterOutlet id='main-content'>
        <Route path='/FESM' component={() => <ImportantAdvice />} exact={true} />
        <Route path='/FESM/NewParticipant' component={() => <NewParticipant />} exact={true} />
        <Route path='/FESM/MyParticipants' component={() => <MyParticipants />} exact={true} />
        <Route path='/FESM/Information' component={() => <Information />} exact={true} />
        <Route path='/FESM/TestMenu' component={() => <TestMenu />} exact={true} />
        <Route exact path='/' render={() => <Redirect to='/FESM' />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
