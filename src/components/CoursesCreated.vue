<template>
    <div class="p-mb-4">
        <br class="p-mb-4"/>
        <div style="margin: 0 auto; width: 80%">
            <Toolbar class="p-mb-4">
                <template slot="left">
                    <Button label="Crear" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openCreate()" />                    
                </template>
            </Toolbar>            
            <DataTable ref="dt" :value="courses" :selection.sync="courseSelection" dataKey="id" :paginator="true" :rows="10">
                <Column field="title" header="Curso"></Column>
                <Column field="description" header="Descripcion"></Column>
                <Column :exportable="false">
                    <template  #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning" @click="editCourse(slotProps.data)"/>
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteCourse(slotProps.data)"/>
                            <Button label="Ver Lecciones" class="p-button-raised p-button-text" @click="showReviews(slotProps.data)"/>  
                    </template>
                </Column>
            </DataTable>
            <Dialog :visible.sync="displayCreate" header="Crear Curso" :modal="true" :style="{width: '90vw'}">
                <div class="p-field p-fluid">
                    <h5 class="p-text-left">Titulo del curso</h5>
                    <InputText id="titulo" type="titulo" v-model="course.title"/>                    
                    <small id="courseTitle-help" class="p-invalid" :hidden="htitle">Falta titulo.</small>
                </div>
                <div class="p-text-left p-mb-4">
                    <h5 >Costo en tokens</h5>
                    <InputNumber placeholder="Entre 0 y 100" id="tokens" v-model="course.tokensCost" :useGrouping="false" :min="0" :max="100"/>
                    <small id="tokens-help" class="p-invalid" :hidden="htokens">Escriba un valor</small>
                </div>
                <div class="p-mr-2 p-mb-2 p-text-left">
                    <h5>Clasifique el curso</h5>
                    <Dropdown v-model="selectedArea" :options="area" optionLabel="title" placeholder="Area" @change="searchBranch()" class="p-mr-2 p-mb-2"/>
                    <Dropdown v-model="selectedBranch" :options="branch" optionLabel="title" placeholder="Rama" class="p-mr-2"/>
                    <small id="courseFilter-help" class="p-invalid" :hidden="hfilter">Por favor clasifique el curso.</small>
                </div>
                
                <div class="p-field p-fluid">
                    <h5 class="p-text-left">Descripcion</h5>
                    <Textarea id="descripcion" type="descripcion" v-model="course.description"/>
                    <small id="courseDescription-help" class="p-invalid" :hidden="hdescription">Falta descripcion.</small>
                </div>                    
                <div>
                    <Button class="p-text-left p-mr-2 p-mb-4" label="Añadir Leccion" icon="pi pi-plus" @click="resetLessonFields() ;displayLesson = true"/>                        
                </div>  
                <small id="lessonTable-help" class="p-invalid" :hidden="hlessonTable">Agregue al menos una leccion</small>                  
                <DataTable ref="dt" :value="lessons" :selection.sync="courseSelection" :paginator="true" :rows="10">                
                    <Column field="title" header="Titulo"></Column>
                    <Column :exportable="false">
                        <template  #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning" @click="editLesson(slotProps.index,slotProps.data)"/>
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteLesson(slotProps.data)"/>                            
                        </template>
                    </Column>
                </DataTable> 
                <template #footer>
                    <Button :label.sync="BLabel" icon="pi pi-plus" class="p-button-success p-mr-2" @click="courseAction()" />
                    <Button label="Cancelar" icon="pi pi-ban" @click="closeCreate()"/>
                    </template>                
            </Dialog>                    
            <Dialog :visible.sync="displayLesson" header="Editor de Leccion" :modal="true" :style="{width: '90vw'}">
                <div class="p-field p-fluid p-text-left">                        
                    <h5>Titulo</h5>
                    <InputText id="LessonTitle" v-model="lesson.title"/>
                    <small id="lessonTitle-help" class="p-invalid" :hidden="hlessonTitle">Falta Titulo de la Leccion.</small>
                </div>
                <div class="p-field p-fluid p-text-left">
                    <h5>Descripcion</h5>
                    <Editor v-model="lesson.description" editorStyle="height: 320px"/>
                    <small id="lessonDescription-help" class="p-invalid" :hidden="hlessonDescription">Falta la descripcion de la leccion.</small>
                </div>
                <div class="p-mr-2 p-mb-2 p-text-left">
                    <h5>Añadir Recursos</h5><br/>
                    <div class="p-grid p-ml-2">
                        <div class="p-mr-4">
                            Tipo de Recurso
                            <div v-for="resource of resourcesType" :key="resource.id" class="p-field-checkbox">
                                <Checkbox :id="resource.id" name="resource" :value="resource.type" v-model="selectedResource" @change="checkedRs(resource.type)"/>
                                <label :for="resource.id">{{resource.type}}</label>
                            </div>
                        </div>
                        <div>
                            Fuente
                            <div v-for="sr of source" :key="sr.id" class="p-field-checkbox">
                                <Checkbox :id="sr.id" name="resource" :value="sr.source" v-model="selectedSource" @change="checkedSr(sr.source)" :disabled="selectedResource[0] != 'Video'"/>
                                <label :for="sr.id">{{sr.source}}</label>
                            </div>
                        </div>                                              
                    </div>
                    <DataTable class="p-mb-4" ref="dt" :value="resources" :paginator="true" :rows="10">                
                        <Column field="type" header="Tipo"></Column>
                        <Column header="Titulo">
                            <template #body="slotProps">
                                <div class="p-text-nowrap p-text-truncate" style="width: 10rem">{{slotProps.data.name}}</div>                               
                            </template>
                        </Column>
                        <Column header="URL">
                            <template #body="slotProps">
                                <div class="p-text-nowrap p-text-truncate" style="width: 10rem">{{slotProps.data.link}}</div>                               
                            </template>
                        </Column>
                        <Column :exportable="false">
                            <template #body="slotProps">
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteResourse(slotProps.data)"/>                                
                            </template>
                        </Column>
                    </DataTable>                                         
                    <InputText placeholder="Nombre" v-model="resource.name" class="p-mr-2"/>
                    <InputText placeholder="URL" v-model="resource.link" class="p-mr-2"/>
                    <Button label="Ver" class="p-button-rounded p-button-success" @click="preview()"/>
                    <Button label="Añadir" class="p-button-rounded p-button-success" @click="addRs()"/>
                    <div>
                        <small id="lessonTitle-help" class="p-invalid" :hidden="hResource">Seleccione el tipo de recurso</small>
                    </div>
                    <div class="iframe-container p-mt-4">
                        <iframe id="video" width="200" height="100" src="resource.link" 
                            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                            loading="lazy" allowfullscreen>  
                        </iframe>
                    </div>
                </div>                
                <template #footer>
                    <Button label="Guardar" class="p-button-rounded p-button-warning" @click="newLesson()"/>
                    <Button label="Cancelar" class="p-button-rounded p-button-danger" @click="displayLesson = false; resetLessonFields()"/>
                </template>
            </Dialog>
        </div>
        <br class="p-mb-4"/>
        <Dialog :visible.sync="displayReviews" :header.sync="course.title" :modal="true" :style="{width: '80vw'}">
            <Carousel :value="reseñas" :numVisible="1" :numScroll="1" verticalViewPortHeight="200px"
                style="max-width: auto; margin-top: 1em">           
                <template #item="slotProps">
                    <div class="product-item">
                        <div class="product-item-content">
                            <div>                                         
                                <h3>{{slotProps.data.opiningUser.name}}</h3>
                                <Rating :value="Math.round(slotProps.data.grade)" :readonly="true" :cancel="false" />
                                <h6 class="p-mt-0 p-mb-3">{{slotProps.data.description}}</h6>                   
                            </div>        
                        </div>
                    </div>
                </template>
            </Carousel>
            <DataTable ref="dt" :value="lessons" :paginator="true" :rows="10">
                <Column field="title" header="Lecciones"></Column>
                <Column :exportable="false">
                    <template  #body="slotProps">
                        <Button label="Ver Preguntas" class="p-button-raised p-button-text" @click="openQuestions(slotProps.data.id);"/>                              
                    </template>
                </Column>
            </DataTable>
        </Dialog>
        <Dialog :visible.sync="displayQuestions" header="Preguntas" :modal="true" :style="{width: '90vw'}">
            <transition-group name="dynamic-box" tag="div" class="p-jc-end">
                <div v-for="(col, index) of questions" :key="col.id" class="p-col p-jc-end">
                    <div class="p-shadow-9 p-text-left p-mb-2">
                        <strong>{{col.asking_user.name}}</strong><br/>{{col.text}}<br/>
                    </div>  
                    <div style="margin-right:0;">                     
                        <Button label='Responder' class="p-button-rounded  p-button-success" @click="openReply(index, col)" :disabled="col.id == 0"/>  
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
        </Dialog>
        <Dialog :visible.sync="displayReply" header='Publicar Respuesta' :modal="true" :style="{width: '80vw'}">
            {{question.text}}            
            <Textarea v-model="replyDialog.text" placeholder="Cual es tu respuesta" rows="3" cols="30" style="width: 95%"/>
            <Button label='Publicar' class="p-button-rounded  p-button-success" @click="reply()"/>
        </Dialog>
        <Dialog :visible.sync="displayDelete" header='Eliminar elemento' :modal="true" :style="{width: '80vw'}">
            ¿Desea eliminar el elemento?, esta accion es permanente.
            <template #footer>
                <Button label='Confirmar' class="p-button-rounded  p-button-danger" @click="deleteElement()"/>
                <Button label='Cancelar' class="p-button-rounded  p-button-success" @click="displayDelete = false"/>
            </template>
        </Dialog>
    </div>   
</template>
<script>    
import KBService from '../service/KBService' 
import CoursesService from '../service/CoursesService'
import QuestionService from '../service/QuestionService'
import ReviewService from '../service/ReviewService' 
export default {
    name: 'CoursesCreated',
    data(){
        return{
            reseñas:[],
            index: null,
            indexQuestion: null,
            selectedArea: null,
            area:[],
            selectedBranch: null,
            branch: [],
            courseSelection: null,
            displayCreate: false,
            displayLesson: false,
            displayReviews: false,
            displayQuestions: false,
            displayReply: false,
            displayDelete: false,
            targetDelete: null,
            courses: [],
            course:{}, 
            lessons:[],
            lesson:{},            
            resources:[],
            resource: {},
            htitle: true,
            htokens: true,
            hfilter: true,
            hdescription: true, 
            hlessonTitle: true,
            hlessonDescription: true,
            hlessonTable: true,    
            hResource: true,            
            BLabel: "Crear",            
            selectedResource: [],
            selectedSource: [],
            resourcesType:[
                {id:0, type: 'Video'},
                {id:1, type: 'Imagen'},
                {id:2, type: 'Documento'}
            ],
            source:[
                {id:0, source:'YouTube'},
                {id:1, source:'Google'}
            ],
            questions:[
                {
                    id: 0,
                    asking_user: {
                        name: ""
                    },
                    text: "",
                    replys:[]
                }

            ],
            question: {},
            replyDialog:{
                text: null,
            }
        }
    },
    kbService: null,
    coursesService: null,
    qService: null,
    created(){
        this.kbService = new KBService();
        this.coursesService = new CoursesService();
        this.qService = new QuestionService();
        this.ReviewService = new ReviewService();
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
            this.resetCourseFields();
            this.BLabel = "Crear";
            this.displayCreate=true;
        },
        closeCreate: function(){
            this.displayCreate=false;
            this.resetCourseFields();
        },
        createCourse: function(course, lessons){
            if(this.course.id == null){
                this.coursesService.addCourse(localStorage.getItem("id"),this.selectedBranch.id,course).then(data=>{
                    this.coursesService.addLessons(data.data,lessons);
                    this.course.id = data.data; 
                    this.courses.push(this.course);  
                    this.resetCourseFields();                                     
                });                                 
                this.displayCreate=false;                 
            }else{
                if(this.selectedBranch != null) course.fieldId == this.selectedBranch.id;
                this.coursesService.updateCourse(course).then(data=>{
                    if(data.request.status == 200){
                        this.coursesService.addLessons(course.id,lessons);
                    }else alert('Error al actulizar el  curso');                                     
                });                
                this.displayCreate=false;
                this.resetCourseFields();
            }                            
        },
        editCourse: function(course){
            this.course = course;
            this.coursesService.getLessons(course.id).then(data=>{
                this.lessons = data.data;
            });
            this.BLabel = "Actualizar";
            this.displayCreate = true;
        },
        updateCourse: function(course, lessons){
            if(this.selectedArea == null && this.selectedBranch == null)
                this.coursesService.updatePlain(course);
            else {
                this.Course.branchId = this.selectedBranch.id;
                this.coursesService.updateAll(course);
            }
            this.coursesService.addLessons(course.id, lessons);
            this.displayCreate = false;
        },
        deleteCourse: function(course){ 
            this.course = course;  
            this.targetDelete = 0;
            this.displayDelete = true;            
        },
        newLesson: function(){
            if(this.lesson.title == null || this.lesson.title=="")
                this.hlessonTitle = false;
            else this.hlessonTitle = true;
            if(this.lesson.description == null || this.lesson.description=="")
                this.hlessonDescription = false;
            else this.hlessonDescription = true;            
            if(this.hlessonTitle && this.hlessonDescription){
                this.lesson.resources = this.resources;
                if( this.index == null ){                    
                    this.lessons.push( this.lesson );
                }
                else{
                    this.lessons[this.index] = this.lesson;
                } 
                if(this.lessons.length == 0) this.hlessonTable = false;
                else this.hlessonTable = true;   
                this.displayLesson = false;       
                this.lesson = {};
                this.index = null;
            }
        },
        deleteLesson: function(lesson){
            this.lesson = lesson;
            this.targetDelete = 1;
            this.displayDelete = true;
        },
        editLesson: function(index, Lesson){
            this.resetLessonFields();
            this.index = index;
            this.lesson = Lesson;
            if(Lesson.id != null){
                this.coursesService.getResources(Lesson.id).then(
                    data =>{
                        this.resources = data.data;
                    }
                );
            }else{
                this.resources = this.lessons[index].resources;
            }
            this.displayLesson = true;
        },
        courseAction: function(){   
            if(this.course.title=="" || this.course.title == null)this.htitle=false;
            else this.htitle=true; 
            if(this.selectedArea == null || this.selectedBranch==null)
                this.hfilter = false;
            else this.hfilter = true;           
            if(this.course.description==null || this.course.description=="")this.hdescription=false;
            else this.hdescription=true;
            if(this.lessons.length == 0) this.hlessonTable = false;
            else this.hlessonTable = true;
            if(this.course.tokensCost == null) this.htokens = false;
            else this.htokens=true;
            if(this.htitle && this.hdescription && this.hlessonTable && this.htokens){                 
                this.createCourse(this.course, this.lessons);               
            }
        },
        checkedRs(resource){
            this.selectedResource = [resource]
        },
        checkedSr(source){
            this.selectedSource = [source]
        },
        addRs(){
            if(this.selectedResource[0] != null){
                this.hResource = true;
                if(this.selectedResource[0] == 'Video'){  
                    if(this.selectedSource[0] == 'YouTube') {  
                        this.resource.link = this.resource.link.replace('watch?v=','embed/').split("&")[0];
                        this.resource.type = this.selectedResource[0];
                        this.resources.push(this.resource);
                        this.resource = {};
                    }
                    else if(this.selectedSource[0] == 'Google'){
                        this.resource.link = this.resource.link.replace('view','preview');
                        this.resource.type = this.selectedResource[0];
                        this.resources.push(this.resource);
                        this.resource = {};
                    }
                    alert('Video Añadido')
                }
                else if(this.selectedResource[0] == 'Imagen'){      
                    this.resource.type = this.selectedResource[0];
                    this.resources.push(this.resource);
                    this.resource = {};
                    alert('Imagen Añadida');
                }
                else if(this.selectedResource[0] == 'Documento'){ 
                    this.resource.type = this.selectedResource[0];
                    this.resources.push(this.resource);
                    this.resource = {};
                    alert('Documento Añadido');               
                }
            }
            else this.hResource = false;
        },
        preview(){
            if(this.selectedResource[0] == 'Video'){  
                if(this.selectedSource[0] == 'YouTube') {  
                    this.resource.link = this.resource.link.replace('watch?v=','embed/').split("&")[0];                    
                    document.getElementById('video').src = this.resource.link;
                }
                else if(this.selectedSource[0] == 'Google'){
                        this.resource.link = this.resource.link.replace('view','preview');
                        document.getElementById('video').src = this.resource.link;
                    }
            }
            else if(this.selectedResource[0] == 'Imagen'){
                document.getElementById('video').src = this.resource.url;
            }
            else if(this.selectedResource[0] == 'Documento'){                
                document.getElementById('video').src = this.resource.url;                         
            }           

        },
        deleteResourse: function(resource){
            this.resource = resource;
            this.targetDelete = 3;
            this.displayDelete = true;            
        },        
        resetCourseFields: function(){            
            this.htitle = true;
            this.hfilter = true;
            this.hdescription= true;            
            this.hlessonTable= true;
            this.selectedArea = null;
            this.selectedBranch = null;
            this.course = {};
            this.lessons = []; 
            
        },
        resetLessonFields(){
            this.hlessonTitle= true;
            this.hlessonDescription= true;
            this.lesson = {};
            this.resources=[],
            this.resource={},
            this.selectedResource = [],
            this.selectedSource = [],
            this.hResource = true
        },
        showReviews: function(course){
            this.course = course; 
            this.ReviewService.getAllReseñas(this.course.id).then(data=>{
                this.reseñas = data.data;
                if(data.data.length == 0)
                this.reseñas=[{opiningUser:{name:'Aun no hay reseñas Para esta leccion'},grade:0,description:':('}];
            });            
            this.coursesService.getLessons(course.id).then(data=>{
                this.lessons = data.data
            });
            this.displayReviews = true;
        },
        openQuestions(id){
            this.qService.getQuestions(id).then(
                data => { 
                    data.data.forEach(element =>{
                        this.qService.getReplys(element.id).then(
                            replys=>{
                                element.replys = replys.data;
                            }
                        );
                    });
                    if(data.data.length == 0)
                        this.questions = [{
                            id: 0,
                            asking_user: {
                                name: "Aun no hay preguntas"
                            },
                            text: "",
                            replys:[]
                        }];
                    else setTimeout(() => this.questions = data.data, 200);
                }
            );
            this.displayQuestions = true;
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
                    else this.questions[this.indexQuestion].replys = [ ...this.questions[this.indexQuestion].replys, data.data ];
                }
            );
            this.displayReply = false;
            this.replyDialog = {};
            this.question = {};
        },
        deleteElement(){
            if(this.targetDelete == 0){
                this.coursesService.delete(this.course.id);
                this.courses = this.courses.filter(val =>val.id !== this.course.id);
            }else if(this.targetDelete == 1){
                if(this.course.id != null)
                    this.coursesService.deleteLesson(this.lesson.id);
                this.lessons = this.lessons.filter(val =>val !== this.lesson);
            }else if(this.targetDelete == 2){
                if(this.resource.id == null)
                    this.resources = this.resources.filter(val =>val !== this.resource);
                else{
                    this.coursesService.deleteResource(this.resource.id).then(data=>{
                        if(data.data == 'Deleted')
                            this.resources = this.resources.filter(val =>val !== this.resource);
                        else alert('La operacion no tuvo exito');
                    }).catch(error=>{
                        alert('error en el servidor')
                    });
                }
            }else alert('No se reconoce el elemento a eliminar');

            this.displayDelete = false;
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