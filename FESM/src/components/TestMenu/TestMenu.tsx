import React, { useState, useEffect } from 'react';
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
  IonModal,
  IonButton,
  IonLabel,
  IonInput,
  IonBadge
} from '@ionic/react';
import {
  heartSharp,
  barbellSharp,
  bicycleSharp,
  roseSharp,
  fastFoodSharp,
  bicycleOutline,
  walkOutline,
  calculatorOutline,
  trendingUpOutline,
  trendingDownOutline
} from 'ionicons/icons';

import './TestMenu.css';
import { useDocument } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';

export enum cardioOptions {
  calculated = 'calculated',
  bicycle = 'bicycle',
  walking = 'walking',
};

export enum strengthOptions {
  lower = 'lower',
  upper = 'upper'
}

export enum resistanceOptions {
  abs = 'abs',
  pushUps = 'pushUps'
}

export default function TestMenu(){
  const [gender, setGender] = useState<string>('');
  const [weight, setWeight] = useState<number>(0);

  const [showCardioModal, setShowCardioModal] = useState<boolean>(false);
  const [cardioOption, setCardioOption] = useState<string>(cardioOptions.calculated);
  const [cardio, setCardio] = useState<number>(0);
  const [cardioVatios, setCardioVatios] = useState<number>();
  const [cardioVel, setCardioVel] = useState<number>();
  const [cardioTrend, setCardioTrend] = useState<number>();

  const [showStrengthModal, setShowStrengthModal] = useState<boolean>(false);
  const [strengthOption, setStrengthOption] = useState<string>(strengthOptions.upper);
  const [strengthUpper, setStrengthUpper] = useState<number>(0);
  const [strengthLower, setStrengthLower] = useState<number>(0);
  const [strengthUpperValue, setStrengthUpperValue] = useState<number>();
  const [strengthLowerValue, setStrengthLowerValue] = useState<number>();

  const [showResistanceModal, setShowResistanceModal] = useState<boolean>(false);
  const [resistanceOption, setResistanceOption] = useState<string>(resistanceOptions.abs);
  const [resistanceABS, setResistanceABS] = useState<number>(0);
  const [resistancePushUps, setResistancePushUps] = useState<number>(0);
  
  const [showFlexibilityModal, setShowFlexibilityModal] = useState<boolean>(false);
  const [flexibility, setFlexibility] = useState<number>(0);
  
  const [showNutricionModal, setShowNutricionModal] = useState<boolean>(false);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  let history = useHistory();
  let participantId = query.get("id");
  let participantName = query.get("name") ? ' - ' + query.get("name") : '';

  const [value, loading, error] = useDocument(
    firebase.firestore().doc("Participants/" + participantId),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    });

  useEffect(() => {
    if (history &&
      value?.exists) 
    {
      const data = value.data();
      if(history.location.pathname === '/FESM/TestMenu' &&
        (!participantId ||
        participantName === '' || !data)) {
        history.push('/FESM');
      }

      setGender(data?.gender);
      setWeight(data?.weight);
    }
  },
  [history, participantId, participantName, value]);

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
            Evaluacion{participantName}
          </div>
          <IonList>
            <IonItem onClick={() => setShowCardioModal(true)}>
              <IonCard className="card">
                <IonIcon className="iconClass" icon={heartSharp}></IonIcon>
                <IonBadge color="primary">{cardio}</IonBadge>
                <IonCardHeader>
                  <IonCardTitle>Cardiovascular</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonItem>
            <IonItem onClick={() => setShowStrengthModal(true)}>
              <IonCard className="card">
                <IonIcon className="iconClass" icon={barbellSharp}></IonIcon>
                <IonBadge color="primary">{strengthUpper}</IonBadge>
                <IonBadge color="primary">{strengthLower}</IonBadge>
                <IonCardHeader>
                  <IonCardTitle>Fuerza</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonItem>
            <IonItem onClick={() => setShowResistanceModal(true)}>
              <IonCard className="card">
                <IonIcon className="iconClass" icon={bicycleSharp}></IonIcon>
                <IonBadge color="primary">{resistanceABS}</IonBadge>
                <IonBadge color="primary">{resistancePushUps}</IonBadge>
                <IonCardHeader>
                  <IonCardTitle>Resistencia</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonItem>
            <IonItem onClick={() => setShowFlexibilityModal(true)}>
              <IonCard className="card">
                <IonIcon className="iconClass" icon={roseSharp}></IonIcon>
                <IonBadge color="primary">{flexibility}</IonBadge>
                <IonCardHeader>
                  <IonCardTitle>Flexibilidad</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonItem>
            <IonItem onClick={() => setShowNutricionModal(true)}>
              <IonCard className="card">
                <IonIcon className="iconClass" icon={fastFoodSharp}></IonIcon>
                <IonCardHeader>
                  <IonCardTitle>Estado Nutricional</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonItem>
          </IonList>

          <IonModal isOpen={showCardioModal}>
            <div className="modalContainer">
              <div>
                FITNESS CARDIOVASCULAR
              </div>

              <div className="tabs">  
                <IonIcon class={cardioOption === cardioOptions.calculated ? 'tab-icon active' : 'tab-icon inactive'} icon={calculatorOutline} onClick={() => setCardioOption(cardioOptions.calculated)}/>
                <IonIcon class={cardioOption === cardioOptions.bicycle ? 'tab-icon active' : 'tab-icon inactive'} icon={bicycleOutline} onClick={() => setCardioOption(cardioOptions.bicycle)}/>
                <IonIcon class={cardioOption === cardioOptions.walking ? 'tab-icon active' : 'tab-icon inactive'} icon={walkOutline} onClick={() => setCardioOption(cardioOptions.walking)}/>
              </div>
              <div className='option-content'>
                {cardioOption === cardioOptions.calculated && 
                  <div>
                    <div>Calculo directo</div>
                    <IonItem>
                      <IonLabel position="floating">Valor de ergoespirometria</IonLabel>
                      <IonInput value={cardio} onIonChange={e => setCardio(parseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                  </div>
                }
                {cardioOption === cardioOptions.bicycle && 
                  <div>
                    <div>Calculo indirecto - Bicicleta</div>
                    <IonItem>
                      <IonLabel position="floating">Vatios</IonLabel>
                      <IonInput value={cardioVatios} onIonChange={e => setCardioVatios(parseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                  </div>
                }
                {cardioOption === cardioOptions.walking && 
                  <div>
                    <div>Calculo indirecto - Trote</div>
                    <IonItem>
                      <IonLabel position="floating">Velocidad (Millas/min)</IonLabel>
                      <IonInput value={cardioVel} onIonChange={e => setCardioVel(parseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Inclinacion (%)</IonLabel>
                      <IonInput value={cardioTrend} onIonChange={e => setCardioTrend(parseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                  </div>
                }
              </div>
              <IonButton onClick={() => {
                if (cardioOption === cardioOptions.bicycle && cardioVatios) {
                  const vo2rest = gender === 'female' ? 300 : 350;
                  setCardio((vo2rest + (12 * cardioVatios))/weight);
                }

                if (cardioOption === cardioOptions.walking && cardioVel && cardioTrend) {
                  const velMMin = cardioVel * 26.8;
                  const trendDouble = cardioTrend / 100;
                  setCardio((0.2 * velMMin) + (0.9 * velMMin * trendDouble) + 3.5);
                }

                setShowCardioModal(false);
                }
              }>
                  SAVE AND CLOSE
              </IonButton>
            </div>
            
          </IonModal>
          <IonModal isOpen={showStrengthModal}>
            <div className="modalContainer">
              <div>
                FITNESS FUERZA
              </div>

              <div className="tabs">  
                <IonIcon class={strengthOption === strengthOptions.upper ? 'tab-icon active' : 'tab-icon inactive'} icon={trendingUpOutline} onClick={() => setStrengthOption(strengthOptions.upper)}/>
                <IonIcon class={strengthOption === strengthOptions.lower ? 'tab-icon active' : 'tab-icon inactive'} icon={trendingDownOutline} onClick={() => setStrengthOption(strengthOptions.lower)}/>
              </div>
              <div className='option-content'>
                {strengthOption === strengthOptions.upper && 
                  <div>
                    <div>Tronco Superior</div>
                    <IonItem>
                      <IonLabel position="floating">Peso (Kg)</IonLabel>
                      <IonInput value={strengthUpperValue} onIonChange={e => setStrengthUpperValue(parseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                  </div>
                }
                {strengthOption === strengthOptions.lower && 
                  <div>
                    <div>Tronco Inferior</div>
                    <IonItem>
                      <IonLabel position="floating">Peso (Kg)</IonLabel>
                      <IonInput value={strengthLowerValue} onIonChange={e => setStrengthLowerValue(parseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                  </div>
                }
              </div>
            </div>
            <IonButton onClick={() => {
              if (strengthUpperValue) {
                setStrengthUpper(strengthUpperValue / weight);
              }

              if (strengthLowerValue) {
                setStrengthLower(strengthLowerValue / weight);
              }
              setShowStrengthModal(false);
            }}>
                Close Fuerza Modal
            </IonButton>
          </IonModal>
          <IonModal isOpen={showResistanceModal}>
            <div className="modalContainer">
              <div>
                FITNESS RESISTENCIA
              </div>

              <div className="tabs">  
                <IonIcon class={resistanceOption === resistanceOptions.abs ? 'tab-icon active' : 'tab-icon inactive'} icon={trendingUpOutline} onClick={() => setResistanceOption(resistanceOptions.abs)}/>
                <IonIcon class={resistanceOption === resistanceOptions.pushUps ? 'tab-icon active' : 'tab-icon inactive'} icon={trendingDownOutline} onClick={() => setResistanceOption(resistanceOptions.pushUps)}/>
              </div>
              <div className='option-content'>
                {resistanceOption === resistanceOptions.abs && 
                  <div>
                    <div>Abdominales</div>
                    <IonItem>
                      <IonLabel position="floating"># abdominales (1 m)</IonLabel>
                      <IonInput value={resistanceABS} onIonChange={e => setResistanceABS(parseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                  </div>
                }
                {resistanceOption === resistanceOptions.pushUps && 
                  <div>
                    <div>Flexiones de pecho</div>
                    <IonItem>
                      <IonLabel position="floating"># flexiones de pecho (1 m)</IonLabel>
                      <IonInput value={resistancePushUps} onIonChange={e => setResistancePushUps(parseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                  </div>
                }
              </div>
            </div>
            <IonButton onClick={() => setShowResistanceModal(false)}>
                Close Resistencia Modal
            </IonButton>
          </IonModal>
          <IonModal isOpen={showFlexibilityModal}>
            <div className="modalContainer">
              <div>
                FITNESS FLEXIBILIDAD
              </div>
              <div className='option-content'>
                <div>
                  <div>Flexibilidad</div>
                  <IonItem>
                    <IonLabel position="floating">distancia (cm)</IonLabel>
                    <IonInput value={flexibility} onIonChange={e => setFlexibility(parseFloat(e.detail.value!))}></IonInput>
                  </IonItem>
                </div>
              </div>
            </div>
            <IonButton onClick={() => setShowFlexibilityModal(false)}>
                Close Flexibilidad Modal
            </IonButton>
          </IonModal>
          <IonModal isOpen={showNutricionModal}>
            <p>This is the Nutricion modal content.</p>
            <IonButton onClick={() => setShowNutricionModal(false)}>
                Close Nutricion Modal
            </IonButton>
          </IonModal>
        </IonContent>
      </IonPage>
    </>
  );
};