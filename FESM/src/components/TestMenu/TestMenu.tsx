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
  IonBadge,
  IonFab,
  IonFabButton
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
  trendingDownOutline,
  eyedropOutline,
  saveOutline
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
};

export enum resistanceOptions {
  abs = 'abs',
  pushUps = 'pushUps'
};

export enum nutritionalOptions {
  direct = 'direct',
  folds = 'folds'
};

export default function TestMenu(){
  const [gender, setGender] = useState<string>('');
  const [weight, setWeight] = useState<number>(0);
  const [age, setAge] = useState<number>(0);

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
  
  const [showNutritionalModal, setShowNutritionalModal] = useState<boolean>(false);
  const [nutritionalOption, setNutritionalOption] = useState<string>(nutritionalOptions.direct);
  const [nutritionalValue, setNutritionalValue] = useState<number>(0);
  const [tricepsFold, setTricepsFold] = useState<number>(0);
  const [subscapularFold, setSubscapularFold] = useState<number>(0);
  const [pectoralFold, setPectoralFold] = useState<number>(0);
  const [axillaryFold, setAxillaryFold] = useState<number>(0);
  const [supraIliacFold, setSupraIliacFold] = useState<number>(0);
  const [abdominalFold, setAbdominalFold] = useState<number>(0);
  const [anteriorThighFold, setAnteriorThighFold] = useState<number>(0);

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
      setAge(calculate_age(data?.birthDate));
    }
  },
  [history, participantId, participantName, value]);

  const calculate_age = (dob1: string): number => {
    var today = new Date();
    var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age_now--;
    }
    console.log(age_now);
    return age_now;
  }

  const save = async() => {
    console.log('***************** SAVEEEEEE');
    let collectionRef = firebase.firestore().collection('Evaluations');
    await collectionRef.add(
      {
        participantId,
        cardio,
        strengthUpper,
        strengthLower,
        resistanceABS,
        resistancePushUps,
        flexibility,
        nutritional: nutritionalValue,
        lastModifiedOn: new Date().getTime()
      }
    );

    setCardio(0);
    setStrengthUpper(0);
    setStrengthLower(0);
    setResistanceABS(0);
    setResistancePushUps(0);
    setFlexibility(0);
    setNutritionalValue(0);
    
    history.push('/FESM');
  };

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
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => save()}>
            <IonIcon icon={saveOutline} />
          </IonFabButton>
        </IonFab>
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
            <IonItem onClick={() => setShowNutritionalModal(true)}>
              <IonCard className="card">
                <IonIcon className="iconClass" icon={fastFoodSharp}></IonIcon>
                <IonBadge color="primary">{nutritionalValue}</IonBadge>
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
          <IonModal isOpen={showNutritionalModal}>
          <div className="modalContainer">
              <div>
                FITNESS NUTRICIONAL
              </div>

              <div className="tabs">  
                <IonIcon class={nutritionalOption === nutritionalOptions.direct ? 'tab-icon active' : 'tab-icon inactive'} icon={calculatorOutline} onClick={() => setNutritionalOption(nutritionalOptions.direct)}/>
                <IonIcon class={nutritionalOption === nutritionalOptions.folds ? 'tab-icon active' : 'tab-icon inactive'} icon={eyedropOutline} onClick={() => setNutritionalOption(nutritionalOptions.folds)}/>
              </div>
              <div className='option-content'>
                {nutritionalOption === nutritionalOptions.direct && 
                  <div>
                    <div>Calculo directo</div>
                    <IonItem>
                      <IonLabel position="floating">% graso</IonLabel>
                      <IonInput value={nutritionalValue} onIonChange={e => setNutritionalValue(parseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                  </div>
                }
                {nutritionalOption === nutritionalOptions.folds && 
                  <div>
                    <div>Pliegues</div>
                    <IonItem>
                      <IonLabel position="floating">Triceps</IonLabel>
                      <IonInput value={tricepsFold} onIonChange={e => setTricepsFold(parseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Subescapular</IonLabel>
                      <IonInput value={subscapularFold} onIonChange={e => setSubscapularFold(parseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Pectoral</IonLabel>
                      <IonInput value={pectoralFold} onIonChange={e => setPectoralFold(parseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Medio Axilar</IonLabel>
                      <IonInput value={axillaryFold} onIonChange={e => setAxillaryFold(parseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Supra Iliaco</IonLabel>
                      <IonInput value={supraIliacFold} onIonChange={e => setSupraIliacFold(parseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Abdonimal</IonLabel>
                      <IonInput value={abdominalFold} onIonChange={e => setAbdominalFold(parseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Muslo Anterior</IonLabel>
                      <IonInput value={anteriorThighFold} onIonChange={e => setAnteriorThighFold(parseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                  </div>
                }
              </div>
            </div>
            <IonButton onClick={() => {
              if(nutritionalOption === nutritionalOptions.folds){
                if(tricepsFold && subscapularFold && pectoralFold && axillaryFold && supraIliacFold && abdominalFold && anteriorThighFold) {
                  const sumatoria = tricepsFold + subscapularFold + pectoralFold + axillaryFold + supraIliacFold + abdominalFold + anteriorThighFold;
                  let density;

                  if(gender === 'female') {
                    density = (1.097 - (0.00046971 * sumatoria) + (0.00000056 * sumatoria^2) - (0.00012828 * age));
                  } else {
                    density = (1.112 - (0.00043499 * sumatoria) + (0.00000055 * sumatoria^2) - (0.00028826 * age));
                  }

                  setNutritionalValue(((495/density) - 450));
                }
              }
              setShowNutritionalModal(false);
            }}>
                Close Nutricion Modal
            </IonButton>
          </IonModal>
        </IonContent>
      </IonPage>
    </>
  );
};