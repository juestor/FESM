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
import Home from './pages/Home';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <MainMenu/>
      <IonRouterOutlet id="main-content">
        <Route path="/FESM" component={Home} exact={true} />
        <Route path="/FESM/NewParticipant" component={() => <Home mode='NewParticipant'/>} exact={true} />
        <Route path="/FESM/MyParticipants" component={() => <Home mode='MyParticipants'/>} exact={true} />
        <Route path="/FESM/Information" component={() => <Home mode='Information'/>} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/FESM" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
