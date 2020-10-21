//Knoledge And Branch Service

import axios from 'axios';
export default class UserService {

    urlK = "http://localhost:8080/KnowledgeFieldController/";
    urlB = "http://localhost:8080/FieldBranchController/";

    getAllK(){
        return axios.get(this.urlK+"getAllKnowledgeFields")
    }
    addK(title){
        return axios.post(this.urlK+"addKnowledgeField?title="+title)
    }
    getAllB(){
        return axios.post(this.urlB + "getAllFieldBranchs")
    }

    getBbyK(nameK){
        return axios.get(this.urlB + "FilterBranchesByKnowledgeField?FieldName="+nameK)
    }
    
}