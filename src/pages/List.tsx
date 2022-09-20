import { IonItem, IonLabel, IonMenuToggle } from '@ionic/react'
import React from 'react'
import Item from '../components/Item';
interface Listprops{
  'Content': {'Cargando': boolean, 'lista': any[]}
}
function List(props:Listprops) {
  console.log(props.Content)
  let data = props.Content.lista;
  return (
    <>
    {data.map((contenido) => {
      return (
        <>
          <Item key={contenido._id} id={contenido._id} />
          <IonMenuToggle key={contenido._id} id={contenido._id}>
            <IonItem button onClick={() => {}}>
              <IonLabel>{contenido.Paciente}</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </>
      );
    })}
    </>
  );
}

export default List