import { useIonAlert } from '@ionic/react';
import React, { useState } from 'react'
import Loading from '../common/Loading/Loading';

function Login() {
    const [login, setLogin] = useState(true);
    const [Spinner, setSpinner] = useState(false);
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
  return (
    <div className='grid-container'>
        <div className='grid-item-center logo-padding'>
        <img className='logo' src="./assets/img/logo512.png" alt="" width={200} />
        </div>
        <div className='contenedor'>
            <div className='grid-item-center'>
                <input className='input-text' type="text" placeholder='Usuario'/>
            </div>
            <div className='grid-item-center'>
                <input className='input-text' type="password" placeholder='Contraseña'/>
            </div>
            <div className='grid-item-center'>
                {(login && <button onClick={handleButton} className='btn-login'>Iniciar Sesión</button>) || (Spinner && <Loading/>)}
            </div>
        </div>
    </div>
  )
}

export default Login