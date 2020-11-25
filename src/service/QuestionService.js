import axios from 'axios';
export default class QuestionService {

    urlQ = 'http://localhost:8080/questionController/'
    urlA = 'http://localhost:8080/answerController/'

    postQuestion(question, lessonId){
        return axios.post(this.urlQ +'addQuestionByPathVariable/'+ question.topic+'/'+question.title+'/'+localStorage.getItem('id')+'/'+lessonId);
    }
    getQuestions(id){
        return axios.get(this.urlQ + 'getLessonQuestionsByPathVariable/'+id);
    }
    postReply(reply){
        return axios.post(this.urlA + 'addAnswerByPathVariable/'+reply.text+'/'+reply.questionId+'/'+reply.userId)
    }
    getReplys(id){
        return axios.get(this.urlA+'getAnswersByPathVariable/'+id);
    }


}