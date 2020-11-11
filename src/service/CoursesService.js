import axios from 'axios';


export default class UserService {

    url = "http://localhost:8080/courseController/";
    url2 = "http://localhost:8080/lessonController/";

    add(Course){
        return axios.post(
            this.url +
            "addNewKXCourse?title="+Course.title+
            "&description="+Course.description+
            "&tokensCost=0"+
            "&branch_id="+Course.branchId+
            "&ownerId="+localStorage.getItem('id'))
    }
    getCreated(){
        return axios.get(this.url+"getByOwner/"+localStorage.getItem('id'))
    }
    delete(id){
        return axios.delete(this.url+"deleteCourse/"+id)
    }

    addLessons(id, Lessons){
        for (let index = 0; index < Lessons.length; index++) {
            axios.post(this.url2+"addLessonKX?Courseid="+id+"&title="+Lessons[index].title+"&description="+Lessons[index].description)
                .then(data=>{
                    console.log(data)
                })          

        }
    }
    getLessons(id){
        return axios.get(this.url2+"getLessonByCourseId/"+id)
    }
    update(Course, lessons){
        axios.post(this.url+
            "editCourseAllData?id="+Course.id+
            "&title="+Course.title+
            "&description="+Course.description+
            "&tokensCost="+Course.tokens+
            "&branch_id="+Course.branchId)
        for (let index = 0; index < lessons.length; index++) {
            const element = array[index];
            
        }
    }
}