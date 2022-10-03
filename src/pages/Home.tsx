import { IonSearchbar, useIonAlert } from '@ionic/react';
import axios from 'axios';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { useHistory } from 'react-router';
import Loading from '../common/Loading/Loading';
import { ApiUrl } from '../service/api';
import './Home.css';
import List from './List';

const Home: React.FC = () => {
  const [Spinner, setSpinner] = useState(false);
  const [Data, setData] = useState(false)
  const [Content, setContent] = useState({'lista': []})
  const [presentAlert] = useIonAlert();
  let history = useHistory()
  useEffect(() => {
    setSpinner(true);
    if (localStorage.getItem("x-access-token")) {
      const token = localStorage.getItem("x-access-token");
      try {
        axios
          .get(ApiUrl + "content", {
            headers: {
              "x-access-token": `${token}`,
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
              setContent({lista: res.data });
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
