import axios from 'axios';
export default class QuestionService {

    urlQ = 'http://localhost:8080/questionController/'
    urlA = 'http://localhost:8080/answerController/'

    postQuestion(question, lessonId){
        return axios.post(this.urlQ +'addQuestion/'+localStorage.getItem('id')+'/'+lessonId, question);
    }
    getQuestions(id){
        return axios.get(this.urlQ + 'getLessonQuestionsByPathVariable/'+id);
    }
    postReply(reply){
        return axios.post(this.urlA + 'addAnswer/'+reply.userId+'/'+reply.questionId, reply)
    }
    getReplys(id){
        return axios.get(this.urlA+'getAnswersByPathVariable/'+id);
    }


}