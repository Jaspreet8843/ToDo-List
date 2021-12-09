import React from 'react';

import {
    IonApp,
    IonButton,
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonRow,
    IonTitle,
    IonToolbar,
    IonList,
    IonCardHeader,
  } from "@ionic/react";

  import { addOutline, refreshOutline} from "ionicons/icons";


const Controls: React.FC<{ 
  onAdd: () => void; 
  onClear: () => void 
}> = props => {
    return (
      <IonRow>
      <IonCol>
        <IonButton onClick={props.onAdd} expand="block" className="ion-margin">
          <IonIcon slot="start" icon={addOutline}></IonIcon>
          Add
        </IonButton>
      </IonCol>
      <IonCol>
        <IonButton fill="outline" onClick={props.onClear} expand="block" className="ion-margin">
          <IonIcon slot="start" icon={refreshOutline}></IonIcon>
          Clear
        </IonButton>
      </IonCol>
    </IonRow>
    );

};

export default Controls;