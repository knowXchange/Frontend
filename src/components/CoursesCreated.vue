<template>
    <div>
        <div>
        </div>
        <div style="margin: 0 auto; width: 80%">
            <Toolbar class="p-mb-4">
                <template slot="left">
                    <Button label="Crear" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openCreate()" />
                    
                </template>
            </Toolbar>
            
            <DataTable ref="dt" :value="courses" :selection.sync="courseSelection" dataKey="id" :paginator="true" :rows="10">
                
                <Column field="id" header="ID"></Column>
                <Column field="title" header="Curso"></Column>
                <Column field="description" header="Descripcion"></Column>
                <Column :exportable="false">
                    <template  #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning" @click="editCourse(slotProps.data)"/>
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteCourse(slotProps.data)"/>
                    </template>
                </Column>
            </DataTable>
            <Dialog :visible.sync="displayCreate" header="Crear Curso" :modal="true" :style="{width: '90vw'}">
                    <div class="p-field p-fluid">
                        <h5 class="p-text-left">Titulo del curso</h5>
                        <InputText id="titulo" type="titulo" v-model="Course.title"/>
                        <small id="courseTitle-help" class="p-invalid" :hidden="htitle">Falta titulo.</small>
                    </div>
                    <div class="p-mr-2 p-mb-2 p-text-left">
                        <h5>Clasifique el curso</h5>
                        <Dropdown v-model="selectedArea" :options="area" optionLabel="title" placeholder="Area" @change="searchBranch()" class="p-mr-2 p-mb-2"/>
                        <Dropdown v-model="selectedBranch" :options="branch" optionLabel="title" placeholder="Rama" class="p-mr-2"/>
                        <small id="courseFilter-help" class="p-invalid" :hidden="hfilter">Por favor clasifique el curso.</small>
                    </div>
                    
                    <div class="p-field p-fluid">
                        <h5 class="p-text-left">Descripcion</h5>
                        <Textarea id="descripcion" type="descripcion" v-model="Course.description"/>
                        <small id="courseDescription-help" class="p-invalid" :hidden="hdescription">Falta descripcion.</small>
                    </div>
                    <h5>Añadir leccion</h5>
                    <div class="p-field p-fluid p-text-left">                        
                        <h5>Titulo</h5>
                        <InputText id="LessonTitle" v-model="lessonDT.title"/>
                        <small id="lessonTitle-help" class="p-invalid" :hidden="hlessonTitle">Falta Titulo de la Leccion.</small>
                    </div>
                    <div class="p-field p-fluid p-text-left">
                        <h5>Descripcion</h5>
                        <Editor v-model="lessonDT.description" editorStyle="height: 320px"/>
                        <small id="lessonDescription-help" class="p-invalid" :hidden="hlessonDescription">Falta la descripcion de la leccion.</small>
                    </div>
                    <div>
                        <Button class="p-text-left p-mr-2" label="Añadir Leccion" icon="pi pi-plus" @click="newLesson()"/>                        
                    </div>  
                    <small id="lessonTable-help" class="p-invalid" :hidden="hlessonTable">Agregue al menos una leccion</small>                  
                    <DataTable ref="dt" :value="lessons" :selection.sync="courseSelection" dataKey="id" :paginator="true" :rows="10">                
                        <Column field="id" header="ID"></Column>
                        <Column field="title" header="Titulo"></Column>
                        <Column :exportable="false">
                            <template  #body="slotProps">
                                <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning" @click="editLesson(slotProps.data)"/>
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteLesson(slotProps.data)"/>                                
                            </template>
                        </Column>
                    </DataTable> 
                                      
                    <div>
                        <Button :label.sync="BLabel" icon="pi pi-plus" class="p-button-success p-mr-2" @click="courseAction()" />
                        <Button label="Cancelar" icon="pi pi-ban" @click="closeCreate()"/>
                    </div>                
            </Dialog>
        </div>
    </div>   
</template>
<script>    
import KBService from '../service/KBService' 
import CoursesService from '../service/CoursesService'
export default {
    name: 'CoursesCreated',
    data(){
        return{
            selectedArea: null,
            area:[],
            selectedBranch: null,
            branch: [],
            courseSelection: null,
            displayCreate: false,
            Course:{
                title:"",
                description:"",
                tokens: 0,
                branchId:0
            }, 
            lessons:[],
            courseDT:{},
            lessonDT:{
                title: "",
                description:"",
            },
            htitle: true,
            hfilter: true,
            hdescription: true, 
            hlessonTitle: true,
            hlessonDescription: true,
            hlessonTable: true,         
            courses: [],
            BLabel: "Crear",
        }
    },
    kbService: null,
    coursesService: null,
    created(){
        this.kbService = new KBService();
        this.coursesService = new CoursesService();
    },
    mounted(){
        this.kbService.getAllK().then(data => {
            this.area = data.data;
        })
        this.kbService.getBbyK().then(data=>{
            this.branch = data.data;
        })
        this.coursesService.getCreated().then(
            data=>{
                console.log(data);
                this.courses = data.data;
            }
        );
    },
    methods:{
        searchBranch: function(){
            this.kbService.getBbyK(this.selectedArea.title).then(data=>{
                this.branch = data.data;
        })
        },
        openCreate: function(){
            this.Course = [];
            this.displayCreate=true;
        },
        closeCreate: function(){
            this.displayCreate=false;
        },
        createCourse: function(){
            console.log(this.selectedArea);
            console.log(this.selectedBranch);
            if(this.Course.title=="" || this.Course.title == null)this.htitle=false;
            else this.htitle=true;
            if(this.selectedArea == null || this.selectedBranch==null)
                this.hfilter = false;
            else this.hfilter = true;
            if(this.Course.description==null || this.Course.description=="")this.hdescription=false;
            else this.hdescription=true;
            if(this.lessons.length == 0) this.hlessonTable = false;
            else this.hlessonTable = true;
            if(this.htitle && this.hdescription && this.hlessonTitle && this.hlessonDescription && this.hlessonTable && this.selectedBranch!=null){                
                this.Course.branchId = this.selectedBranch.id;
                this.coursesService.add(this.Course).then(data=>{
                    this.coursesService.addLessons(data.data,this.lessons);
                });
                this.courses = [];
                this.getCreated();              
                this.displayCreate = false;                
            }
        },
        getCreated: function(){
            this.created=[];
            this.coursesService.getCreated().then(data=>{
                    console.log(data.data);
                    for (let index = 0; index < data.data.length; index++) {
                        console.log(data.data);
                       this.courses.push(data.data[index]);                    
                    }    
                });
        },
        editCourse: function(course){
            this.Course = course;
            this.coursesService.getLessons(course.id).then(data=>{
                this.lessons = data.data
            });
            this.BLabel = "Actualizar";
            this.displayCreate = true;
        },
        updateCourse: function(course){

        },
        deleteCourse: function(course){ 
            console.log(course)   
            this.courseDT=course;        
            this.coursesService.delete(course.id);
            this.courses = this.courses.filter(val =>val.id !== this.courseDT.id);
        },
        newLesson: function(){
            if(this.lessonDT.title == null || this.lessonDT.title=="")
                this.hlessonTitle = false;
            else this.hlessonTitle = true;
            if(this.lessonDT.description == null || this.lessonDT.description=="")
                this.hlessonDescription = false;
            else this.hlessonDescription = true;            
            if(this.hlessonTitle && this.hlessonDescription){
                if(this.lessonDT.id==null){
                    this.lessonDT.id = this.lessons.length + 1;
                    this.lessons.push(new Object(this.lessonDT));
                }
                else{
                    for (let index = 0; index < this.lessons.length; index++) {
                        if(this.lessons[index].id == this.lessonDT.id){
                            this.lessons[index] = this.lessonDT;
                            break;
                        }         
                    }
                } 
                if(this.lessons.length == 0) this.hlessonTable = false;
                else this.hlessonTable = true;          
                this.lessonDT = {};
            }
        },
        deleteLesson: function(lesson){ 
            console.log(lesson)   
            this.lessonDT=lesson;
            this.lessons = this.lessons.filter(val =>val.id !== this.lessonDT.id);
        },
        editLesson: function(Lesson){
            this.lessonDT = Lesson;
        },
        courseAction: function(){
            if(this.courseDT.id == null)
                this.createCourse(this.courseDT)
            else
                this.updateCourse(this.courseDT)
        }
    }    
}
</script>