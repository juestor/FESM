import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react';

import './Information.css';

interface ContainerProps { }

const Information: React.FC<ContainerProps> = () => {
  
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
          <div className="information">
            Esta aplicación se realizó como trabajo de grado para la Especilidad Medicina del Deporte de la Universidad Nacional de Colombia, por el médico David Alejandro Torres Solano, bajo la tutoría del Dr. Camilo Ernesto Povea Combariza. <br></br><br></br>
            Se realizo una revisión de la literatura para generar un adecuado perfil del fitness en población sana y con esto ayudar y facilitar el trabajo del médico del deporte en su consulta diaria.<br></br>
            <h4>Bibliografia:</h4> Heyward, V. H. (2014). Advanced Fitness Assessment and Exercise Prescription. In Medicine and Science in Sports and Exercise (Vol. 24, Issue 2). https://doi.org/10.1249/00005768-199202000-00023 <br></br><br></br>
            Hoffmann, M. D., Colley, R. C., Doyon, C. Y., Wong, S. L., Tomkinson, G. R.,  Lang, J. J. (2019). Normative-referenced percentile values for physical fitness among Canadians. Health Reports, 30(10), 14–22. https://doi.org/10.25318/82-003-x201901000002-eng <br></br><br></br>
            Kaminsky, L. A., Imboden, M. T., Arena, R.,  Myers, J. (2017). Reference Standards for Cardiorespiratory Fitness Measured With Cardiopulmonary Exercise Testing Using Cycle Ergometry: Data From the Fitness Registry and the Importance of Exercise National Database (FRIEND) Registry. Mayo Clinic Proceedings, 92(2), 228–233. https://doi.org/10.1016/j.mayocp.2016.10.003 <br></br><br></br>
            Madeline P. Bayles, A. M. S. (2018). ACSM’s Exercise Testing and Prescription (10th edition). In A. M. S. Madeline P. Bayles (Ed.), Sport  Exercise Scientist (First edit). Wolters Kluwer.<br></br><br></br>
            Mahecha. Serrato Roa, M. (2017). Evaluacion para la preescripción del ejercicio en paciente sano y en el de factores de riesgo. In Actividad física y ejercicio en salud y enfermedad (p. 455). Mediterráneo.<br></br><br></br>
            Serrato Roa, M. (2008). Medicina del deporte (U. del Rosario (ed.); Primera). Coleccion Textos Cicncias de la Salud.
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Information;