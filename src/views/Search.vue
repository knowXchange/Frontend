<template>
    <div style="background-color: rgb(230, 230, 230);">
        <topbar />
        <div>
            <Menubar >
                <template #start :style="{'margin':auto}">
                    Filtro:
                    <Dropdown @change ="buscarRama" v-model="selectedArea" :options="area" optionLabel="title" placeholder="Area"  class="p-mr-2 align-middle"/>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText class ="align-middle" type="text" v-model="entrada" />                    
                    </span>   
                    <Button label="Buscar"  class="p-button-rounded p-button-success p-ml-2" :style="{'margin-left': '0 .5em'}" @click="buscarSubcadena"/> 
                </template>
            </Menubar>   
        </div>
        <div style="margin:0 auto; width: 80%" >
            <br>
            <DataTable :value="curso" :paginator="true" :rows="3" :selection.sync="idCursoSeleccion" dataKey="id">           
                
                <Column field="title" header="Nombre del curso"></Column>
                <Column field="tokensCost" header="Costo en Tokens"></Column>
                <Column header="Puntuacion">
                    <template #body="slotProps">
                        <Rating :value="Math.round(slotProps.data.averageScore)" :readonly="true" :cancel="false" />
                    </template>
                </Column>
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
                    <br>
                    <div class="p-text-left">
                        <h5>Reseñas</h5>
                    </div>             
                       
                    <Carousel :value="reseñas" :numVisible="1" :numScroll="1" orientation="vertical" verticalViewPortHeight="200px"
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
import topbar from '../components/Mybar'
import UserService from '../service/UserService' 
import KBService from '../service/KBService'
import ReviewService from '../service/ReviewService'  
import Mybar from '../components/Mybar.vue';
import Topbar from '../components/topbar.vue';

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
            reseñas: [],
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
                ]
            }       
             
        }, 

        created() {
            this.varSearchService = new SearchService(); 
            this.userService = new UserService();
            this.kbService = new KBService();
            this.ReviewService = new ReviewService();
            
        },
        mounted(){
            
            this.getAllCourses();
            this.kbService.getAllK().then(data => {
                this.area = data.data;
            })
            this.kbService.getBbyK().then(data=>{
                 this.branch = data.data;
            })
            this.entrada = localStorage.getItem('text');
            this.buscarSubcadena();

            
        },
        methods:{
            obtenerReseñas(){
                this.ReviewService.getAllReseñas(this.course.id).then(data=>{
                    this.reseñas = data.data;
                    if(data.data.length == 0)
                        this.reseñas=[{opiningUser:{name:'Aun no hay reseñas Para esta leccion'},grade:0,description:':('}];
                });
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
                this.obtenerReseñas();                
                this.varSearchService.getLessons(course.id).then(data=>{
                    console.log(data);
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
                if(localStorage.getItem('id')==0 || localStorage.getItem('id')==null){
                    this.message.title = "Resultado de la operacion";
                    this.message.content = "Por favor inicie sesion antes de ralizar una inscripcion";
                    this.message.display=true;
                }
                else if(localStorage.getItem('id')!=0)
                    this.userService.registerCourse(localStorage.getItem('id'),this.course.id)
                    .then(data=>{
                        console.log(data);                        
                            this.message.title = "Resultado de la operacion";
                            this.message.content = data.data;
                            this.message.display=true;
                            if(data.data=='Registro exitoso :D')
                                this.message.content = data.data + ' Puedes encontrar el curso en Usuario >> mis cursos >> cursos inscritos';
                                setTimeout(() => location.reload(), 1000);                        
                    });          
            }
            
        } 
    
}
</script>