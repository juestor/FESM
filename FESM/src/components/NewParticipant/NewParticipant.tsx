import React, { useState, useEffect } from 'react';
import { useHistory, useLocation  } from "react-router-dom";
import firebase from 'firebase';
import { useDocument } from "react-firebase-hooks/firestore";
import {
  IonList,
  IonItem,
  IonInput,
  IonLabel,
  IonDatetime,
  IonSegment,
  IonSegmentButton,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton } from '@ionic/react';

import './NewParticipant.css';


function NewParticipant () {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  let history = useHistory();
  let query = useQuery();
  let initialValue = query.get("id");

  const [name, setName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [birthDate, setBirthDate] = useState<string>();
  const [weight, setWeight] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [gender, setGender] = useState<string>();

  const [ value, loading, error ] = useDocument(
    firebase.firestore().doc('Participants/' + initialValue),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  useEffect(() => {
    if (!loading &&
      initialValue &&
      value?.exists) 
    {
      const data = value.data();
      if(!data)
        return;
      setName(data.name);
      setLastName(data.lastName);
      setBirthDate(data.birthDate);
      setWeight(data.weight);
      setHeight(data.height);
      setGender(data.gender);
    } else {
      setName('');
      setLastName('');
      setBirthDate('');
      setWeight(undefined);
      setHeight(undefined);
      setGender('');
    }
  },
  [loading, initialValue, value]);

  const onClear = () => {
    initialValue = null;
  };

  const onSave = async() => {
    let collectionRef = firebase.firestore().collection('Participants');
    if (initialValue) {
      await (collectionRef).doc(initialValue).set(
        {
          name,
          lastName,
          birthDate,
          weight,
          height,
          gender,
          lastModifiedOn: new Date().getTime()
        },
        {merge: true}
      );

      setName('');
      setLastName('');
      setBirthDate('');
      setWeight(0);
      setHeight(0);
      setGender('');
      onClear();
    } else {
      await collectionRef.add({
        name,
        lastName,
        birthDate,
        weight,
        height,
        gender,
        lastModifiedOn: new Date().getTime()
      });

      setName('');
      setLastName('');
      setBirthDate('');
      setWeight(0);
      setHeight(0);
      setGender('');
      onClear();
    };
    history.push('/FESM/MyParticipants');
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
          <div className="title-label">{initialValue ? 'Editar Participante' : 'Nuevo Participante'}</div>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Nombre</IonLabel>
              <IonInput value={name} onIonChange={e => setName(e.detail.value!)}></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Apellido</IonLabel>
              <IonInput value={lastName} onIonChange={e => setLastName(e.detail.value!)}></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Fecha de nacimiento</IonLabel>
              <IonDatetime displayFormat="MM/DD/YYYY" min="1900-01-01" max="2100-12-31" value={birthDate} onIonChange={e => setBirthDate(e.detail.value!)}></IonDatetime>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Peso (Kg)</IonLabel>
              <IonInput type="number" value={weight} onIonChange={e => setWeight(parseFloat(e.detail.value!))}></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Altura (cm)</IonLabel>
              <IonInput type="number" value={height} onIonChange={e => setHeight(parseFloat(e.detail.value!))}></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="fixed">Sexo</IonLabel>
            </IonItem>

            <IonItem>
              <IonSegment value={gender} onIonChange={e => setGender(e.detail.value)}>
                <IonSegmentButton value='female'>
                  <IonLabel>Femenino</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value='male'>
                  <IonLabel>Masculino</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonItem>

            <IonItem>
              <IonButton class="create-button" expand="full" onClick={onSave}>Guardar</IonButton>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
}

export default NewParticipant;