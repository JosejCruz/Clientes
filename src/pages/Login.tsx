import { useIonAlert, IonButton, IonIcon } from "@ionic/react";
import { settingsOutline } from "ionicons/icons";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Loading from "../common/Loading/Loading";

import { StatusBar, Style } from "@capacitor/status-bar";
import { settings } from "cluster";

function Login() {
  const [login, setLogin] = useState(true);
  const [Spinner, setSpinner] = useState(false);
  const [Session, setSession] = useState({
    user: "",
    password: "",
  });
  const [count, setCount] = useState(0);
  const [config, setConfig] = useState(false);
  const [Data, setData] = useState({
    ApiUrl: "",
    Logo: "",
    Nombre: "",
  });
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
      const resp = await axios.post(Data.ApiUrl + "login", Session);
      console.log(resp.data);
      setLogin(true);
      setSpinner(false);
      if (resp.data.auth == true) {
        localStorage.setItem("x-access-token", resp.data.token);
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
      setConfig(true);
    }
  }, [count]);

  const handleConfig = () => {
    setCount(0);
    setConfig(false);
    history.push("/settings");
  };

  //----//--Segunda forma--//----//

  useEffect(() => {
    if (localStorage.getItem("Data")) {
      const datosapp = JSON.parse(localStorage.getItem("Data")!);
      setData(datosapp);
      console.log(Data);
    } else {
      presentAlert({
        header: "Aviso",
        subHeader: "Error",
        message: "se necesita configurar la conexión",
        buttons: ["OK"],
      });
    }
    if (localStorage.getItem("x-access-token")) {
      const token = localStorage.getItem("x-access-token");
      console.log(token);
      console.log(Data);
      if (Data.ApiUrl !== '') {
        const verificar = async () =>{
          const resp = await axios.get(Data.ApiUrl + 'auth', {
            headers: {
              'x-access-token' : `${token}`
            }
          })
          if (resp.data.auth == true) {
            console.log(resp);
            history.push('/home')
          }
        }
        verificar()
      }
    }
  }, [Data.Logo, Data.ApiUrl]);

  //----//----//----//
  // useEffect(() => {
  //   if (localStorage.getItem("Data")) {
  //     setData(JSON.parse(localStorage.getItem("Data")!));
  //     if (localStorage.getItem("x-access-token")) {
  //       const token = localStorage.getItem("x-access-token");
  //       console.log(token);
  //       console.log(Data.ApiUrl);
  //       try {
  //         axios
  //           .get(Data.ApiUrl + "auth", {
  //             headers: {
  //               "x-access-token": `${token}`,
  //             },
  //           })
  //           .then((res) => {
  //             //console.log(res.data);
  //             if (res.data != false) {
  //               //localStorage.removeItem('x-access-token')
  //               localStorage.setItem("x-access-token", res.data.token);
  //               //console.log(res.data);
  //               history.push("/home");
  //               //history.push({
  //               //  pathname: "/home",
  //               //  state: { 'token': res.data.token, 'url': Data.ApiUrl },
  //               //});
  //             }
  //           });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     } else {
  //       console.log("No existe token");
  //     }
  //   } else {
  //     presentAlert({
  //       header: "Aviso",
  //       subHeader: "Error",
  //       message: "se necesita configurar la conexión",
  //       buttons: ["OK"],
  //     });
  //   }
  // }, [Data.Logo, Data.ApiUrl]);

  return (
    <div className="grid-container">
      <div className="grid-item-center logo-padding">
        <img
          onClick={() => setCount(count + 1)}
          className="logo"
          src={Data.Logo == "" ? "./assets/img/logo512.png" : Data.Logo}
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
        {config && (
          <IonButton
            shape="round"
            className="button-secret"
            size="small"
            onClick={handleConfig}
          >
            <IonIcon slot="start" icon={settingsOutline}></IonIcon>
          </IonButton>
        )}
      </div>
    </div>
  );
}

export default Login;
