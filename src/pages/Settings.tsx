import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonItemDivider, IonList, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React, { useEffect, useState } from 'react'

function Settings() {
    const [Datos, setDatos] = useState({
        ApiUrl: "",
        Nombre: ""
    })
    useEffect(() => {
      if (localStorage.getItem('Data')) {
        const Data = JSON.parse(localStorage.getItem('Data')!)
        setDatos(Data)
      }
    }, [])
    const DatosUsuario = (e: React.ChangeEvent<HTMLIonInputElement>) => {
        let valor = e.target.value;
        console.log(e.target.value)
        let target = e.target.name;
        let datos: any = Datos;
        datos[target] = valor;
        setDatos({ ...datos });
      };
    
  return (
    <>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Configuración</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonItem>
              <IonInput
                name="Nombre"
                onChange={DatosUsuario}
                value={Datos.Nombre}
                placeholder="Nombre institución"
              ></IonInput>
            </IonItem>
            <IonItemDivider
              style={{ backgroundColor: "transparent" }}
            ></IonItemDivider>
            <IonItem>
              <IonInput
                name="ApiUrl"
                onChange={DatosUsuario}
                value={Datos.ApiUrl}
                placeholder="Dirección API"
              ></IonInput>
            </IonItem>
          </IonList>
          <IonItemDivider
            style={{ backgroundColor: "transparent" }}
          ></IonItemDivider>
        </IonContent>
        <IonButton shape="round" expand="block">
          Guardar
        </IonButton>
        <IonButton shape="round" expand="block" color={"danger"}>
          Cancelar
        </IonButton>
      </IonPage>
    </>
  );
}

export default Settings
