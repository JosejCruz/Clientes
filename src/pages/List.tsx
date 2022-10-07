import { IonFab, IonFabButton, IonIcon, IonItem, IonLabel, IonMenuToggle, useIonAlert } from '@ionic/react'
import { exitOutline } from 'ionicons/icons';
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import Item from '../components/Item';
interface Listprops{
  'Content': {'lista': any[]}
}
function List(props:Listprops) {
  const [presentAlert] = useIonAlert();
  const [handlerMessage, setHandlerMessage] = useState(false);

  const [indice, setIndice] = useState(0)
  let data = props.Content.lista;
  //console.log(JSON.stringify(data));
  const handleButton = (index: number) => {
    setIndice(index)
  }
  if (handlerMessage) {
    localStorage.removeItem("x-access-token");
    console.log(handlerMessage)
    window.location.reload();
  }
  const handleexitbutton = ()=>{
    presentAlert({
      header: 'Cerrar Sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            setHandlerMessage(false);
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            setHandlerMessage(true);
          },
        },
      ]
    })
  }
  if(JSON.stringify(data) === '[]'){
    return(<p>Sin Resultados</p>)
  }else{
    return (
      <>
        <Item lista={data[indice]} />
      {data.map((contenido, index) => {
        return (
          <div key={contenido._id}>
            <IonMenuToggle id={contenido._id}>
              <IonItem button onClick={() => { handleButton(index)}}>
                <IonLabel>{contenido.Paciente.nombre} {index}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </div>
        );
      })}
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={handleexitbutton}>
              <IonIcon icon={exitOutline} />
            </IonFabButton>
          </IonFab>
      </>
    )
  }
}

export default List