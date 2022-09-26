import { useIonAlert } from '@ionic/react';
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router';
import Loading from '../common/Loading/Loading';
import {ApiUrl} from '../service/api'

//import { Storage } from '@ionic/storage';

function Login() {
    const [login, setLogin] = useState(true);
    const [Spinner, setSpinner] = useState(false);
    const [Session, setSession] = useState({
      user: "",
      password: "",
    });
    const [presentAlert] = useIonAlert();
    //----//----//----//
    let TokenGlobal = '';


    let history = useHistory();
    const handleButton = async () => {
      setLogin(false);
      setSpinner(true);
      //const store = new Storage();
      //await store.create()
      try {
        const resp = await axios.post(ApiUrl + "login", Session);
        //console.log(resp.data);
        TokenGlobal = resp.data.token
        //console.log(TokenGlobal)
        //await store.set('x-access-token', resp.data.token);
        //localStorage.setItem("x-access-token", resp.data.token);
        setLogin(true);
        setSpinner(false);
        if (resp.data.auth == true) {
          history.push({
            pathname: '/home',
            state: { token: TokenGlobal }
          });
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
          message: "Ocurrio un Error" + error,
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

    // useEffect(() => {
    //   if (navigator.onLine) {
    //     const Main = async()=>{
    //       const store = new Storage();
    //       await store.create()
    //       if (await store.get('x-access-token') != null || await store.get('x-access-token') != "") {
    //         const token = await store.get('x-access-token')
    //         try {
    //           axios
    //             .get(ApiUrl + "auth", {
    //               headers: {
    //                 "x-access-token": `${token}`,
    //               },
    //             })
    //             .then((res) => {
    //               console.log(res.data);
    //               if (res.data != false) {
    //                 console.log(res.data.auth);
    //                 history.push("/home");
    //               }
    //             });
    //         } catch (error) {
    //           console.log(error);
    //         }
    //       } else {
    //         console.log("No existe token");
    //       }
    //     }
    //     Main();
    //   } else {
    //     presentAlert({
    //       header: "Aviso",
    //       subHeader: "Importante!",
    //       message: "Sin Conexión",
    //       buttons: ["OK"],
    //     });
    //   }
    // }, []);
    
  return (
    <div className="grid-container">
      <div className="grid-item-center logo-padding">
        <img
          className="logo"
          src="./assets/img/logo512.png"
          alt=""
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
      </div>
    </div>
  );
}

export default Login