import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './components/login'
import Register from './components/register'

import {
  IonApp,
  IonTabs,
  IonRouterOutlet,

}
from "@ionic/react";
import { Redirect, Route, Router, useHistory } from 'react-router';
import { IonReactRouter } from '@ionic/react-router';
import { issetSession } from './firebaseConfig';



ReactDOM.render(
  <React.StrictMode>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/home" component= {App} exact/>
          <Route path="/login" component= {Login} exact/>
          <Route path="/register" component= {Register} exact/>
        </IonRouterOutlet>

        {/* <Redirect exact from="/" to="/home" /> */}
      </IonReactRouter>
    </IonApp>
  </React.StrictMode>,
  document.getElementById('root')
);



