import axios from 'axios';


export default class UserService {

    url = "http://localhost:8080/courseController/";

    add(Course){
        return axios.post(
            this.url +
            "addNewKXCourse?title="+Course.title+
            "&description="+Course.description+
            "&tokensCost="+Course.tokens+
            "&branch_id="+Course.branchId+
            "&ownerId="+localStorage.getItem('id'))
    }
    getCreated(){
        return axios.get(this.url+"getByOwner/"+localStorage.getItem('id'))
    }
    delete(id){
        return axios.delete(this.url+"deleteCourse/"+id)
    }
    getAll(){
        return axios.get(this.url+"getAll")
    }

}