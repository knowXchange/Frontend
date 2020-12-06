import axios from 'axios';
export default class ReviewService {

    url = 'http://localhost:8080/ReviewController/'

    postReseñas(reseñas, courseId, grade){
        return axios.post(this.url + 'addReviewByPathVariable/' + reseñas + '/' + grade + '/' + localStorage.getItem('id') + '/' + courseId);
    }
    
    getAllReseñas(courseId){
        return axios.get(this.url + 'getReviewsByPathVariable/' + courseId)
    }
  
}