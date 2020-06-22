import React from 'react';
import './NewParticipant.css';
import { IonList, IonItem, IonLabel } from '@ionic/react';

interface ContainerProps { }

const ImportantAdvice: React.FC<ContainerProps> = () => {
  
  return (
    <div className="container"> 
      <IonList>
        <IonItem class="title-item">
          <IonLabel class="advisement-title">Aviso Importante</IonLabel><br />
        </IonItem> 
        <IonItem class="title-item">
          <IonLabel class="advisement">El objetivo de esta apicación es determinar el nivel del fitness en personas sanas, no atletas, mayores de 18 años, debe ser realizada por personal idóneo (médicos del deporte)</IonLabel>
        </IonItem> 
      </IonList> 
    </div>
  );
};

export default ImportantAdvice;