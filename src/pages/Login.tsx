import { useIonAlert } from '@ionic/react';
import { strict } from 'assert';
import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import Loading from '../common/Loading/Loading';
import {ApiUrl} from '../service/api'

function Login() {
    const [login, setLogin] = useState(true);
    const [Spinner, setSpinner] = useState(false);
    const [Session, setSession] = useState({
        User: "",
        Password: ""
    })
    const [presentAlert] = useIonAlert();
    const handleButton = ()=>{
        setLogin(false);
        setSpinner(true);
        setTimeout(() => {
            setLogin(true);
            setSpinner(false);
            // efecto Alert
            presentAlert({
                header: "Aviso",
                subHeader: "Importante!",
                message: "Usuario no Registrado",
                buttons: ["OK"],
              })
        }, 5000);
    }

    const DatosUsuario = (e:React.ChangeEvent<HTMLInputElement>)=>{
        let valor = e.target.value;
        let target = e.target.name;
        let datos = Session;
        datos[target] = valor;
        setSession({ ...datos });
    }

    useEffect(() => {
      if (localStorage.getItem("x-access-token")) {
        const token = localStorage.getItem("x-access-token");
        try {
            axios.get((ApiUrl + "content"), {
                headers: {
                    'x-access-token': `${token}`
                }
            }).then((res) => {
                console.log(res.data);
                if (res.data != false) {
                    return <Redirect to='/home'/>;
                }
              });
        } catch (error) {
            console.log(error)
        }
      }else{
        console.log("No existe token");
      }
    }, [])
    
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
            name="User"
            onChange={DatosUsuario}
            value={Session.User}
            placeholder="Usuario"
          />
        </div>
        <div className="grid-item-center">
          <input
            className="input-text"
            type="password"
            name="Password"
            onChange={DatosUsuario}
            value={Session.Password}
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