import React, { Component } from 'react';
import { IonList, IonItem, IonInput, IonLabel, IonDatetime, IonSegment, IonSegmentButton, IonButton } from '@ionic/react';

import './NewParticipant.css';

class NewParticipant extends Component <{},any> {

  constructor(props: any) {
    super(props)

    this.state = {
      name: '',
      lastName: '',
      birthDate: '',
      weight: null,
      height: null,
      gender: ''
    }
  }

  setNameValue = (nameText: string) => {
    this.setState({ name: nameText })
  }
  setLastNameValue = (lastNameText: string) => {
    this.setState({ lastName: lastNameText })
  }
  setBirthDateValue = (birthDate: string) => {
    this.setState({ birthDate: birthDate })
  }
  setWeightValue = (weightText: number) => {
    this.setState({ weight: weightText })
  }
  setHeightValue = (heightText: number) => {
    this.setState({ height: heightText })
  }
  setGenderValue = (genderText: string | undefined) => {
    this.setState({ gender: genderText })
  }

  createParticipant = () => {
    console.log('Se va a crear el participante:');
    console.log(this.state);
  }

  render() {
    const {
      name, 
      lastName,
      birthDate,
      weight,
      height,
      gender
    } = this.state;
    return (
      <div className="container">    
        <IonList>
          <IonItem class="title-item">
            <IonLabel class="title-label" color="primary">Nuevo Participante</IonLabel><br />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Nombre</IonLabel>
            <IonInput value={name} onIonChange={e => this.setNameValue(e.detail.value!)}></IonInput>
          </IonItem>
  
          <IonItem>
            <IonLabel position="floating">Apellido</IonLabel>
            <IonInput value={lastName} onIonChange={e => this.setLastNameValue(e.detail.value!)}></IonInput>
          </IonItem>
  
          <IonItem>
            <IonLabel position="floating">Fecha de nacimiento</IonLabel>
            <IonDatetime displayFormat="MM/DD/YYYY" min="1900-01-01" max="2100-12-31" value={birthDate} onIonChange={e => this.setBirthDateValue(e.detail.value!)}></IonDatetime>
          </IonItem>
  
          <IonItem>
            <IonLabel position="floating">Peso (Kg)</IonLabel>
            <IonInput type="number" value={weight} onIonChange={e => this.setWeightValue(parseFloat(e.detail.value!))}></IonInput>
          </IonItem>
  
          <IonItem>
            <IonLabel position="floating">Altura (cm)</IonLabel>
            <IonInput type="number" value={height} onIonChange={e => this.setHeightValue(parseFloat(e.detail.value!))}></IonInput>
          </IonItem>
  
          <IonItem>
            <IonLabel position="fixed">Sexo</IonLabel>
          </IonItem>
  
          <IonItem>
            <IonSegment value={gender} onIonChange={e => this.setGenderValue(e.detail.value)}>
              <IonSegmentButton value='female'>
                <IonLabel>Femenino</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value='male'>
                <IonLabel>Masculino</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonItem>
  
          <IonItem>
            <IonButton class="create-button" expand="full" onClick={this.createParticipant}>Crear</IonButton>
          </IonItem>
        </IonList>
      </div>
    );
  }
};

export default NewParticipant;