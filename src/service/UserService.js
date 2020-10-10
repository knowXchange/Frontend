import axios from 'axios';


export default class UserService {

    url = "http://localhost:8080/userController/";

    getAll() {
        return axios.get (this.url + "getAll");
    }
}