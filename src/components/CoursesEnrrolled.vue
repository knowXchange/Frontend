<template>
    <div class="p-mb-4">
        <br class="p-mb-4"/>
        <div style="margin: 0 auto; width: 80%" class="p-mb-4"> 
            <DataTable :value="courses" :paginator="true" :rows="10">
                <Column field="title" header="Curso"></Column>
                <Column :exportable="false">                
                    <template #body="slotProps">
                        <Button label="Ver Lecciones" class="p-button-raised p-button-text" @click="showLessons(slotProps.data)"/>
                        <Button label="Calificar Curso" class="p-button-raised p-button-text" @click="showReseñas(slotProps.data)"/>
                    </template>
                </Column>
            </DataTable>
        </div>
        <Dialog :visible.sync="displayLessons" :header.sync="course.title" :modal="true" :style="{width: '80vw'}">
            <DataTable ref="dt" :value="lessons" :paginator="true" :rows="10">
                <Column field="title" header="Lecciones"></Column>
                <Column :exportable="false">
                    <template  #body="slotProps">
                        <Button label="Ver Leccion" class="p-button-raised p-button-text" @click="openLesson(slotProps.data);"/>                              
                    </template>
                </Column>
            </DataTable>
        </Dialog>
        <Dialog :visible.sync="displayReseñas" :header.sync="course.title" :modal="true" :style="{width: '80vw'}">
            <h3>Calificación {{grade}}</h3>
                <Rating v-model="grade" :cancel="false"/>
                <div class="p-text-left">
                     <Textarea v-model="reseñas.text" placeholder="Dejanos tu opinión respecto al curso" rows="3" cols="30" style="width: 95%"/>
                     <Button label='Publicar' class="p-button-rounded  p-button-success" @click="publishReseña()" :disabled="dButton"/>
                </div>
        </Dialog>
        <Dialog  
            :visible.sync="displayLesson" 
            :header.sync="course.title" 
            :modal="true" 
            :maximizable="true"
            :style="{width: '100%'}">
            <div class="p-grid p-jc-between">
                <div class="p-col-2">
                    <Button 
                        icon="pi pi-chevron-left" 
                        label="Leccion Anterior" 
                        class="p-button-link" 
                        :disabled="posLesson == 0"
                        @click="previous()"/>
                </div>
                <div class="p-col-6">
                    <b>{{lesson.title}}</b>
                </div>
                <div class="p-col-2">
                    <Button 
                        icon="pi pi-chevron-right" 
                        label="Siguiente Leccion" 
                        class="p-button-link" 
                        iconPos="right" 
                        :disabled="posLesson==lessons.length - 1 " 
                        @click="next()"/>
                </div>
            </div>
            <div id="description" class="p-text-left">
                Descripcion.                
            </div>
            <div>
                <strong> Recursos de la leccion</strong>
                <div class="p-p-4 p-grid p-jc-between">
                    <div class="p-col-4">
                        <DataTable ref="dt" :value="lesson.resources" :paginator="true" :rows="10">                    
                            <Column field="type" header="Tipo"></Column>
                            <Column header="Titulo">
                                <template #body="slotProps">
                                    <a :href="slotProps.data.link" rel="noopener noreferrer" target="_blank">{{slotProps.data.name}}</a>                               
                                </template>
                            </Column>
                            <Column :exportable="false">
                                <template  #body="slotProps">
                                    <Button label="Ver Recurso" class="p-button-raised p-button-text" @click="viewResource(slotProps.data);"/>                              
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                    <div id="resource" class="p-col-8"/>        
                </div>               
            </div>           
            <div class="p-mb-2 p-text-left">
                <strong> Zona de Preguntas</strong>
            </div>
            <div class="p-text-left">
                <Textarea v-model="question.text" placeholder="Cual es tu pregunta?" rows="3" cols="30" style="width: 95%"/>
                <Button label='Publicar' class="p-button-rounded  p-button-success" @click="publish()"/>
            </div>
            <div style="margin-top: .5em">
                <transition-group name="dynamic-box" tag="div" class="p-jc-end">
                    <div v-for="(col, index) of questions" :key="col.id" class="p-col p-jc-end">
                        <div class="p-shadow-9 p-text-left p-mb-2">
                            <strong>{{col.asking_user.name}}</strong><br/>{{col.text}}<br/>
                        </div>  
                        <div style="margin-right:0;">                     
                            <Button label='Responder' class="p-button-rounded  p-button-success" @click="openReply(index, col)"/>  
                        </div>           
                        <div style="margin-top: .5em">
                            <transition-group name="dynamic-box" tag="div">
                                <div v-for="ans of col.replys" :key="ans.id" class="p-col">
                                    <div class="p-shadow-7 p-text-left" style="margin-left:auto; margin-right:0; width: 95%">
                                        <strong>{{ans.personAnswering.name}}</strong><br/>{{ans.text}}
                                    </div>
                                </div>
                            </transition-group>
                        </div>
                    </div>
                </transition-group>
            </div>         
        </Dialog>
        <Dialog :visible.sync="displayReply" header='Publicar Respuesta' :modal="true" :style="{width: '80vw'}">
            {{question.text}}            
            <Textarea v-model="replyDialog.text" placeholder="Cual es tu respuesta" rows="3" cols="30" style="width: 95%"/>
            <Button label='Publicar' class="p-button-rounded  p-button-success" @click="reply()"/>
        </Dialog>
    </div>   
</template>
<script>   
import CoursesService from '../service/CoursesService' 
import QuestionService from '../service/QuestionService'
import RService from '../service/ReviewService' 
export default {
    name: 'CoursesEnrrolled',
    data(){
        return{
            indexQuestion:null,
            reseñas:{},
            grade: null,
            dButton: false,
            url: null,
            courseSelection: null,
            lessonSelection: null,
            courses: [],
            lessons:[],
            course:{},
            lesson:{},
            displayReseñas: false,
            displayLesson: false,
            displayLessons: false,
            displayReply: false,
            posLesson: 0,
            pText: null,
            question: {},
            replyDialog:{
                text: null,
            },
            questions:[
                {
                    id: 0,
                    asking_user: {
                        name: ""
                    },
                    text: "",
                    replys:[]
                }

            ]
        }
    },
    kbService: null,
    coursesService: null,
    qService: null,
    created(){
        this.coursesService = new CoursesService();
        this.qService = new QuestionService();
        this.RService = new RService();
    },
    mounted(){        
        this.coursesService.getEnrrolled(localStorage.getItem('id')).then(
            data=>{
                this.courses = data.data;
            }
        );
    },
    methods:{
        publishReseña: function(){
            this.RService.postReseñas(this.reseñas.text, this.course.id, this.grade).then(
                data => {
                    console.log(data.data);
                    
                }
                );
            },
        showReseñas: function(course){
            this.course = course; 
            this.RService.exits(localStorage.getItem('id'),this.course.id).then(data=>{
                console.log(data.data)
                this.dButton = data.data;
            });
            this.displayReseñas = true;
        },
        showLessons: function(course){
            this.course = course; 
            this.coursesService.getLessons(course.id).then(data=>{
                this.lessons = data.data
            });
            this.displayLessons = true;
        },
        openLesson: function(lesson){                         
            this.displayLessons = false;
            this.lesson = lesson;
            this.coursesService.getResources(this.lesson.id).then(
                data=>{
                    this.lesson.resources = data.data;
                }
            );
            this.resource = this.lesson.resorces
            this.posLesson = this.lessons.findIndex(element=> element==lesson);
            this.getQuestions();
            setTimeout(() => this.questions.reverse(), 500);
            this.displayLesson = true;
            setTimeout(() => document.getElementById('description').innerHTML = this.lesson.description, 0);
            
        },
        next: function(){
            this.posLesson += 1;            
            this.lesson = this.lessons[this.posLesson]; 
            this.resources = this.lessons.resources;
            document.getElementById('description').innerHTML = this.lesson.description; 
            document.getElementById('resource').innerHTML = '';
            this.getQuestions(); 
        },
        previous: function(){
            this.posLesson -= 1;
            this.lesson = this.lessons[this.posLesson];
            this.resources = this.lessons.resources;
            document.getElementById('description').innerHTML = this.lesson.description; 
            document.getElementById('resource').innerHTML = '';
            this.getQuestions(); 
        },
        boton: function(usuario){
            console.log(usuario)
        },
        openReply: function(index, question){
            this.indexQuestion = index;
            this.question = question;
            this.displayReply = true;          
        },
        reply: function(){
            console.log(this.questions[this.indexQuestion])
            this.replyDialog.userId = localStorage.getItem('id');
            this.replyDialog.questionId = this.question.id;
            var temp = this.question
            this.qService.postReply(this.replyDialog).then(
                data=>{
                    if(this.questions[this.indexQuestion].replys == null)
                        setTimeout(() => this.questions[this.indexQuestion].replys = [data.data],500);
                    else this.questions[this.indexQuestion].replys = [ data.data, ...this.questions[this.indexQuestion].replys];
                }
            );
            this.displayReply = false;
            this.replyDialog = {};
            this.question = {};
        },
        publish: function(){
            this.qService.postQuestion(this.question, this.lesson.id).then(
                data => {
                    this.questions = [data.data, ...this.questions];
                }
            );
        },
        getQuestions: function(){
            this.qService.getQuestions(this.lesson.id).then(
                data => { 
                    data.data.forEach(element =>{
                        this.qService.getReplys(element.id).then(
                            replys=>{
                                element.replys = replys.data;
                            }
                        );
                    });
                    setTimeout(() => this.questions = data.data, 200);
                    
                }
            );
        },
        viewResource(resource){            
            if(resource.type == 'Imagen')
                document.getElementById('resource').innerHTML = '<img src="'+resource.link+'" alt="" width="500" height="333">'
            else
                document.getElementById("resource").innerHTML = 
                '<div class="iframe-container p-mt-4"> <iframe id="video" width="560" height="315" src="'+resource.link+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
        }

    }
}
</script>
<style>
    .iframe-container {
        overflow: hidden;
        padding-top: 56.25%; /* 16:9*/
        position: relative;
    }

    .iframe-container iframe {
        border: 0;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }
</style>