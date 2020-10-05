import axios from 'axios';


export default class PersonaService {

    url = http://localhost:8080/api/v1/";

    get All() {
        return axios.get (this.url + "all");
    }
}