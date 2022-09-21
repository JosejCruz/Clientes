import { IonContent, IonHeader, IonItem, IonList, IonMenu, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
interface Listprops{
  'lista': any
}
function Item(props: Listprops) {
  console.log(props.lista)
  return (
    <IonMenu className='ancho' side="end" contentId={props.lista._id}>
      <IonHeader >
        <IonToolbar className='headerItem'>
          <IonTitle>Datos {props.lista.Paciente.nombre}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>Id: = {props.lista._id}</IonItem>
          <IonItem>Nombre: = {props.lista.Paciente.nombre}</IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  )
}

export default Item