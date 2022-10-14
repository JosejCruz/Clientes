import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonTitle, IonToolbar } from '@ionic/react'
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
          <IonTitle>Paciente {props.lista.Paciente.nombre}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>Estado = {props.lista.Tipo}</IonItem>
          <IonItem>Nombre: = {props.lista.Paciente.nombre}</IonItem>
          <IonList>
            <IonItem>
            <IonLabel>
              <h1>Lista Estudios</h1>
            </IonLabel>
            </IonItem>
          {props.lista.ListaEstudios.map((contenido:any, index:any)=>{
            return(
              <IonItem key={index}>{contenido.nombreMod}</IonItem>
            )
          })}
          </IonList>
        </IonList>
      </IonContent>
    </IonMenu>
  )
}

export default Item