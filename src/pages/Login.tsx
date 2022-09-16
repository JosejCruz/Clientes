import React from 'react'

function Login() {
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
                <button className='btn-login'>Iniciar Sesión</button>
            </div>
        </div>
    </div>
  )
}

export default Login