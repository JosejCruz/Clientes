import { IonItem, IonLabel, IonMenuToggle } from '@ionic/react'
import React, { useState } from 'react'
import Item from '../components/Item';
interface Listprops{
  'Content': {'Cargando': boolean, 'lista': any[]}
}
function List(props:Listprops) {
  const [indice, setIndice] = useState(0)
  let data = props.Content.lista;
  const handleButton = (index: number) => {
    setIndice(index)
  }
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
    </>
  );
}

export default List