import React from 'react';
import { IonItem, IonLabel, IonText, IonItemSliding, IonItemOption, IonItemOptions, IonIcon } from '@ionic/react';
import { pencil, trash, calculator, barChart } from 'ionicons/icons';

export default function MyParticipant({results, doEvaluation, doEdit, doDelete, doc}: any){
  let data = doc.data();
  let date = new Date(data.lastModifiedOn);
  let weekdays = new Array(7);
  weekdays[0] = "Domingo";
  weekdays[1] = "Lunes";
  weekdays[2] = "Martes";
  weekdays[3] = "Miércoles";
  weekdays[4] = "Jueves";
  weekdays[5] = "Viernes";
  weekdays[6] = "Sábado";

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

  const fecha: string = `${weekdays[date.getDay()]} ${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`;

  return(
    <IonItemSliding>
      <IonItem>
        <IonLabel>
          <IonText color="primary">
            <h1>{data.name} {data.lastName}</h1>
          </IonText>
          <IonText>
            <p>Última actualización</p>
            <p>{fecha}</p>
          </IonText>
        </IonLabel>
        <div></div>
      </IonItem>
      <IonItemOptions>
        <IonItemOption color="primary" onClick= {() => results(doc.id)}>
          <IonIcon slot="icon-only" icon={barChart}>
          </IonIcon>
        </IonItemOption>
        <IonItemOption color="success" onClick= {() => doEvaluation(doc.id)}>
          <IonIcon slot="icon-only" icon={calculator}>
          </IonIcon>
        </IonItemOption>
        <IonItemOption color="warning" onClick={() => doEdit(doc.id)}>
          <IonIcon slot="icon-only" icon={pencil}>
          </IonIcon>
        </IonItemOption>
        <IonItemOption color="danger" onClick= {() => doDelete(doc.id)}>
          <IonIcon slot="icon-only" icon={trash}>
          </IonIcon>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
}
