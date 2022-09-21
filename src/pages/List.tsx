import { IonItem, IonLabel, IonMenuToggle } from '@ionic/react'
import React from 'react'
import Item from '../components/Item';
interface Listprops{
  'Content': {'Cargando': boolean, 'lista': any[]}
}
function List(props:Listprops) {
  console.log(props.Content)
  let data = props.Content.lista;
  console.log(data)
  return (
    <>
    {data.map((contenido, index) => {
      return (
        <div key={index}>
          <Item lista={data[index]} />
          <IonMenuToggle id={contenido._id}>
            <IonItem button onClick={() => {}}>
              <IonLabel>{contenido.Paciente.nombre} {index}</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </div>
      );
    })}
    </>
  );
}

export default List