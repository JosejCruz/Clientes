import { IonButton, IonButtons, IonContent, IonHeader, IonImg, IonInput, IonItem, IonItemDivider, IonList, IonMenu, IonMenuButton, IonPage, IonThumbnail, IonTitle, IonToolbar, useIonAlert } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import ReactImageFileToBase64 from "react-file-image-to-base64";
import { useHistory } from 'react-router';
interface image {
  file_name: "";
  file_size: "";
  file_type: "";
  last_modified: "";
  base64_file: "";
  default_file: {};
}
function Settings() {
  const [presentAlert] = useIonAlert();

    const [Datos, setDatos] = useState({
      ApiUrl: "",
      Nombre: "",
      Logo: "",
    });
    console.log(Datos)
    let history = useHistory();
    useEffect(() => {
      if (localStorage.getItem("Data")) {
        const Data = JSON.parse(localStorage.getItem("Data")!);
        setDatos(Data);
      }
    }, []);
    const DatosUsuario = (e: React.ChangeEvent<HTMLInputElement>) => {
      let valor = e.target.value;
      console.log(e.target.value);
      let target = e.target.name;
      let datos: any = Datos;
      datos[target] = valor;
      setDatos({ ...datos });
    };
    const handleOnCompleted = (files:any) => {
      let i = files[0] as image
      let imagen = i.base64_file;
      let datos: any = Datos;
      datos["Logo"] = imagen;
      console.log(datos)
      setDatos({ ...datos });
    };
    const handlebuttonsave = ()=>{
      if (Datos.ApiUrl != '') {
        localStorage.setItem('Data', JSON.stringify(Datos))
        presentAlert({
          header: "Aviso",
          subHeader: "Notificación",
          message: "Datos Guardados correctamente",
          buttons: ["OK"],
        });
        history.push('/')
        window.location.reload()
      }else{
        presentAlert({
          header: "Aviso",
          subHeader: "Error",
          message: "Debe configurar Dirección de servidor",
          buttons: ["OK"],
        });
      }
    }
    const handlebuttoncancel = ()=>{
      history.push("/");
    }

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
              <input
                className="config-input"
                name="Nombre"
                onChange={DatosUsuario}
                value={Datos.Nombre}
                placeholder="Nombre institución"
                type="text"
              />
            </IonItem>
            <IonItemDivider
              style={{ backgroundColor: "transparent" }}
            ></IonItemDivider>
            <IonItem>
              <input
                className="config-input"
                name="ApiUrl"
                onChange={DatosUsuario}
                value={Datos.ApiUrl}
                placeholder="Dirección de API"
                type="text"
              />
            </IonItem>
            <IonItemDivider
              style={{ backgroundColor: "transparent" }}
            ></IonItemDivider>
            <IonItem>
            <ReactImageFileToBase64 preferredButtonText='Seleccione logo' onCompleted={handleOnCompleted} />
            </IonItem>
          </IonList>
          <IonItemDivider
            style={{ backgroundColor: "transparent" }}
          ></IonItemDivider>
            <IonThumbnail>
              <IonImg src={Datos.Logo == ""? "./assets/img/logo512.png": Datos.Logo}/>
            </IonThumbnail>
        </IonContent>
        <IonButton shape="round" expand="block" onClick={handlebuttonsave}>
          Guardar
        </IonButton>
        <IonButton shape="round" expand="block" color={"danger"} onClick={handlebuttoncancel}>
          Cancelar
        </IonButton>
      </IonPage>
    </>
  );
}

export default Settings
