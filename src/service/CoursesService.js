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
    getAllCourses(){
        return axios.get(this.url+"getAllCourses")
    }
    getByBranch(id){
        return axios.get(this.url+"/getByBranch/"+id)
    }
    getByWord(subcadena){
        return axios.get(this.url+"/getByWord/"+subcadena)
    }
    getCourseById(id){
        return axios.get(this.url+"/getCourseById/"+id)
    }
    getLessons(id){
        return axios.get(this.url2+"getLessonByCourseId/"+id)
    }
    addLessons(id, Lessons){
        console.log(id);
        console.log(Lessons);
        for (let index = 0; index < Lessons.length; index++) {
            
                axios.post(this.url2+"editLessonByIdKX?id="+Lessons[index].id+"&title="+Lessons[index].title+"&description="+Lessons[index].description)
                .then(data=>{console.log(data)})    
                .catch(error => {
                    axios.post(this.url2+"addLessonKX?Courseid="+id+"&title="+Lessons[index].title+"&description="+Lessons[index].description)
                    .then(data=>{console.log(data)});
                })
            
        }
    }
    deleteLesson(id){
        return axios.delete(this.url2+"deleteLessonKX?id="+id);
    }
    updatePlain(Course){
        axios.post(this.url+
            "editCoursePlainData?id="+Course.id+
            "&title="+Course.title+
            "&description="+Course.description+
            "&tokensCost=0")
    }
    updateAll(Course, lessons){
        axios.post(this.url+
            "editCourseAllData?id="+Course.id+
            "&title="+Course.title+
            "&description="+Course.description+
            "&tokensCost=0"+
            "&branch_id="+Course.branchId)
        for (let index = 0; index < lessons.length; index++) {
            axios.put()            
        }
    }
    getCourse(id){
        return axios.get(this.url+"getById/"+id)
    }
    getEnrrolled(id){
        return axios.get(this.url+"getCoursesEnrrolled/"+id)
    }
}