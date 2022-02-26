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
    IonDatetime,
  
  } from "@ionic/react";
import { Link } from 'react-router-dom';
import { checkAll, deleteAll, fetchItems, issetSession, LoginUser, LogoutUser, popItem, pushItem, setChecked, unCheckAll, updateItem } from '../firebaseConfig';
import { addOutline, arrowBackOutline, atCircleOutline, calendarOutline, checkmarkCircleOutline, closeOutline, createOutline, ellipseOutline, ellipsisVerticalOutline, home, idCard, logInOutline, logOutOutline, menu, refreshOutline, trashBinOutline } from 'ionicons/icons';
import { extractDate, parseISOString, Toast } from '../features';
import { doc, getDoc, getFirestore } from "firebase/firestore";


const EditItemModal: React.FC<{
    curID: any;
    itemName: any;
    itemDatetime:any;
    onDismiss: () => void;
    setItemName: (key:any) => any;
    updateItemHandler: (key1:any,key2:any) => void;
  }> = ({curID, itemName, itemDatetime, onDismiss, setItemName, updateItemHandler}) => (
    <div className='edit-modal'>
        <IonButton onClick={() => onDismiss()} color="warning" className="close-button"> <h1><IonIcon icon={closeOutline}></IonIcon></h1></IonButton>
        <IonItem>
        <IonLabel position='stacked'>Item:</IonLabel>
        <IonInput type='text' value={itemName}  onIonChange={(e) => {setItemName(e.detail.value)}}></IonInput>
        </IonItem>
        <br/>
        <IonItem>
        <IonLabel position='stacked'>Created On:</IonLabel>
        <IonInput disabled type='text' value={new Date(itemDatetime).getDate()+'/'+(new Date(itemDatetime).getMonth()+1)+'/'+(new Date(itemDatetime).getFullYear())}></IonInput>
        </IonItem>
        
        <IonButton className="update-btn" expand='block' color='dark' onClick={()=>{updateItemHandler(curID,itemName);onDismiss()}}>Update</IonButton>
        <div className='edit-modal-bg'>
        </div>
    
    </div>
  );

// Modal to set set date for filtering items

const SelectDateModal: React.FC<{
    date:any,
    updateDate: any;
    onDismiss: () => void;
  }> = ({date,updateDate, onDismiss }) => (
    <div className='date-modal'>
      <IonButton onClick={() => onDismiss()} color="warning" className="close-button">
      <h1><IonIcon icon={closeOutline}></IonIcon></h1>
      </IonButton>
      <IonContent>
        <IonItem>
            <IonLabel>Set Date</IonLabel>
            <IonDatetime value={new Date(date).toISOString()} onIonChange={(e) => {updateDate(e.detail.value);onDismiss()}}>
                            {/* {"<"+new Date(date).getDate()+'/'+(new Date(date).getMonth()+1)+'/'+(new Date(date).getFullYear())+">"} */}
                        </IonDatetime>
        </IonItem>
      </IonContent>
        <div className='date-modal-bg'>
        </div>
    </div>
  );


const Home: React.FC = () => {
    const [input, setInput] = useState('');
    const [items,setItems] = useState<{ [key: string]: string }[]>([]);
    const [date, setDate] = useState(extractDate(Date()));
    const[curID, setCurID] = useState('');
    const[itemName, setitemName] = useState('');
    const[itemDatetime, setItemDatetime] = useState('');


    const[showAlert] = useIonAlert();



    const handleEditDismiss = () => {
        hideEditModal();
    };

    const handleCalendarDismiss = () => {
        hideCalendarModal();
    }

    const updateItemHandler = (id:any, text:any) => {
        updateItem(id,text,refreshItems);
    }
    
    const [showEditModal, hideEditModal] = useIonModal(EditItemModal, {
        curID,
        itemName,
        setItemName:setitemName,
        itemDatetime,
        onDismiss: handleEditDismiss,
        updateItemHandler: updateItemHandler,
      });

      const [showCalendarModal, hideCalendarModal] = useIonModal(SelectDateModal, {
        date,
        updateDate,
        onDismiss: handleCalendarDismiss,
      });


    useIonViewDidEnter(()=>{
        refreshItems();
    });

    useIonViewDidLeave(()=>{
        LogoutUser();
    })
    
    function AddItem(){
        if(input!='')
        {
            pushItem(input, extractDate(date),refreshItems);
            setInput('');
        }
        //setItems((items:any)=>items.concat(input));
       
    }
    function refreshItems() 
    {
        setItems([]);
        fetchItems(date)
            .then(
            function(res:any)
            {
                setItems([]);
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
        setChecked(id,res['detail'].checked,refreshItems);
        drawLineThrough(id,res['detail'].checked);
    }


    function deleteItem(id: any){
        popItem(id, refreshItems);
    }

   function updateDate(d:any){
       const date = parseISOString(d) as unknown as number;
       setDate(extractDate(date));

   }

   function clearAll(){
    deleteAll(date).then(()=>refreshItems());
   }
   
   function markAll(){
    checkAll(date).then(()=>refreshItems());
   }

   function unMarkAll(){
    unCheckAll(date).then(()=>refreshItems());
   }

   useEffect(()=>{
    refreshItems();
   },[date])

   useEffect(()=>{
      const func = async () =>{
            const db = getFirestore();
            const docRef = doc(db, "itemlist", curID);
            const docSnap = await getDoc(docRef);
            setitemName(docSnap.data()?.item);
            setItemDatetime(docSnap.data()?.timestamp);
       }
       if(curID!='')
       {
           func()
       }

   },[curID])

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
                        <IonItem button onClick={()=>{showAlert({
                                                    cssClass: 'my-css',
                                                    header: 'Clear all',
                                                    message: 'Are you sure?',
                                                    buttons: [
                                                        'Cancel',
                                                        { text: 'Ok', handler: (d) => clearAll() },
                                                    ],
                                                    onDidDismiss: (e) => console.log('did dismiss'),
                                                })}}>
                            <IonIcon slot="start" icon={refreshOutline}></IonIcon>
                            <IonLabel>
                                Clear
                            </IonLabel>
                        </IonItem>
                        
                        <IonItem button onClick={()=>{showAlert({
                                                    cssClass: 'my-css',
                                                    header: 'Mark all',
                                                    message: 'Are you sure?',
                                                    buttons: [
                                                        'Cancel',
                                                        { text: 'Ok', handler: (d) => markAll() },
                                                    ],
                                                    onDidDismiss: (e) => console.log('did dismiss'),
                                                })}}>
                            <IonIcon slot="start" icon={checkmarkCircleOutline}></IonIcon>
                            <IonLabel>
                                Mark all done
                            </IonLabel>
                        </IonItem>
                        <IonItem button onClick={()=>{showAlert({
                                                    cssClass: 'my-css',
                                                    header: 'Unmark all',
                                                    message: 'Are you sure?',
                                                    buttons: [
                                                        'Cancel',
                                                        { text: 'Ok', handler: (d) => unMarkAll() },
                                                    ],
                                                    onDidDismiss: (e) => console.log('did dismiss'),
                                                })}}>
                            <IonIcon slot="start" icon={ellipseOutline}></IonIcon>
                            <IonLabel>
                                Mark all undone
                            </IonLabel>
                        </IonItem>
                        <IonItem button onClick={()=>{showCalendarModal({cssClass: 'my-class',})}}>
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
                        <IonDatetime value={new Date(date).toISOString()} onIonChange={(e) => {updateDate(e.detail.value)}}>
                            {/* {"<"+new Date(date).getDate()+'/'+(new Date(date).getMonth()+1)+'/'+(new Date(date).getFullYear())+">"} */}
                        </IonDatetime>
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
                                    <IonCol size="10" id={"item"+item.docID} onClick={()=>{showEditModal({cssClass: 'my-class',}); setCurID(item.docID)}}>

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
                                        <IonInput placeholder="Item" value={input} className='ion-padding' type='text' onIonChange={(e:any)=>{setInput(e.target.value)}}/>
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

