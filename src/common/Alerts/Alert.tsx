import { IonButton, useIonAlert } from '@ionic/react'
import React from 'react'

function Alert() {
    const [presentAlert] = useIonAlert();
    return (
      <IonButton
        onClick={() =>
          presentAlert({
            header: "Aviso",
            subHeader: "Importante!",
            message: "Usuario no Registrado",
            buttons: ["OK"],
          })
        }
      >
        Click Me
      </IonButton>
    );
}

export default Alert