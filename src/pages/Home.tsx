import { IonSearchbar, useIonAlert } from '@ionic/react';
import axios from 'axios';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { useHistory, useLocation } from 'react-router';
import Loading from '../common/Loading/Loading';
import { ApiUrl } from '../service/api';
import './Home.css';
import List from './List';
//import { Storage } from '@ionic/storage';

const Home: React.FC = () => {
  const [Spinner, setSpinner] = useState(false);
  const [Data, setData] = useState(false)
  const [Content, setContent] = useState({'Cargando': true, 'lista': []})
  const [presentAlert] = useIonAlert();
  let history = useHistory()
  const location:any = useLocation();
  useEffect(() => {
    setSpinner(true);
    const Main = async() =>{
      //const store = new Storage();
      //await store.create()
      console.log(location.state.token)
      if (location.state.token != '') {
        //const token = await store.get('x-access-token')
        console.log(location.state.token)
        try {
          axios
            .get(ApiUrl + "content", {
              headers: {
                "x-access-token": `${location.state.token}`,
              },
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.auth == false) {
                setSpinner(false);
                console.log(res.data.auth);
                history.push("/login");
              } else {
                setSpinner(false);
                setData(true);
                setContent({ Cargando: false, lista: res.data });
              }
            }).catch((error) => {
              console.log(error.response.status)
              if (error.response.status == 401) {
                setSpinner(false)
                presentAlert({
                  header: "Aviso",
                  subHeader: "Importante!",
                  message: "La sesión expiró",
                  buttons: ["OK"],
                });
                history.push("/login")
              }
            })
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No existe token");
        setSpinner(false);
        history.push("/login");
      }
    }
    Main();
  }, []);

  return (
    <>
      <div className="grid-container home">
        <div className="grid-item-center">
          <IonSearchbar
            placeholder="Buscar"
            animated
            color={"light"}
          ></IonSearchbar>
        </div>
      </div>
      <div className="grid-container">
        <div className="grid-item-center">{Spinner && <Loading />}</div>
        {Data && <List Content={Content} />}
      </div>
    </>
  );
};

export default Home;
