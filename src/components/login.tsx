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
import { issetSession, LoginUser, LogoutUser } from '../firebaseConfig';
import { arrowBackOutline, logInOutline } from 'ionicons/icons';
import { Toast } from '../features';

  const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    async function Login(){
        if(username=='' || password=='')
        {
          await Toast("Cannot use empty username or password!")
        }
        else
        {
            await LoginUser(username,password);
        }
    }

  return (
    <IonPage className='main-content'>
        <div className='black-bg'></div>
        <div className='login-header'>
            <h2><IonIcon icon={arrowBackOutline} /></h2>
            <h1>Log In</h1>
        </div>
        <IonContent className='ion-text-center'>
            <div className='login-form'>
                <IonInput placeholder='Email' className='ion-padding' onIonChange={(e:any)=>setUsername(e.target.value)}/>
                <IonInput placeholder="Password" className='ion-padding ' type='password' onIonChange={(e:any)=>setPassword(e.target.value)}/>
                <IonButton color="dark" expand='block' shape='round' size='large' onClick={Login}>
                    <IonIcon icon={logInOutline} className="ion-padding-end"/>
                    Log In
                </IonButton>
                <p>Don't have an account? <Link to='/register'>Register</Link></p>
            </div>
        </IonContent>
    </IonPage>
    );
  };

  export default Login;