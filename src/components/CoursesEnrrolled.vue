<template>
    <div>
        <div>
        </div>
        <div style="margin: 0 auto; width: 80%">
            <DataTable :value="courses" :selection="courseSelection" dataKey="id" :paginator="true" :rows="10">
                <Column field="title" header="Curso"></Column>
                <Column :exportable="false">                
                    <template #body="slotProps">
                        <Button label="Ver Lecciones" class="p-button-raised p-button-text" @click="showLessons(slotProps.data)"/>
                    </template>
                </Column>
            </DataTable>
        </div>
        <Dialog :visible.sync="displayLessons" :header.sync="course.title" :modal="true" :style="{width: '80vw'}">
            <DataTable ref="dt" :value="lessons" :selection.sync="lessonSelection" dataKey="id" :paginator="true" :rows="10">
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
            :style="{width: '100vw'}">
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
                Comentarios preguntas y/o respuestas de la leccion
            </div>              
        </Dialog>
    </div>   
</template>
<script>   
import CoursesService from '../service/CoursesService' 
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
            posLesson: 0,
        }
    },
    kbService: null,
    coursesService: null,
    created(){
        this.coursesService = new CoursesService();
    },
    mounted(){        
        this.coursesService.getCreated().then(
            data=>{
                this.courses = data.data;
            }
        );
    },
    methods:{
        showLessons: function(course){
            this.course = course;
            this.course.title = 'Curso: ' + this.course.title;  
            this.coursesService.getLessons(course.id).then(data=>{
                this.lessons = data.data
            });
            this.displayLessons = true;
        },
        openLesson: function(lesson){                         
            this.displayLessons = false;
            this.lesson = lesson;
            this.posLesson = this.lessons.findIndex(element=> element==lesson);
            this.displayLesson = true;
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
        }


    }

}
</script>