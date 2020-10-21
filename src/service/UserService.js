import axios from 'axios';


export default class UserService {

    url = "http://localhost:8080/userController/";

    add(user){
        return axios.post(this.url + "add"+"?name="+user.name+"&email="+user.email+"&password="+user.password+"&tokens=100&description=hola soy...")
    }
    getAll() {
        return axios.get (this.url + "getAll");
    }
    login(user){
        return axios.get(this.url + "get-login"+"?name="+user.name+"&password="+user.password)
    }
    getUser(id){
        return axios.get(this.url+"getById/"+id)
    }
    updateUser(user){
        return axios.post(this.url + "modifyUser/"+user.id,{
            name: user.name.trim( ),
            email: user.email.trim( ),
            password: user.password,
            tokens: user.tokens,
            description: user.description.trim( ) 
        })
    }
}