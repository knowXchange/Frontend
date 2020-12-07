import axios from 'axios';


export default class UserService {

    url = "http://localhost:8080/courseController/";
    url2 = "http://localhost:8080/lessonController/";
    url3 = "http://localhost:8080/LearningResourceController/";

    addCourse(ownerId, branchId, course){
        return axios.post(this.url+"addCourse/"+ownerId+'/'+branchId, course);
    }
    updateCourse(course){
        return axios.put(this.url+"modifyCourse/"+course.id, course);
    }
    updateLesson(lesson){
        return axios.put(this.url2+"modifyLesson/"+lesson.id, lesson);
    }
    addResource(resource){
        return axios.post(this.url3+"addResources", resource)
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
        return axios.get(this.url+"getByWord/"+subcadena)
    }
    getCourseById(id){
        return axios.get(this.url+"getCourseById/"+id)
    }
    getLessons(id){
        return axios.get(this.url2+"getLessonByCourseId/"+id)
    }
    addLessons(id, Lessons){
        for (let index = 0; index < Lessons.length; index++) {  
            console.log(Lessons[index])  
            if(Lessons[index].id == null) {       
                axios.post(this.url2+"addLesson/" + id, Lessons[index])
                    .then(data=>{
                        for (let i= 0; i < Lessons[index].resources.length; i++) {
                            if(data.data != null){
                                axios.post(this.url3 + "addResource/"+data.data, Lessons[index].resources[i]);                           
                            }
                        }                   
                    }
                );
            }else{
                axios.put(this.url2+"modifyLesson", Lessons[index]).then(
                data => {
                    for (let i= 0; i < Lessons[index].resources.length; i++) {
                        if(Lessons[index].resources[i].id == null)
                            axios.post(this.url3 + "addResource/"+Lessons[index].id, Lessons[index].resources[i]);
                    }
                }
                );                
            }
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
    getCourseRandom(cursos_aleatorios){
        return axios.get(this.url+"getRandomCoursesByPathVariable/"+cursos_aleatorios)
    }
    getResources(id){
        return axios.get(this.url3+"getLessonResourcesByPathVariable/"+id)
    }
    deleteResource(id){
        return axios.delete(this.url3+"deleteByPathVariable/"+id)
    }
}