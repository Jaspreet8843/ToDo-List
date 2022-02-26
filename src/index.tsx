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
import Home from './components/home';



ReactDOM.render(
  <React.StrictMode>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/app" component= {App} exact/>
          <Route path="/home" component= {Home} exact/>
          <Route path="/" component= {Login} exact/>
          <Route path="/register" component= {Register} exact/>
        </IonRouterOutlet>

        {/* <Redirect strict from="/" to="/login" /> */}
      </IonReactRouter>
    </IonApp>
  </React.StrictMode>,
  document.getElementById('root')
);



