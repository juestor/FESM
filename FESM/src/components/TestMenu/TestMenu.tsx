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
import PercentileService from '../../common/services/percentile.service';

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
  const [gender, setGender] = useState<string>();
  const [weight, setWeight] = useState<number>();
  const [age, setAge] = useState<number>();

  const [showCardioModal, setShowCardioModal] = useState<boolean>(false);
  const [cardioOption, setCardioOption] = useState<string>(cardioOptions.calculated);
  const [cardio, setCardio] = useState<number>();
  const [cardioValue, setCardioValue] = useState<number>();
  const [cardioVatios, setCardioVatios] = useState<number>();
  const [cardioVel, setCardioVel] = useState<number>();
  const [cardioTrend, setCardioTrend] = useState<number>();

  const [showStrengthModal, setShowStrengthModal] = useState<boolean>(false);
  const [strengthOption, setStrengthOption] = useState<string>(strengthOptions.upper);
  const [strengthUpper, setStrengthUpper] = useState<number>();
  const [strengthLower, setStrengthLower] = useState<number>();
  const [strengthUpperValue, setStrengthUpperValue] = useState<number>();
  const [strengthLowerValue, setStrengthLowerValue] = useState<number>();

  const [showResistanceModal, setShowResistanceModal] = useState<boolean>(false);
  const [resistanceOption, setResistanceOption] = useState<string>(resistanceOptions.abs);
  const [resistanceABSValue, setResistanceABSValue] = useState<number>();
  const [resistanceABS, setResistanceABS] = useState<number>();
  const [resistancePushUpsValue, setResistancePushUpsValue] = useState<number>();
  const [resistancePushUps, setResistancePushUps] = useState<number>();
  
  const [showFlexibilityModal, setShowFlexibilityModal] = useState<boolean>(false);
  const [flexibilityValue, setFlexibilityValue] = useState<number>();
  const [flexibility, setFlexibility] = useState<number>();
  
  const [showNutritionalModal, setShowNutritionalModal] = useState<boolean>(false);
  const [nutritionalOption, setNutritionalOption] = useState<string>(nutritionalOptions.direct);
  const [nutritionalValue, setNutritionalValue] = useState<number>();
  const [nutritional, setNutritional] = useState<number>();
  const [tricepsFold, setTricepsFold] = useState<number>();
  const [subscapularFold, setSubscapularFold] = useState<number>();
  const [pectoralFold, setPectoralFold] = useState<number>();
  const [axillaryFold, setAxillaryFold] = useState<number>();
  const [supraIliacFold, setSupraIliacFold] = useState<number>();
  const [abdominalFold, setAbdominalFold] = useState<number>();
  const [anteriorThighFold, setAnteriorThighFold] = useState<number>();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  let history = useHistory();
  let participantId = query.get("id");
  let participantName = query.get("name") ? query.get("name") : '';

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

      if(data){
        if (data.gender) {
          setGender(data.gender);
        }
        if (data.weight) {
          setWeight(data?.weight);
        }
        if (data.birthDate) {
          setAge(calculate_age(data?.birthDate));
        }
      }
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
    return age_now;
  }

  const safeParseFloat = (inputValue: string) => {
    const value = Number.parseFloat(inputValue);
    return Number.isNaN(value) ? 0 : value;    
  }

  const save = async() => {
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
        nutritional,
        lastModifiedOn: new Date().getTime()
      }
    );

    setCardio(0);
    setStrengthUpper(0);
    setStrengthLower(0);
    setResistanceABS(0);
    setResistancePushUps(0);
    setFlexibility(0);
    setNutritional(0);
    
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
        {(cardio || strengthUpper || strengthLower || resistanceABS || resistancePushUps || flexibility || nutritional) && <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => save()}>
            <IonIcon icon={saveOutline} />
          </IonFabButton>
        </IonFab>}
          <IonLabel className="title">
            Evaluación
          </IonLabel>
          <IonLabel className="subtitle" color="primary">
            {participantName}
          </IonLabel>
          <div className="list">
            <IonCard className="card" onClick={() => setShowCardioModal(true)}>
              <IonIcon className="iconClass" icon={heartSharp}></IonIcon>
              <IonCardHeader className="card-title-container">
                <IonCardTitle className="card-title" color="secondary">Cardiovascular</IonCardTitle>
              </IonCardHeader>
              <div className="results-container">
                {cardio && <div className="result">
                  <IonBadge color="success">{cardio}</IonBadge>
                </div>}
              </div>             
            </IonCard>
            <IonCard className="card" onClick={() => setShowStrengthModal(true)}>
              <IonIcon className="iconClass" icon={barbellSharp}></IonIcon>
              <IonCardHeader className="card-title-container">
                <IonCardTitle className="card-title" color="secondary">Fuerza</IonCardTitle>
              </IonCardHeader>
              <div className="results-container">
                {strengthUpper && <div className="result">
                  <IonLabel color="primary">Superior</IonLabel>
                  <IonBadge color="success">{strengthUpper}</IonBadge>
                </div>}
                {strengthLower && <div className="result">
                  <IonLabel color="primary">Inferior</IonLabel>
                  <IonBadge color="success">{strengthLower}</IonBadge>
                </div>}
              </div>
            </IonCard>
            <IonCard className="card" onClick={() => setShowResistanceModal(true)}>
              <IonIcon className="iconClass" icon={bicycleSharp}></IonIcon>
              <IonCardHeader className="card-title-container">
                <IonCardTitle className="card-title" color="secondary">Resistencia</IonCardTitle>
              </IonCardHeader>
              <div className="results-container">
                {resistanceABS && <div className="result">
                  <IonLabel color="primary">Abs</IonLabel>
                  <IonBadge color="success">{resistanceABS}</IonBadge>
                </div>}
                {resistancePushUps && <div className="result">
                  <IonLabel color="primary">F. Pecho</IonLabel>
                  <IonBadge color="success">{resistancePushUps}</IonBadge>
                </div>}
              </div>
            </IonCard>
            <IonCard className="card" onClick={() => setShowFlexibilityModal(true)}>
              <IonIcon className="iconClass" icon={roseSharp}></IonIcon>
              <IonCardHeader className="card-title-container">
                <IonCardTitle className="card-title" color="secondary">Flexibilidad</IonCardTitle>
              </IonCardHeader>
              <div className="results-container">
                {flexibility && <div className="result">
                  <IonBadge color="success">{flexibility}</IonBadge>
                </div>}
              </div>
            </IonCard>
            <IonCard className="card" onClick={() => setShowNutritionalModal(true)}>
              <IonIcon className="iconClass" icon={fastFoodSharp}></IonIcon>
              <IonCardHeader className="card-title-container">
                <IonCardTitle className="card-title" color="secondary">Estado Nutricional</IonCardTitle>
              </IonCardHeader>
              <div className="results-container">
                {nutritional && <div className="result">
                  <IonBadge color="success">{nutritional}</IonBadge>
                </div>}
              </div>
            </IonCard>
          </div>
          <IonModal isOpen={showCardioModal}>
            <div className="modalContainer">
              <IonLabel className="modal-title" color="primary">
                FITNESS CARDIOVASCULAR
              </IonLabel>
              <div className="tabs">  
                <IonIcon class={cardioOption === cardioOptions.calculated ? 'tab-icon active' : 'tab-icon inactive'} icon={calculatorOutline} onClick={() => setCardioOption(cardioOptions.calculated)}/>
                <IonIcon class={cardioOption === cardioOptions.bicycle ? 'tab-icon active' : 'tab-icon inactive'} icon={bicycleOutline} onClick={() => setCardioOption(cardioOptions.bicycle)}/>
                <IonIcon class={cardioOption === cardioOptions.walking ? 'tab-icon active' : 'tab-icon inactive'} icon={walkOutline} onClick={() => setCardioOption(cardioOptions.walking)}/>
              </div>
              <div className='option-content'>
                {cardioOption === cardioOptions.calculated && 
                  <div className="option">
                    <IonLabel className="option-title" color="secondary">
                      Cálculo directo
                    </IonLabel>
                    <IonItem className="option-value">
                      <IonLabel position="floating">Valor de ergoespirometria</IonLabel>
                      <IonInput value={cardioValue} onIonChange={e => setCardioValue(safeParseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                  </div>
                }
                {cardioOption === cardioOptions.bicycle && 
                  <div className="option">
                    <IonLabel className="option-title" color="secondary">
                      Cálculo indirecto - Bicicleta
                    </IonLabel>
                    <IonItem className="option-value">
                      <IonLabel position="floating">Vatios</IonLabel>
                      <IonInput value={cardioVatios} onIonChange={e => setCardioVatios(safeParseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                  </div>
                }
                {cardioOption === cardioOptions.walking && 
                  <div className="option">
                    <IonLabel className="option-title" color="secondary">
                      Cálculo indirecto - Trote
                    </IonLabel>
                    <IonItem className="option-value">
                      <IonLabel position="floating">Velocidad (Millas/min)</IonLabel>
                      <IonInput value={cardioVel} onIonChange={e => setCardioVel(safeParseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                    <IonItem className="option-value">
                      <IonLabel position="floating">Inclinacion (%)</IonLabel>
                      <IonInput value={cardioTrend} onIonChange={e => setCardioTrend(safeParseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                  </div>
                }
              </div>
              <IonButton onClick={() => {
                let result: number = 0;
                if (cardioOption === cardioOptions.calculated && cardioValue) {
                  result = cardioValue;
                }

                if (cardioOption === cardioOptions.bicycle && cardioVatios && weight && weight > 0) {
                  const vo2rest = gender === 'female' ? 300 : 350;
                  result = (vo2rest + (12 * cardioVatios))/weight;
                }

                if (cardioOption === cardioOptions.walking && cardioVel && cardioTrend) {
                  const velMMin = cardioVel * 26.8;
                  const trendDouble = cardioTrend / 100;
                  result = (0.2 * velMMin) + (0.9 * velMMin * trendDouble) + 3.5;
                }

                if(age && gender) {
                  const percentile = PercentileService.getVo2Percentile(result, age, gender);
                  console.log('CARDIO');
                  console.log('result', result);
                  console.log('percentile - V02', percentile);
                  setCardio(percentile);
                }

                setShowCardioModal(false);
                }
              }>
              Volver
              </IonButton>
            </div>
            
          </IonModal>
          <IonModal isOpen={showStrengthModal}>
            <div className="modalContainer">
              <IonLabel className="modal-title" color="primary">
                FITNESS FUERZA
              </IonLabel>

              <div className="tabs">  
                <IonIcon class={strengthOption === strengthOptions.upper ? 'tab-icon active' : 'tab-icon inactive'} icon={trendingUpOutline} onClick={() => setStrengthOption(strengthOptions.upper)}/>
                <IonIcon class={strengthOption === strengthOptions.lower ? 'tab-icon active' : 'tab-icon inactive'} icon={trendingDownOutline} onClick={() => setStrengthOption(strengthOptions.lower)}/>
              </div>
              <div className='option-content'>
                {strengthOption === strengthOptions.upper && 
                  <div className="option">
                    <IonLabel className="option-title" color="secondary">
                      Tronco Superior
                    </IonLabel>
                    <IonItem className="option-value">
                      <IonLabel position="floating">Peso (Kg)</IonLabel>
                      <IonInput value={strengthUpperValue} onIonChange={e => setStrengthUpperValue(safeParseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                  </div>
                }
                {strengthOption === strengthOptions.lower && 
                  <div  className="option">
                    <IonLabel className="option-title" color="secondary">
                      Tronco Inferior
                    </IonLabel>
                    <IonItem className="option-value">
                      <IonLabel position="floating">Peso (Kg)</IonLabel>
                      <IonInput value={strengthLowerValue} onIonChange={e => setStrengthLowerValue(safeParseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                  </div>
                }
              </div>
              <IonButton onClick={() => {
                let result: number = 0;
                if (strengthUpperValue && weight && weight > 0) {
                  result = strengthUpperValue / weight;

                  if(age && gender) {
                    const percentile = PercentileService.getChestPressPercentile(result, age, gender);
                    console.log('Upper Strength');
                    console.log('result', result);
                    console.log('percentile - ChestPress', percentile);
                    setStrengthUpper(percentile);
                  }
                }

                if (strengthLowerValue && weight && weight > 0) {
                  result = strengthLowerValue / weight;

                  if(age && gender) {
                    const percentile = PercentileService.getLegPressPercentile(result, age, gender);
                    console.log('Lower Strength');
                    console.log('result', result);
                    console.log('percentile - LegPress', percentile);
                    setStrengthLower(percentile);
                  }
                }
                
                setShowStrengthModal(false);
                }}>
                Volver
              </IonButton>
            </div>
          </IonModal>
          <IonModal isOpen={showResistanceModal}>
            <div className="modalContainer">
              <IonLabel className="modal-title" color="primary">
                FITNESS RESISTENCIA
              </IonLabel>

              <div className="tabs">  
                <IonIcon class={resistanceOption === resistanceOptions.abs ? 'tab-icon active' : 'tab-icon inactive'} icon={trendingUpOutline} onClick={() => setResistanceOption(resistanceOptions.abs)}/>
                <IonIcon class={resistanceOption === resistanceOptions.pushUps ? 'tab-icon active' : 'tab-icon inactive'} icon={trendingDownOutline} onClick={() => setResistanceOption(resistanceOptions.pushUps)}/>
              </div>
              <div className='option-content'>
                {resistanceOption === resistanceOptions.abs && 
                  <div className="option">
                    <IonLabel className="option-title" color="secondary">
                      Abdominales
                    </IonLabel>
                    <IonItem className="option-value">
                      <IonLabel position="floating"># abdominales (1 m)</IonLabel>
                      <IonInput value={resistanceABSValue} onIonChange={e => setResistanceABSValue(safeParseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                  </div>
                }
                {resistanceOption === resistanceOptions.pushUps && 
                  <div className="option">
                    <IonLabel className="option-title" color="secondary">
                      Flexiones de pecho
                    </IonLabel>
                    <IonItem className="option-value">
                      <IonLabel position="floating"># flexiones de pecho (1 m)</IonLabel>
                      <IonInput value={resistancePushUpsValue} onIonChange={e => setResistancePushUpsValue(safeParseFloat(e.detail.value!))}></IonInput>
                    </IonItem>
                  </div>
                }
              </div>
              <IonButton onClick={() => {
                if(resistanceABSValue && age && gender) {
                  const percentile = PercentileService.getAbsPercentile(resistanceABSValue, age, gender);
                  console.log('ABS');
                  console.log('resistanceABSValue', resistanceABSValue);
                  console.log('percentile - Abs', percentile);
                  setResistanceABS(percentile);
                }

                if(resistancePushUpsValue && age && gender) {
                  const percentile = PercentileService.getPushUpsPercentile(resistancePushUpsValue, age, gender);
                  console.log('PushUps');
                  console.log('resistancePushUpsValue', resistancePushUpsValue);
                  console.log('percentile - Push Ups', percentile);
                  setResistancePushUps(percentile);
                }

                setShowResistanceModal(false);
              }}>
                Volver
              </IonButton>
            </div>
          </IonModal>
          <IonModal isOpen={showFlexibilityModal}>
            <div className="modalContainer">
              <IonLabel className="modal-title" color="primary">
                FITNESS FLEXIBILIDAD
              </IonLabel>
              <div className='option-content'>
                <div className="option">
                  <IonLabel className="option-title" color="secondary">
                    Flexibilidad
                  </IonLabel>
                  <IonItem className="option-value">
                    <IonLabel position="floating">distancia (cm)</IonLabel>
                    <IonInput value={flexibilityValue} onIonChange={e => setFlexibilityValue(safeParseFloat(e.detail.value!))}></IonInput>
                  </IonItem>
                </div>
              </div>
              <IonButton onClick={() => {
                if(flexibilityValue && age && gender) {
                  const percentile = PercentileService.getSitNReachPercentile(flexibilityValue, age, gender);
                  console.log('Sit N Reach');
                  console.log('flexibilityValue', flexibilityValue);
                  console.log('percentile - Flexibility', percentile);
                  setFlexibility(percentile);
                }

                setShowFlexibilityModal(false);
              }}>
                Volver
              </IonButton>
          </div>
            
          </IonModal>
          <IonModal isOpen={showNutritionalModal}>
          <div className="modalContainer">
            <IonLabel className="modal-title" color="primary">
              FITNESS NUTRICIONAL
            </IonLabel>

            <div className="tabs">  
              <IonIcon class={nutritionalOption === nutritionalOptions.direct ? 'tab-icon active' : 'tab-icon inactive'} icon={calculatorOutline} onClick={() => setNutritionalOption(nutritionalOptions.direct)}/>
              <IonIcon class={nutritionalOption === nutritionalOptions.folds ? 'tab-icon active' : 'tab-icon inactive'} icon={eyedropOutline} onClick={() => setNutritionalOption(nutritionalOptions.folds)}/>
            </div>
            <div className='option-content'>
              {nutritionalOption === nutritionalOptions.direct && 
                <div className="option">
                  <IonLabel className="option-title" color="secondary">
                    Cálculo directo
                  </IonLabel>
                  <IonItem className="option-value">
                    <IonLabel position="floating">% graso</IonLabel>
                    <IonInput value={nutritionalValue} onIonChange={e => setNutritionalValue(safeParseFloat(e.detail.value!))}></IonInput>
                  </IonItem>
                </div>
              }
              {nutritionalOption === nutritionalOptions.folds && 
                <div className="option">
                  <IonLabel className="option-title" color="secondary">
                    Pliegues
                  </IonLabel>
                  <IonItem className="option-pliegue-value">
                    <IonLabel position="floating">Triceps</IonLabel>
                    <IonInput value={tricepsFold} onIonChange={e => setTricepsFold(safeParseFloat(e.detail.value!))}></IonInput>
                  </IonItem>
                  <IonItem className="option-pliegue-value">
                    <IonLabel position="floating">Subescapular</IonLabel>
                    <IonInput value={subscapularFold} onIonChange={e => setSubscapularFold(safeParseFloat(e.detail.value!))}></IonInput>
                  </IonItem>
                  <IonItem className="option-pliegue-value">
                    <IonLabel position="floating">Pectoral</IonLabel>
                    <IonInput value={pectoralFold} onIonChange={e => setPectoralFold(safeParseFloat(e.detail.value!))}></IonInput>
                  </IonItem>
                  <IonItem className="option-pliegue-value">
                    <IonLabel position="floating">Medio Axilar</IonLabel>
                    <IonInput value={axillaryFold} onIonChange={e => setAxillaryFold(safeParseFloat(e.detail.value!))}></IonInput>
                  </IonItem>
                  <IonItem className="option-pliegue-value">
                    <IonLabel position="floating">Supra Iliaco</IonLabel>
                    <IonInput value={supraIliacFold} onIonChange={e => setSupraIliacFold(safeParseFloat(e.detail.value!))}></IonInput>
                  </IonItem>
                  <IonItem className="option-pliegue-value">
                    <IonLabel position="floating">Abdonimal</IonLabel>
                    <IonInput value={abdominalFold} onIonChange={e => setAbdominalFold(safeParseFloat(e.detail.value!))}></IonInput>
                  </IonItem>
                  <IonItem className="option-pliegue-value">
                    <IonLabel position="floating">Muslo Anterior</IonLabel>
                    <IonInput value={anteriorThighFold} onIonChange={e => setAnteriorThighFold(safeParseFloat(e.detail.value!))}></IonInput>
                  </IonItem>
                </div>}
              </div>
              <IonButton onClick={() => {
                if(nutritionalOption === nutritionalOptions.folds){
                  if(tricepsFold && subscapularFold && pectoralFold && axillaryFold && supraIliacFold && abdominalFold && anteriorThighFold) {
                    let result: number = 0;
                    const sumatoria = tricepsFold + subscapularFold + pectoralFold + axillaryFold + supraIliacFold + abdominalFold + anteriorThighFold;
                    let density;

                    if(!age)
                      return;

                    if(gender === 'female' ) {
                      density = (1.097 - (0.00046971 * sumatoria) + (0.00000056 * sumatoria * sumatoria) - (0.00012828 * age));
                    } else {
                      density = (1.112 - (0.00043499 * sumatoria) + (0.00000055 * sumatoria * sumatoria) - (0.00028826 * age));
                    }

                    result = ((495/density) - 450);
                    if(result && age && gender) {
                      const percentile = PercentileService.getGreasyPercentile(result, age, gender);
                      console.log('Nutritional - Calculated');
                      console.log('result', result);
                      console.log('percentile - Greasy', percentile);
                      setNutritional(percentile);
                    }
                  }
                }
                if(nutritionalOption === nutritionalOptions.direct) {
                  if(nutritionalValue && age && gender) {
                    const percentile = PercentileService.getGreasyPercentile(nutritionalValue, age, gender);
                    console.log('Nutritional - Direct');
                    console.log('nutritionalValue', nutritionalValue);
                    console.log('percentile - Greasy', percentile);
                    setNutritional(percentile);
                  }
                }
                setShowNutritionalModal(false);
              }}>
                Volver
              </IonButton>
            </div>
          </IonModal>
        </IonContent>
      </IonPage>
    </>
  );
};