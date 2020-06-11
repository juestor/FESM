import React, { useState } from 'react';
import './NewParticipant.css';
import { IonList, IonItem, IonInput, IonLabel, IonDatetime, IonSegment, IonSegmentButton, IonButton } from '@ionic/react';

interface ContainerProps { }

const NewParticipant: React.FC<ContainerProps> = () => {
  const [name, setName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [birthDate, setBirthDate] = useState<string>();
  const [weight, setWeight] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [gender, setGender] = useState<string>();

  // const [birthDate, setBirthDate] = useState<string>('2012-12-15T13:47:20.789');

  const createParticipant = () => {
    console.log('Se va a crear el participante:');
    console.log('name', name);
    console.log('lastName', lastName);
    console.log('birthDate', birthDate);
    console.log('weight', weight);
    console.log('height', height);
    console.log('gender', gender);
  }

  return (
    <div className="container">
      <label>Nuevo Participante</label>
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
          <IonSegment onIonChange={e => setGender(e.detail.value)}>
            <IonSegmentButton value='female'>
              <IonLabel>Femenino</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value='male'>
              <IonLabel>Masculino</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonItem>

        <IonItem>
          <IonButton expand="block" onClick={createParticipant}>Crear</IonButton>
        </IonItem>
      </IonList>
    </div>
  );
};

export default NewParticipant;