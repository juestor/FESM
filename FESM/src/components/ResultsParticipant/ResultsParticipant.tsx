import React, { useState, useEffect } from 'react';
import { useLocation  } from "react-router-dom";
import firebase from 'firebase';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonGrid,
  IonRow,
  IonCol, IonLabel, IonIcon
} from '@ionic/react';
import { Radar } from 'react-chartjs-2';

import './ResultsParticipant.css';
import { barbell, body, fastFoodSharp, football, grid, handLeft, heartSharp } from 'ionicons/icons';

export default function ResultsParticipant(){
  const [evaluations, setEvaluations] = useState<any>();
  const [evaluationLabels, setEvaluationLabels] = useState<string[]>();
  const [evaluationValues, setEvaluationValues] = useState<any[]>();
  const [chartData, setChartData] = useState<any>();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  let participantId = query.get("id");
  let participantName = query.get("name") ? query.get("name") : '';

  let months = new Array(12);
  months[0] = "Enero";
  months[1] = "Febrero";
  months[2] = "Marzo";
  months[3] = "Abril";
  months[4] = "Mayo";
  months[5] = "Junio";
  months[6] = "Julio";
  months[7] = "Agosto";
  months[8] = "Septiembre";
  months[9] = "Octubre";
  months[10] = "Noviembre";
  months[11] = "Diciembre";

  const radarOptions = {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Percentil del Fitness'
    },
    scale: {
      ticks: {
        beginAtZero: true
      }
    }
  };

  const color =  [
    'rgba(128,255,0,0.3)', // verde
    'rgba(51,255,255,0.3)', // azul claro
    'rgba(255,51,255,0.3)', // lila
    'rgba(255,153,51,0.3)', // naranja
    'rgba(251,51,51,0.3)', // rojo
    'rgba(178,102,255,0.3)', // morado
    'rgba(153,76,0,0.3)', // cafe
    'rgba(255,255,0,0.3)', // amarillo
    'rgba(0,153,76,0.3)', // verde
    'rgba(0,0,255,0.3)' // azul
  ]

  const getEvaluationList = (participantId: string) => {
    return firebase.firestore().collection("Evaluations")
      .where('participantId', '==', participantId)
      .orderBy("lastModifiedOn", "desc")
      .get();
  };

  useEffect(() => {
    if (participantId && !evaluations && !evaluationValues && !chartData) {
      getEvaluationList(participantId)
        .then(evaluationListResult => {
          let evaluationList: any[] = [];

          if(!evaluations && !chartData) {
            
            evaluationListResult.forEach(function(doc) {
              if(doc.exists) {
                const evaluation: any = {
                  id: doc.id,
                  ...doc.data()
                };
                evaluationList.push(evaluation);
              }
            });
            console.log('evaluationList', evaluationList);
            if (evaluationList) {
              setEvaluations(evaluationList);              
              setEvaluationLabels([
                'Cardio',
                'Fuerza MS',
                'Fuerza MI',
                'Abdominales',
                'Flexiones',
                'Movilidad',
                '% grasa'
              ]);
            }
          }
        })
        .catch((error) => console.log('ERROR GET EVALUATIONS', error));
    }
    if (evaluations && !evaluationValues && !chartData) {
      const currentEvaluationsValues: any[] = evaluations.map((evaluation: any) => {
        return {
          date: getStringDate(evaluation.lastModifiedOn),
          values: [
            evaluation.cardio as number,
            evaluation.strengthUpper as number,
            evaluation.strengthLower as number,
            evaluation.resistanceABS as number,
            evaluation.resistancePushUps as number,
            evaluation.flexibility as number,
            evaluation.nutritional as number
          ]
        };
      });

      setEvaluationValues(currentEvaluationsValues);
    }

    if (evaluationValues && !chartData) {
      const dataset: any[] = evaluationValues.map((evaluationValue, index) => {
        console.log('mod', index % 10);
        console.log('evaluationValue.values', evaluationValue.values);
        return {
          label: evaluationValue.date,
          data: evaluationValue.values,
          backgroundColor: color[index % 10],
          borderColor: color[index % 10],
          pointRadius: 1,
          pointBackgroundColor: ['rgba(0,0,0,1)'],
          pointBorderColor: ['rgba(0,0,0,1)'],
          pointHoverBackgroundColor: ['rgba(0,0,0,1)'],
          pointHoverBorderColor: ['rgba(0,0,0,1)']

        };
      });
      setChartData({
        labels: evaluationLabels,
        datasets: dataset
      });
    }   
  }, [evaluations, participantId, chartData, evaluationValues, evaluationLabels]);

  const getStringDate = (date: any): string => {
    let result = new Date(date);
    return `${months[result.getMonth() ]} ${result.getDate()} del ${result.getFullYear()}`
  }

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
          <IonLabel className="title">
            Perfil del Fitness
          </IonLabel>
          <IonLabel className="subtitle" color="primary">
            {participantName}
          </IonLabel>
          <IonGrid>
            <IonRow>
              <IonCol className="firstColumnClass">Cualidad</IonCol>
              <IonCol className="columnClass">
                <IonIcon className="iconClass" icon={heartSharp}></IonIcon>
              </IonCol>
              <IonCol className="columnClass">
                <IonIcon className="iconClass" icon={barbell}></IonIcon>
              </IonCol>
              <IonCol className="columnClass">
                <IonIcon className="iconClass" icon={football}></IonIcon>
              </IonCol>
              <IonCol className="columnClass">
                <IonIcon className="iconClass" icon={grid}></IonIcon>
              </IonCol>
              <IonCol className="columnClass">
                <IonIcon className="iconClass" icon={handLeft}></IonIcon>
              </IonCol>
              <IonCol className="columnClass">
                <IonIcon className="iconClass" icon={body}></IonIcon>
              </IonCol>
              <IonCol className="columnClass">
                <IonIcon className="iconClass" icon={fastFoodSharp}></IonIcon>
              </IonCol>
            </IonRow>
            {evaluations && evaluations.map((doc: any) => {
              const result = doc;
              return (
                <IonRow key = {doc.id} >
                  <IonCol className="firstColumnClass">{getStringDate(result.lastModifiedOn)}</IonCol>
                  <IonCol className="columnClass">{result.cardio}</IonCol>
                  <IonCol className="columnClass">{result.strengthUpper}</IonCol>
                  <IonCol className="columnClass">{result.strengthLower}</IonCol>
                  <IonCol className="columnClass">{result.resistanceABS}</IonCol>
                  <IonCol className="columnClass">{result.resistancePushUps}</IonCol>
                  <IonCol className="columnClass">{result.flexibility}</IonCol>
                  <IonCol className="columnClass">{result.nutritional}</IonCol>
                </IonRow>
              );
            })}
          </IonGrid>

          <div>
            {chartData && (
              <Radar data={chartData} options={radarOptions} width={80} height={80}></Radar>
            )}
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}