import axios from 'axios'
import Api from './Api'
const PeticionLogin = async (credenciales) =>{
    try {
        let response = await axios.get(Api.url, credenciales)
    } catch (error) {
        
    }
}