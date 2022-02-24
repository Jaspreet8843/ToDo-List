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
import { logInOutline } from 'ionicons/icons';
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
    <IonPage>
        <IonHeader>
            <IonToolbar color='primary'>
                <IonTitle>
                    Login
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
                <IonInput className='ion-padding ' type='password' onIonChange={(e:any)=>setPassword(e.target.value)}/>
            </IonItem>
            <IonButton onClick={Login}>
                <IonIcon icon={logInOutline} className="ion-padding-end"/>
                Login
            </IonButton>
            <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </IonContent>
    </IonPage>
    );
  };

  export default Login;