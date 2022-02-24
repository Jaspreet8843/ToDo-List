import React, { useState } from 'react';

import {
    IonApp,
    IonTabs,
    IonRouterOutlet,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
  
  } from "@ionic/react";

import { Link } from 'react-router-dom';

import { issetSession, RegisterUser } from '../firebaseConfig';
import { logInOutline } from 'ionicons/icons';

import { Toast, ToastOptions } from "../features";

  const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');

    async function Register(){
        if(password!=cPassword)
        {
          await Toast("Passwords do not match!")
        } 
        else if(username=='' || password=='')
        {
          await Toast("Cannot use empty username or password!")
        }
        else
        {
          await RegisterUser(username,password);
        }
    }

    issetSession();
  return (
    <IonPage>
        <IonHeader>
            <IonToolbar color='primary'>
                <IonTitle>
                    Register
                </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding ion-text-center'>
            <IonItem className="ion-margin">
                <IonLabel position="floating">Email</IonLabel>
                <IonInput className='ion-padding' onIonChange={(e:any)=>setUsername(e.target.value)}/>
            </IonItem>
            <IonItem className="ion-margin">
                <IonLabel position="floating">Password</IonLabel>
                <IonInput className='ion-padding' type='password' onIonChange={(e:any)=>setPassword(e.target.value)}/>
            </IonItem>
            <IonItem className="ion-margin">
                <IonLabel position="floating">Confirm Password</IonLabel>
                <IonInput className='ion-padding' type='password' onIonChange={(e:any)=>setCPassword(e.target.value)}/>
            </IonItem>
            <IonButton onClick={Register}><IonIcon icon={logInOutline} className="ion-padding-end"/>Register</IonButton>
            <p>Already registered? <Link to='/login'>Log In</Link></p>
        </IonContent>
    </IonPage>
    );
  };

  export default Register;