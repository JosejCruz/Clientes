import { IonSearchbar, useIonAlert } from '@ionic/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from "react-router-dom";
import Loading from '../common/Loading/Loading';
//import { ApiUrl } from '../service/api';
import './Home.css';
import List from './List';

const Home: React.FC = () => {
  const [Spinner, setSpinner] = useState(false);
  const [Data, setData] = useState(false)
  const [Content, setContent] = useState({'lista': []})
  const [presentAlert] = useIonAlert();
  let history = useHistory()

  //----//--filtrar busqueda--//----//

  const [dato, setDato] = useState('')
  const handlesearchchange = (ev: any) => {
    setDato(ev.target.value)
    //funcion para filtrar datos
    // let query = "";
    // const target = ev.target as HTMLIonSearchbarElement;
    // if (target) query = target.value!.toLowerCase();
    // console.log(query)
    // let filtrado:any[] = []
    // console.log(Content.lista.filter(cont => cont))
    // Content.lista.forEach((item)=>{
    //   if (condition) {
        
    //   }
    // })

    //console.log(Content.lista.filter(cont => cont))

    //setResults(Content.lista.filter(c.Paciente.nombre => c.Paciente.nombre.toLowerCase(query)))

    //setResults(Content.lista.filter(d.Paciente.nombre => d.Paciente.nombre.toLowerCase()));
  }
  
  let filtrado:any = {lista: []}
  Content.lista.forEach((item:any)=>{
    if (item.Paciente.nombre.toLowerCase().indexOf(dato.toLowerCase()) > -1) {
      filtrado.lista.push(item)
    }
  })
  console.log(filtrado)
  //----//----//----//
  const location:any = useLocation();
  console.log(location);
  //----//----//----//
  const token = localStorage.getItem('x-access-token')!
  const conf = JSON.parse(localStorage.getItem('Data')!)

  useEffect(() => {
    setSpinner(true);
    console.log(token)
    //setConfig(conf)
    if (token != undefined && token != null && conf != undefined) {
      console.log(conf)
      const renovar =async () => {
        const resp = await axios.get(conf.ApiUrl + 'auth', {
          headers: {
            'x-access-token' : `${token}`
          }
        })
        if (resp.data.auth == true) {
          localStorage.setItem('x-access-token', resp.data.token)
        }else{
          presentAlert({
            header: "Aviso",
            subHeader: "Importante!",
            message: "Ocurrio un error al actualizar token",
            buttons: ["OK"],
          });
        }
      }
      renovar()
      try {
        axios
          .get(conf.ApiUrl + "content", {
            headers: {
              "x-access-token": `${token}`
            },
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.auth == false) {
              setSpinner(false);
              console.log(res.data.auth);
              history.push("/login");
              window.location.reload()
            } else {
              setSpinner(false);
              setData(true);
              setContent({lista: res.data });
            }
          }).catch((error) => {
            console.log(error.response)
            if (error.response.status == 401) {
              setSpinner(false)
              presentAlert({
                header: "Aviso",
                subHeader: "Importante!",
                message: "La sesión expiró " + token,
                buttons: ["OK"],
              });
              localStorage.removeItem("x-access-token");
              history.push("/")
              window.location.reload()
            }
          })
      } catch (error) {
        console.log(error);
      }
    } else {
      localStorage.removeItem("x-access-token");
      console.log("No existe token");
      setSpinner(false);
      history.push("/");
      window.location.reload()
    }
  }, []);

  return (
    <>
      <div className="grid-container home">
        <div className="grid-item-center">
          <IonSearchbar
            onIonChange={(ev) => handlesearchchange(ev)}
            placeholder="Buscar"
            animated
            color={"light"}
          ></IonSearchbar>
        </div>
      </div>
      <div className="grid-container">
        <div className="grid-item-center">{Spinner && <Loading />}</div>
        {Data && <List Content={filtrado} />}
      </div>
    </>
  );
};

export default Home;
