import React, { useRef, useState } from "react";

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
} from "@ionic/react";

import { createOutline } from "ionicons/icons";
const Result: React.FC<{
    itemList: { [itemNo: string]: string }[];
    onDelete: (arg0: string) => void;
    setItemList: (arg0: { [itemNo: string]: string }[]) => void;
}> = props => {

    const [edit, setEdit] = useState<boolean>(false);
    const curItem = useRef(0);

    const handlePopup = (item:{[itemNo:string]:string}) => {
        var array = [...props.itemList];
        for(var i=0; i<(array.length as unknown as number);i++)
        {
            if(item['itemNo']===array[i]['itemNo'])
            {
                curItem.current = i;
            }
        }
        setEdit(true);
    };

    const saveEdit = (data:string) => {    //itemNo:{[itemNo:string]:string}
        var array = [...props.itemList];
        var index = curItem.current;
        array[index]['value'] = data;
        props.setItemList(array);
        
    };

    const deleteEdit = () => {
        var array = [...props.itemList];
        array.splice(curItem.current,1);
        props.setItemList(array);
    };


    return (
        <IonRow>
            <IonCol>
                <IonCard>
                    <IonCardHeader>
                        {/* <IonTitle>
                <h2>PLAN</h2>
            </IonTitle> */}
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList>
                            <IonGrid>
                                {props.itemList.map((item) => (
                                    <IonRow key={item['itemNo']}>
                                        <IonAlert
                                            isOpen={edit}
                                            message='EDIT'
                                            onDidDismiss={() => setEdit(false)}
                                            inputs={[
                                                { 
                                                    name: 'Item',
                                                    type: 'text',
                                                    placeholder: 'Item',
                                                    value: [...props.itemList][curItem.current]['value'],
                                                    
                                                }]}
                                            buttons={[
                                                {
                                                    text: 'SAVE',
                                                    handler: data => {saveEdit(data.Item);}
                                                },
                                                {
                                                    text: 'DELETE',
                                                    handler: () => {deleteEdit()}
                                                }
                                            ]} />
                                        <IonCol>
                                            <IonItem>
                                                <h2>{item['value']}</h2>
                                            </IonItem>
                                        </IonCol>
                                        <IonCol size="3">
                                            <IonButton onClick={()=>handlePopup(item)} color="warning"> {/* props.onDelete(item['itemNo']) */}
                                                <IonIcon icon={createOutline} />
                                            </IonButton>
                                        </IonCol>
                                    </IonRow>
                                ))}
                            </IonGrid>
                        </IonList>
                    </IonCardContent>
                </IonCard>
            </IonCol>
        </IonRow>

    );
};

export default Result;






