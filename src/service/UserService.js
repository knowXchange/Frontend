import axios from 'axios';


export default class UserService {

    url = "http://localhost:8080/userController/";

    addUser(user){
        return axios.post(this.url + "addUser", user)
    }
    getUser(id){
        return axios.get(this.url+"getById/"+id)
    }
    login(user){
        return axios.post(this.url + "get-login", user)
    }    
    updateUser(user){
        return axios.put(this.url + "modifyUser", user)
    }
    updatePassword(user){
        return axios.put(this.url + "modifyPassword", user)
    }
    registerCourse(idUser, idCourse){
        return axios.put(this.url + "register-into-course?userId="+idUser+"&courseId="+idCourse)
    }
}