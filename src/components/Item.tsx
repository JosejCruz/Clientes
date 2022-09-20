import { IonContent, IonHeader, IonItem, IonList, IonMenu, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
interface Id{
  'id': string
}
function Item(props:Id) {
  return (
    <IonMenu className='ancho' side="end" menuId="first" contentId="main">
      <IonHeader >
        <IonToolbar className='headerItem'>
          <IonTitle>Datos Item</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>Menu Item</IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  )
}

export default Item