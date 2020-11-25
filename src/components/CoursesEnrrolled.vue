<template>
    <div>
        <div>
        </div>
        <div style="margin: 0 auto; width: 80%">
            <DataTable :value="courses" :paginator="true" :rows="10">
                <Column field="title" header="Curso"></Column>
                <Column :exportable="false">                
                    <template #body="slotProps">
                        <Button label="Ver Lecciones" class="p-button-raised p-button-text" @click="showLessons(slotProps.data)"/>
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
            <div class="p-mb-2 p-text-left">
                <strong> Zona de Preguntas</strong>
            </div>
            <div class="p-text-left">
                <InputText v-model="question.topic" id="topic" placeholder="Asunto" class="p-mb-2"/>
                <Textarea v-model="question.title" placeholder="Cual es tu pregunta?" rows="3" cols="30" style="width: 95%"/>
                <Button label='Publicar' class="p-button-rounded  p-button-success" @click="publish()"/>
            </div>
            <div style="margin-top: .5em">
                <transition-group name="dynamic-box" tag="div" class="p-jc-end">
                    <div v-for="col of questions" :key="col.id" class="p-col p-jc-end">
                        <div class="p-shadow-9 p-text-left p-mb-2">
                            <strong>{{col.asking_user.name}}</strong><br/>{{col.text}}<br/>
                        </div>  
                        <div style="margin-right:0;">                     
                            <Button label='Responder' class="p-button-rounded  p-button-success" @click="openReply(col)"/>  
                        </div>                        
                        <div style="margin-top: .5em">
                            <transition-group name="dynamic-box" tag="div">
                                <div v-for="ans of col.replys" :key="ans.id" class="p-col">
                                    <div class="p-shadow-7 p-text-left" style="margin-left:auto; margin-right:0; width: 95%">
                                        <strong>{{ans.user}}</strong><br/>{{ans.reply}}
                                    </div>
                                </div>
                            </transition-group>
                        </div>
                    </div>
                </transition-group>
            </div>              
        </Dialog>
        <Dialog :visible.sync="displayReply" :header.sync="question.topic" :modal="true" :style="{width: '80vw'}">
            {{question.text}}            
            <Textarea v-model="replyDialog.text" placeholder="Cual es tu respuesta" rows="3" cols="30" style="width: 95%"/>
            <Button label='Publicar' class="p-button-rounded  p-button-success" @click="reply()"/>
        </Dialog>
    </div>   
</template>
<script>   
import CoursesService from '../service/CoursesService' 
import QuestionService from '../service/QuestionService'
export default {
    name: 'CoursesEnrroled',
    data(){
        return{
            courseSelection: null,
            lessonSelection: null,
            courses: [],
            lessons:[],
            course:{},
            lesson:{},
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
                    topic: "",
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
    },
    mounted(){        
        this.coursesService.getEnrrolled(localStorage.getItem('id')).then(
            data=>{
                this.courses = data.data;
            }
        );
    },
    methods:{
        showLessons: function(course){
            this.course = course; 
            this.coursesService.getLessons(course.id).then(data=>{
                console.log(data.data)
                this.lessons = data.data
            });
            this.displayLessons = true;
        },
        openLesson: function(lesson){                         
            this.displayLessons = false;
            this.lesson = lesson;
            this.posLesson = this.lessons.findIndex(element=> element==lesson);
            this.displayLesson = true;
            this.qService.getQuestions(this.lesson.id).then(
                data => {                    
                    console.log(data.data);
                    this.questions = data.data;
                }
            );
            setTimeout(() => document.getElementById('description').innerHTML = this.lesson.description, 0);
            
        },
        next: function(){
            this.posLesson += 1;            
            this.lesson = this.lessons[this.posLesson]; 
            document.getElementById('description').innerHTML = this.lesson.description;           
        },
        previous: function(){
            this.posLesson -= 1;
            this.lesson = this.lessons[this.posLesson];
            document.getElementById('description').innerHTML = this.lesson.description;  
        },
        boton: function(usuario){
            console.log(usuario)
        },
        openReply: function(question){
            this.question = question;
            this.displayReply = true;          
        },
        reply: function(){
            this.replyDialog.userId = localStorage.getItem('id');
            this.replyDialog.questionId = this.question.id;
            this.qService.postReply(this.replyDialog);
        },
        publish: function(){
            this.question.id = this.questions.length;
            this.question.user = this.questions.length;
            this.questions = [...this.questions,this.question]; 
            this.qService.postQuestion(this.question, this.lesson.id).then(
                data => {
                    console.log(data)
                }
            );   
            this.question = {};
        }
    }
}
</script>