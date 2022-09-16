import { IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import List from './List';

const Home: React.FC = () => {
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
      <div className='grid-container'>
        <List/>
      </div>
    </>
  );
};

export default Home;
