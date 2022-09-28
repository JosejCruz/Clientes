import { useIonAlert, IonButton, IonIcon } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';

import axios from "axios";
import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router';
import Loading from '../common/Loading/Loading';
import {ApiUrl} from '../service/api'

import { StatusBar, Style } from '@capacitor/status-bar';
import { settings } from 'cluster';

function Login() {
    const [login, setLogin] = useState(true);
    const [Spinner, setSpinner] = useState(false);
    const [Session, setSession] = useState({
      user: "",
      password: "",
    });
    const [count, setCount] = useState(0)
    const [config, setConfig] = useState(false)
    const [presentAlert] = useIonAlert();
    let history = useHistory();
    // const hideStatusBar = async () => {
    //   await StatusBar.hide();
    // };
    // hideStatusBar()
    const handleButton = async () => {
      setLogin(false);
      setSpinner(true);
      try {
        const resp = await axios.post(ApiUrl + "login", Session);
        console.log(resp.data);
        localStorage.setItem("x-access-token", resp.data.token);
        setLogin(true);
        setSpinner(false);
        if (resp.data.auth == true) {
          history.push("/home");
        } else {
          presentAlert({
            header: "Aviso",
            subHeader: "Importante!",
            message: "Usuario no registrado",
            buttons: ["OK"],
          });
          setSession({
            user: "",
            password: "",
          });
        }
      } catch (error) {
        setLogin(true);
        setSpinner(false);
        presentAlert({
          header: "Aviso",
          subHeader: "Importante!",
          message: "Ocurrio un Error",
          buttons: ["OK"],
        });
      }
    };

    const DatosUsuario = (e: React.ChangeEvent<HTMLInputElement>) => {
      let valor = e.target.value;
      let target = e.target.name;
      let datos: any = Session;
      datos[target] = valor;
      setSession({ ...datos });
    };
    useEffect(() => {
      if (count == 3) {
        setConfig(true)
      }
    }, [count])
    
    const handleConfig = ()=>{
      setCount(0)
      setConfig(false)
      history.push("/settings")
    }

    useEffect(() => {
      if (navigator.onLine) {
        if (localStorage.getItem("x-access-token")) {
          const token = localStorage.getItem("x-access-token");
          try {
            axios
              .get(ApiUrl + "auth", {
                headers: {
                  "x-access-token": `${token}`,
                },
              })
              .then((res) => {
                console.log(res.data);
                if (res.data != false) {
                  console.log(res.data.auth);
                  history.push("/home");
                }
              });
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("No existe token");
        }
      } else {
        presentAlert({
          header: "Aviso",
          subHeader: "Importante!",
          message: "Sin Conexión",
          buttons: ["OK"],
        });
      }
    }, []);
    
  return (
    <div className="grid-container">
      <div className="grid-item-center logo-padding">
        <img onClick={() => setCount(count+1)}
          className="logo"
          src="./assets/img/logo512.png"
          width={200}
        />
      </div>
      <div className="contenedor">
        <div className="grid-item-center">
          <input
            className="input-text"
            type="text"
            name="user"
            onChange={DatosUsuario}
            value={Session.user}
            placeholder="Usuario"
          />
        </div>
        <div className="grid-item-center">
          <input
            className="input-text"
            type="password"
            name="password"
            onChange={DatosUsuario}
            value={Session.password}
            placeholder="Contraseña"
          />
        </div>
        <div className="grid-item-center">
          {(login && (
            <button onClick={handleButton} className="btn-login">
              Iniciar Sesión
            </button>
          )) ||
            (Spinner && <Loading />)}
        </div>
        {config && <IonButton shape="round" className="button-secret" size="small" onClick={handleConfig}>
          <IonIcon slot="start" icon={settingsOutline}></IonIcon>
        </IonButton>}
      </div>
    </div>
  );
}

export default Login