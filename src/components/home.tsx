import React, { useEffect, useState } from 'react';

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
    IonList,
    IonGrid,
    IonRow,
    IonCol,
    IonCheckbox,
    IonSelect,
    IonSelectOption,
    IonButtons,
    IonMenu,
    IonListHeader,
    IonMenuToggle,
    useIonViewDidEnter,
    useIonViewDidLeave,
    IonModal,
    useIonModal,
    useIonAlert,
  
  } from "@ionic/react";
import { Link } from 'react-router-dom';
import { fetchItems, issetSession, LoginUser, LogoutUser, popItem, pushItem, setChecked } from '../firebaseConfig';
import { addOutline, arrowBackOutline, atCircleOutline, calendarOutline, checkmarkCircleOutline, createOutline, ellipseOutline, ellipsisVerticalOutline, home, idCard, logInOutline, logOutOutline, menu, refreshOutline, trashBinOutline } from 'ionicons/icons';
import { extractDate, Toast } from '../features';


const Body: React.FC<{
    curID: any;
    onDismiss: () => void;
  }> = ({curID, onDismiss }) => (
    <div>
      ID: {curID}
      <IonButton expand="block" onClick={() => onDismiss()}>
        Close
      </IonButton>
    </div>
  );


const Home: React.FC = () => {
    const [input, setInput] = useState('');
    const [items,setItems] = useState<{ [key: string]: string }[]>([]);
    const [date, setDate] = useState(extractDate(Date()));
    const[curID, setCurID] = useState('');


    const[showAlert] = useIonAlert();



    const handleDismiss = () => {
        dismiss();
    };
    const [present, dismiss] = useIonModal(Body, {
        curID,
        onDismiss: handleDismiss,
      });


    useIonViewDidEnter(()=>{
        refreshItems();
    });

    useIonViewDidLeave(()=>{
        LogoutUser();
    })
    
    async function AddItem(){
        pushItem(input, extractDate(Date.now()));
        //setItems((items:any)=>items.concat(input));
        refreshItems();
       
    }
    function refreshItems() 
    {
        setItems([]);
        fetchItems(date)
            .then(
            function(res:any)
            {
                res.forEach((ele:any)=> {
                    var data = {
                        item: ele.data().item,
                        checked: ele.data().checked,
                        docID: ele.id 
                    }
                    setItems((items:any)=>items.concat(data));
                    drawLineThrough(data.docID,data.checked);
                });
                //setItems((items:any) => items.concat(ele));
            }
            );
    }


    function drawLineThrough(id:any,res:any){
        console.log("draw");
        if(res)
        {
            document.getElementById("item"+id)?.style.setProperty("text-decoration","line-through");
            document.getElementById("item"+id)?.style.setProperty("text-decoration-thickness","2px");
            document.getElementById("item"+id)?.style.setProperty("color","gray");
        }
        else
        {
            document.getElementById("item"+id)?.style.setProperty("text-decoration","");
            document.getElementById("item"+id)?.style.setProperty("color","black");
        }
    }

    function isChecked(id:any,res:any){
        setChecked(id,res['detail'].checked);
        drawLineThrough(id,res['detail'].checked);
    }


    function deleteItem(id: any){
        popItem(id);
        refreshItems();
    }

// useEffect(()=>{console.log(items)},[items]);


  return (
      <IonApp>
        <IonMenu content-id="main-content">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        MENU
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
        
            <IonContent>
                <IonList>
                    <IonListHeader>Navigate</IonListHeader>
                    <IonMenuToggle auto-hide="false">
                        <IonItem button>
                            <IonIcon slot="start" icon={home}></IonIcon>
                            <IonLabel>
                                Home
                            </IonLabel>
                        </IonItem>
                        <IonItem button >
                            <IonIcon slot="start" icon={logOutOutline}></IonIcon>
                            <IonLabel onClick={LogoutUser}>
                                LogOut
                            </IonLabel>
                        </IonItem>
                        </IonMenuToggle>
                </IonList>
                <IonList>
                    <IonListHeader>Options</IonListHeader>
                    <IonMenuToggle auto-hide="false">
                        <IonItem button>
                            <IonIcon slot="start" icon={refreshOutline}></IonIcon>
                            <IonLabel>
                                Clear
                            </IonLabel>
                        </IonItem>
                        
                        <IonItem button >
                            <IonIcon slot="start" icon={checkmarkCircleOutline}></IonIcon>
                            <IonLabel>
                                Mark all done
                            </IonLabel>
                        </IonItem>
                        <IonItem button >
                            <IonIcon slot="start" icon={ellipseOutline}></IonIcon>
                            <IonLabel>
                                Mark all undone
                            </IonLabel>
                        </IonItem>
                        <IonItem button >
                            <IonIcon slot="start" icon={calendarOutline}></IonIcon>
                            <IonLabel>
                                Go to date
                            </IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                        
                </IonList>
            </IonContent>
        </IonMenu>

        <IonPage className="ion-page" id='main-content'>
            <div className='home-header'>
                <h2>
                    <p className="title-text">Your Schedule</p>

                    <IonButtons slot="end">
                        <IonMenuToggle>
                            <IonButton>
                            <IonIcon icon={menu}/>
                            </IonButton>
                        </IonMenuToggle>
                    </IonButtons>
                </h2>
                <h5>
                    <p className="title-date">
                        {"<"+new Date(date).getDate()+'/'+(new Date(date).getMonth()+1)+'/'+(new Date(date).getFullYear())+">"}
                    </p>
                </h5>
            </div>
            <IonContent className='ion-text-center'>
                <div className='home-body'>
                    <div className='home-item-list'>
                        <IonList>
                            <IonGrid>
                            {items.map((item:any) => (
                                <IonRow key={item.docID}>
                                    <IonCol size='1'>
                                        <IonCheckbox checked={item.checked} onIonChange={(e:any)=>isChecked(item.docID,e)}></IonCheckbox>
                                    </IonCol>
                                    <IonCol size="10" id={"item"+item.docID} onClick={()=>{present({cssClass: 'my-class',});setCurID(item.docID)}}>

                                            {item.item}
                                    
                                    </IonCol>
                                    <IonCol size="1">
                                        <IonIcon id="trigger-button" icon={trashBinOutline} 
                                            onClick={()=>{
                                                showAlert({
                                                    cssClass: 'my-css',
                                                    header: 'Confirm Action',
                                                    message: 'Are you sure?',
                                                    buttons: [
                                                        'Cancel',
                                                        { text: 'Ok', handler: (d) => deleteItem(item.docID) },
                                                    ],
                                                    onDidDismiss: (e) => console.log('did dismiss'),
                                                })}}/>
                                    </IonCol>
                                
                                </IonRow>
                            ))}
                            </IonGrid>
                        </IonList>
                    </div>
                    <div className='home-add-items'>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <IonInput placeholder="Item" className='ion-padding' type='text' onIonChange={(e:any)=>setInput(e.target.value)}/>
                                    </td>
                                    <td>
                                        <IonButton color="dark" expand='block' size='large' onClick={AddItem}>
                                            <IonIcon icon={addOutline} className=""/>
                                        </IonButton>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                </div>

            </IonContent>
        </IonPage>
    </IonApp>
    );
  };

  export default Home;

