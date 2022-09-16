import { IonButton, IonItem, IonLabel, IonMenuToggle } from '@ionic/react'
import React from 'react'
import Item from '../components/Item';

function List() {
  return (
    <>
    <Item/>
        <IonMenuToggle id="main">
      <IonItem button onClick={() => {}}>
          <IonLabel>Button Item</IonLabel>
      </IonItem>
        </IonMenuToggle>
      <IonItem button onClick={() => {}}>
        <IonLabel>Button Item</IonLabel>
      </IonItem>
      <IonItem button onClick={() => {}}>
        <IonLabel>Button Item</IonLabel>
      </IonItem>
      <IonItem button onClick={() => {}}>
        <IonLabel>Button Item</IonLabel>
      </IonItem>
      <IonItem button onClick={() => {}}>
        <IonLabel>Button Item</IonLabel>
      </IonItem>
      <IonItem button onClick={() => {}}>
        <IonLabel>Button Item</IonLabel>
      </IonItem>
    </>
  );
}

export default List