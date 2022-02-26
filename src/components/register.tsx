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
import { arrowBackOutline, logInOutline } from 'ionicons/icons';

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
    <IonPage className='main-content'>
        <div className='black-bg'></div>
        <div className='login-header'>
            <h2><IonIcon icon={arrowBackOutline} /></h2>
            <h1>Sign Up</h1>
        </div>
        <IonContent className='ion-text-center'>
            <div className='login-form'>
              <IonInput placeholder='Email' className='ion-padding' onIonChange={(e:any)=>setUsername(e.target.value)}/>
              <IonInput placeholder="Password" className='ion-padding ' type='password' onIonChange={(e:any)=>setPassword(e.target.value)}/>
              <IonInput placeholder="Confirm Password" className='ion-padding' type='password' onIonChange={(e:any)=>setCPassword(e.target.value)}/>
              <IonButton color="dark" expand='block' shape='round' size='large' onClick={Register}>
                  Register
              </IonButton>
              <p>Already registered? <Link to='/'>Log In</Link></p>
            </div>
        </IonContent>
    </IonPage>
    );
  };

  export default Register;