<template>
<div>
    <div style=" background-color:#adebad; width:auto; height:100px">
        <h1 style="background-color: rgb(173, 235, 173); position:absolute; top:5%; width:100%;  margin-bottom:0px; text-align: center;"> <router-link to="/"> KnowXChange </router-link>  </h1>
    </div>
    <div>
        <Menubar >
            <template #start :style="{'margin':auto}">
                Filtro:
                <Dropdown @change ="buscarRama" v-model="selectedArea" :options="area" optionLabel="title" placeholder="Area"  class="p-mr-2"/>
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText  type="text" v-model="entrada" />                    
                </span>   
                <Button label="Buscar"  class="p-button-rounded p-button-success" :style="{'margin-left': '0 .5em'}" @click="buscarSubcadena"/> 
            </template>
            <template #end :style="{'margin':auto}">
                <!-- Boton de inicio de sesión -->
                    <Button :label.sync="buttonLabelA" style="background:#f8f9fa;" class="p-button-outlined p-button-success p-mr-2" @click="actionA()"/>
                <!-- Boton para registrarse o cerrar sesion -->
                    <Button :label.sync="buttonLabelB" style="background:#f8f9fa;" class="p-button-outlined p-button-success" @click="actionB()"/>
            </template>
        </Menubar>   
    </div>
    <div style="margin:0 auto; width: 80%" >
        <br>
        <DataTable :value="curso" :paginator="true" :rows="3" :selection.sync="idCursoSeleccion" dataKey="id">           
            
            <Column field="title" header="Nombre del curso"></Column>
            <Column field="description" header="Descripción del curso"></Column>
            <Column :exportable="false">
                <template  #body="slotProps">
                    <Button label="Ver curso" icon="pi pi-external-link" @click="openMaximizable(slotProps.data)" />
                </template>
            </Column>
                   
        </DataTable>           
            
            <Dialog :header.sync="course.title" :visible.sync="displayMaximizable" :style="{width: '50vw'}" :maximizable="true" :modal="true">
                <p class="p-m-0"></p>
                <div class="p-text-left">
                    <h5>Descripcion del curso</h5>
                    {{course.description}}
                </div>  
                <div>
                    <h5>Cantidad de Clases: {{lessons.length}}</h5>
                    <DataTable ref="dt" :value="lessons" :paginator="true" :rows="10">                
                        <Column field="title" header="Titulo"></Column>  
                    </DataTable> 
                </div>  
                <template #footer>
                    <Button label="Volver" icon="pi pi-times" @click="closeMaximizable" class="p-button-text"/>
                    <Button label="Inscribirse" icon="pi pi-check" @click="inscribir()" autofocus />
                </template>
            </Dialog> 
            <Dialog :header.sync="message.title" :visible.sync="message.display" :style="{width: '50vw'}" :modal="true">
                {{message.content}}
            </Dialog>       
        </div>
    </div>
</template>

<script>
import SearchService from '../service/CoursesService';
import topbar from '../components/topbar' 
import UserService from '../service/UserService' 
import KBService from '../service/KBService'   
    export default {
    
        name: 'Search',
        varSearchService : null,
        userService: null,
        kbService: null,
        components: {
            topbar
        },  

        data() {        
            return {
            selectedArea: null,
            area:[],
            selectedBranch: null,
            branch: [],       
            cursosRama: null,         
            curso: null,
            course: {},
            lessons:[],
            id: null,
            entrada: null,
            displayMaximizable: false,
            idCursoSeleccion: {
                id:null
            },
            message: {
                title:'',
                display: false,
                content: '',
            },
            items: [
                {
                    label:'Filtrar',
                    icon:'pi pi-fw pi-filter',
                    items:[
                        {
                            label:'Area de Ciencia',
                            icon:'pi pi-fw pi-apple',
                            command: () => {
                             this.buscarRama(1);
                            }
                        },
                        {
                         label:'Area de Tecnologia',
                         icon:'pi pi-fw pi-android',
                         command: () => {
                            this.buscarRama(2);
                         }
                         },
                        {
                         label:'Mostrar todos',
                         icon:'pi pi-fw pi-undo',
                         command: () => {
                            this.getAllCourses();
                         }
                        }

                     ]
                }
            ],
            buttonLabelA: "",
            buttonLabelB: "",
            }       
             
        }, 

        created() {
            this.varSearchService = new SearchService(); 
            this.userService = new UserService();
            this.kbService = new KBService();
            if(localStorage.getItem('id')==0){
                this.buttonLabelA = "Iniciar Sesion";
                this.buttonLabelB = "Registrarse";
            }
            else{
                this.userService.getUser(localStorage.getItem('id')).then(data => {
                    console.log(data),
                    this.buttonLabelA = "Perfil de "+ data.data.name
                });
                this.buttonLabelB = "Cerrar Sesion";         
            }
        },
        mounted(){
            this.getAllCourses();
            this.kbService.getAllK().then(data => {
                this.area = data.data;
            })
            this.kbService.getBbyK().then(data=>{
                 this.branch = data.data;
            })
        },
        methods:{
            actionA: function(){
                if(localStorage.getItem('id')==0){
                    this.$router.push('login')
                }else this.$router.push('account/my-info')
            },
            actionB: function(){
                if(localStorage.getItem('id')==0){
                    this.$router.push('register')
                }
                else{
                    localStorage.setItem('id',0);
                    location.reload();
                }
            },
            searchBranch: function(){
                this.kbService.getBbyK(this.selectedArea.title).then(data=>{
                    this.branch = data.data;
                });
            },
            getAllCourses(){
                this.varSearchService.getAllCourses().then(data => {
                    this.curso = data.data;
                });
            },
            buscarRama(){
                this.varSearchService.getByBranch(this.selectedArea.id).then(data => {
                    this.curso = data.data;           
                });
                
            },
            buscarSubcadena(){
                if (this.entrada != null){
                        this.varSearchService.getByWord(this.entrada).then(data => {
                        this.curso = data.data;           
                    });
                }
                else {
                    this.getAllCourses();
                }
            },
            openMaximizable(course) {
                this.course = course;
                this.varSearchService.getLessons(course.id).then(data=>{
                    this.lessons = data.data
                });
                this.displayMaximizable = true;                
            },
            closeMaximizable() {
                this.displayMaximizable = false;
                this.getAllCourses();
            },
            buscarIdCurso(idCurso){
                this.varSearchService.getCourseById(idCurso).then(data => {
                    this.curso = data.data;         
                });
            },
            inscribir: function(){
                if(localStorage.getItem('id')!=0)
                    this.userService.registerCourse(localStorage.getItem('id'),this.course.id)
                    .then(data=>{
                        console.log(data);
                        if (data.status === 200){
                            this.message.title = 'Inscripcion Exitosa';
                            this.message.content = 'La inscripcion al curso fue exitosa, podras encontrar el curso en tu perfil >> cursos >> cursos inscritos'
                            this.message.display=true;
                        }
                        else{
                            this.message.title = 'Inscripcion Fallida';
                            this.message.content = 'La inscripcion al curso no fue exitosa';
                            this.message.display=true;
                        }
                    });          
            }
            
        } 
    
}
</script>