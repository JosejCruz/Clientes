import { IonAccordion, IonAccordionGroup, IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
interface Listprops{
  'lista': any
}
function Item(props: Listprops) {
  console.log(props.lista)
  const handleButtonSave = () =>{
    console.log('guardar id: ' + props.lista._id)
  }
  const handleButtonCancel = () =>{
    console.log('cancelar id: ' + props.lista._id)
  }
  return (
    <IonMenu className='ancho' side="end" contentId={props.lista._id}>
      <IonHeader >
        <IonToolbar className='headerItem'>
          <IonTitle>Paciente {props.lista.Paciente.nombre}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Estado</IonLabel>
          <IonSelect interface='popover' placeholder='Estado'>
            <IonSelectOption value={'Preregistro'}>Pre-registro</IonSelectOption>
            <IonSelectOption value={'Ingresado'}>Ingresado</IonSelectOption>
          </IonSelect>
          </IonItem>
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
            <IonAccordionGroup>
              <IonAccordion value='Estudios'>
                <IonItem slot='header' color={'light'}>
                  <IonLabel>Lista de Estudios</IonLabel>
                </IonItem>
                {props.lista.ListaEstudios.map((contenido:any, index:any)=>{
                  return(
                    <div key={index} className='ion-padding' slot='content'>
                      {contenido.nombreMod}
                    </div>
                  )
                })}
              </IonAccordion>
            </IonAccordionGroup>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonButton onClick={handleButtonSave} expand='block' color={'primary'}> <IonIcon slot='start' icon='save-outline'></IonIcon> Guardar</IonButton>
        <IonButton onClick={handleButtonCancel} expand='block' color={'danger'}> <IonIcon slot='start' icon='close-circle-outline'></IonIcon> Cancelar</IonButton>
      </IonFooter>
    </IonMenu>
  )
}

export default Item