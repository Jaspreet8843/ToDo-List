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
  IonAlert,
  IonTabs,
  IonRouterOutlet,
} from "@ionic/react";

import { Storage } from '@ionic/storage';

import Controls from "./components/controls";
import Result from "./components/result";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import React, { useEffect, useRef, useState } from "react";

import { todayOutline } from "ionicons/icons";
import { Route } from "react-router";
import { issetSession, LogoutUser } from "./firebaseConfig";

 issetSession();


const App: React.FC = () => {
  const [addItem, setAddItem] = useState<{ [key: string]: string }[]>([]);
  const itemInput = useRef<HTMLIonInputElement>(null);
  const [popUp, setPopUp] = useState<string>();
  
  const [count, setCount] = useState(0);
  const[syncFlag, setSyncFlag] = useState(true);
  
  useEffect(() => {
    const store = new Storage();
    store.create();
    store.set('name',addItem);
    store.set('count',count);
    if(syncFlag)
    {
      store.get('name').then((result)=>{setAddItem(result)});
      store.get('count').then((result)=>{setCount(result)});
      setSyncFlag(false);
    }
    // store.forEach((key, value, index) => {
    //   console.log(key,value);
    // });
  },[addItem]);

  const addBtn = () => {
    let item: any = {};
    item.itemNo = count;
    item.value = itemInput.current!.value;
    setCount(count + 1);
    if (!item) {
      return;
    }
    
    setAddItem([...addItem, item]);
    itemInput.current!.value = "";
  };

  const clearBtn = () => {
    itemInput.current!.value = "";
    setAddItem([]);
    setPopUp("List cleared successfully!");
  };

  const clearPopUp = () => {
    setPopUp("");
  };

  const deleteItem = (itemNo: string) => {
    var array = [...addItem];
    var index = -1;
    array.forEach((element) => {
      if (element["itemNo"] === itemNo) {
        index = array.indexOf(element);
      }
    });

    if (index !== -1) {
      array.splice(index, 1);
      setAddItem(array);
    }
  };

  

  useEffect(() => {
    //console.log(addItem);
  }, [addItem]);

  return (
    <React.Fragment>
      <IonAlert
        isOpen={!!popUp}
        message={popUp}
        buttons={[{ text: "OK", handler: clearPopUp }]}
      />
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>
              <div className="ion-margin-vertical ion-float-left">
                <IonIcon icon={todayOutline} className="ion-margin-horizontal"/>
                ToDo List
              </div>
              <IonButton onClick={LogoutUser} color="warning" className="ion-float-right ion-margin-vertical">LogOut</IonButton>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="">
          <IonItem className="ion-margin">
            <IonLabel position="floating">Your item</IonLabel>
            <IonInput ref={itemInput}></IonInput>
          </IonItem>
          <IonGrid className="ion-text-center">
            <Controls onAdd={addBtn} onClear={clearBtn} />
            {addItem.length > 0 && (
              <Result onDelete={deleteItem} itemList={addItem} setItemList={setAddItem}/>
            )}
            {addItem.length == 0 && <h5>Empty!</h5>}
          </IonGrid>
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
