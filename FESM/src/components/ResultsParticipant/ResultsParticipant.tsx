import React, { useState, useEffect } from 'react';
import { useHistory, useLocation  } from "react-router-dom";
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
  IonCol
} from '@ionic/react';
import { Radar } from 'react-chartjs-2';

import './ResultsParticipant.css';

export default function ResultsParticipant(){
  const [evaluations, setEvaluations] = useState<any>();
  const [evaluationLabels, setEvaluationLabels] = useState<string[]>();
  const [evaluationValues, setEvaluationValues] = useState<any[]>();
  const [chartData, setChartData] = useState<any>();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  let history = useHistory();
  let participantId = query.get("id");
  let participantName = query.get("name") ? ' - ' + query.get("name") : '';
  let dataChart: { labels: string[]; datasets: any[]; };

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
            if (evaluationList) {
              setEvaluations(evaluationList);              
              setEvaluationLabels([
                'Cardiovascular',
                'Fuerza M. Superior',
                'Fuerza m. Inferior',
                'Resistencia ABS',
                'Resistencia Flexiones',
                'Flexibilidad',
                'Estado Nutricional'
              ]);
            }
          }
        })
        .catch((error) => console.log('ERROR GET EVALUATIONS', error));
    }
    if (evaluations && !evaluationValues && !chartData) {
      const currentEvaluationsValues: any[] = evaluations.map((evaluation: any) => {
        return {
          date: new Date(evaluation.lastModifiedOn),
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
      const dataset: any[] = evaluationValues.map((evaluationValue) => {
        return {
          label: evaluationValue.date,
          data:evaluationValue.values
        };
      });
      setChartData({
        labels: evaluationLabels,
        datasets: dataset
      });
    }   
  }, [evaluations, participantId, chartData, evaluationValues, evaluationLabels]);

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
          <div className="title">Resultados{participantName}</div>
          <IonGrid>
            <IonRow>
              <IonCol>Fecha</IonCol>
              <IonCol>value 1</IonCol>
              <IonCol>Value 2</IonCol>
              <IonCol>Value 3</IonCol>
              <IonCol>Value 4</IonCol>
              <IonCol>Value 5</IonCol>
              <IonCol>Value 6</IonCol>
              <IonCol>Value 7</IonCol>
            </IonRow>
            {evaluations && evaluations.map((doc: any) => {
              const result = doc;
              return (
                <IonRow key = {doc.id} >
                  <IonCol>{result.lastModifiedOn}</IonCol>
                  <IonCol>{result.cardio}</IonCol>
                  <IonCol>{result.flexibility}</IonCol>
                  <IonCol>{result.nutritional}</IonCol>
                  <IonCol>{result.resistanceABS}</IonCol>
                  <IonCol>{result.resistancePushUps}</IonCol>
                  <IonCol>{result.StrengthLower}</IonCol>
                  <IonCol>{result.StrengthUpper}</IonCol>
                </IonRow>
              );
            })}
          </IonGrid>

          <div>
            {chartData && (
              <Radar data={chartData}></Radar>
            )}
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}