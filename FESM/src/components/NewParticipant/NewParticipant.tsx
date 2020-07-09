import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import firebase from 'firebase';
import { useDocument } from "react-firebase-hooks/firestore";
import { IonList, IonItem, IonInput, IonLabel, IonDatetime, IonSegment, IonSegmentButton, IonButton } from '@ionic/react';


function NewParticipant ({initialValue, clear}: any) {

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

  let history = useHistory();

  useEffect(() => {
    !loading &&
    initialValue &&
    value?.exists &&
    setName(value.data()?.name) &&
    setLastName(value.data()?.lastName) &&
    setBirthDate(value.data()?.birthDate) &&
    setWeight(value.data()?.weight) &&
    setHeight(value.data()?.height) &&
    setGender(value.data()?.gender);
  },
  [loading, initialValue, value]);

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
          gender
        },
        {merge: true}
      );

      setName('');
      setLastName('');
      setBirthDate('');
      setWeight(0);
      setHeight(0);
      setGender('');
      clear();
    } else {
      await collectionRef.add({
        name,
        lastName,
        birthDate,
        weight,
        height,
        gender
      });

      setName('');
      setLastName('');
      setBirthDate('');
      setWeight(0);
      setHeight(0);
      setGender('');
      clear();
    };
    history.push('/FESM/MyParticipants');
  };

  return (
    <>
      <IonList>
        <IonItem class="title-item">
          <IonLabel class="title-label" color="primary">Nuevo Participante</IonLabel><br />
        </IonItem>
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
          <IonButton class="create-button" expand="full" onClick={onSave}>Crear</IonButton>
        </IonItem>
      </IonList>
    </>
  );
}

export default NewParticipant;

/* class NewParticipant extends Component <{},any> {

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

  render() {
    return (
      <div className="container">    
        
      </div>
    );
  }
};

export default NewParticipant; */