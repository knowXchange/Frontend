import axios from 'axios';


export default class UserService {

    url = "http://localhost:8080/userController/";

    add(user){
        return axios.post(this.url + "add"+"?name="+user.name+"&email="+user.email+"&password="+user.password+"&tokens=100&description=hola soy...")
    }
    getAll() {
        return axios.get (this.url + "getAll");
    }
}