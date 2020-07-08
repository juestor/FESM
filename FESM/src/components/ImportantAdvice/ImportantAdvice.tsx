import React from 'react';
import './ImportantAdvice.css';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg } from '@ionic/react';

interface ContainerProps { }

const ImportantAdvice: React.FC<ContainerProps> = () => {
  
  return (
    <div className="container">
      <IonCard>
        <IonImg src="assets/img/jogging.jpg" />
        <IonCardHeader>
          <IonCardTitle class="card-title">Aviso Importante</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
        El objetivo de esta apicación es determinar el nivel del fitness en personas sanas, no atletas, mayores de 18 años, debe ser realizada por personal idóneo (médicos del deporte).
        </IonCardContent>
      </IonCard> 
    </div>
  );
};

export default ImportantAdvice;