<template>
<div>
    <div style=" background-color:#adebad; width:auto; height:100px">
        <h1 style="background-color: rgb(173, 235, 173); position:absolute; top:5%; width:100%;  margin-bottom:0px; text-align: center;"> <router-link to="/"> KnowXChange </router-link>  </h1>
    </div>
    <div>
        <Menubar :model="items">
            <template #end>
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText  type="text" v-model="entrada" />                    
                </span>   
                <Button label="Buscar"  class="p-button-rounded p-button-success" :style="{'margin-left': '0 .5em'}" @click="buscarSubcadena"/> 
            </template>
        </Menubar>
    </div>
    <div style="margin:0 auto; width: 80%" >
        <br>
        <Button label="Ver curso" icon="pi pi-external-link" @click="openMaximizable" /> 
        <DataTable :value="curso" :paginator="true" :rows="3" :selection.sync="idCursoSeleccion" selectionMode="single" dataKey="id">           
            
            <Column field="title" header="Nombre del curso"></Column>
            <Column field="description" header="Descripción del curso"></Column>
                   
        </DataTable>
        
        <Dialog header="" :visible.sync="displayMaximizable" :style="{width: '50vw'}" :maximizable="true" :modal="true">
            <p class="p-m-0"></p>
             <DataTable :value="curso" >
                <Column field="description" header="Descripción del curso"></Column>
                   
            </DataTable>    
            <template #footer>
                <Button label="Volver" icon="pi pi-times" @click="closeMaximizable" class="p-button-text"/>
                <Button label="Inscribirse" icon="pi pi-check" @click="closeMaximizable" autofocus />
            </template>
        </Dialog>        
    </div>
</div>
</template>

<script>
import SearchService from '../service/CoursesService';
import topbar from '../components/topbar'  
    
    export default {
    
        name: 'Search',
        varSearchService : null,
        
        components: {
            topbar
        },  

        data() {        
            return {   
            cursosRama: null,         
            curso: null,
            id: null,
            entrada: null,
            displayMaximizable: false,
            idCursoSeleccion: {
                id:null
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
        },
        mounted(){
            this.getAllCourses();
        },
        methods:{
            getAllCourses(){
                this.varSearchService.getAllCourses().then(data => {
                    this.curso = data.data;
                    console.log(this.curso);
                });
            },
            buscarRama(numero){
                this.varSearchService.getByBranch(numero).then(data => {
                    this.curso = data.data;
                    console.log(this.curso);           
                });
                
            },
            buscarSubcadena(){
                if (this.entrada != null && this.entrada != ""){
                this.varSearchService.getByWord(this.entrada).then(data => {
                    this.curso = data.data;
                    console.log(this.curso);           
                });
                }
                else {
                    this.getAllCourses();
                }
            },
            openMaximizable() {
                this.displayMaximizable = true;
                console.log(this.idCursoSeleccion.id);
                this.buscarIdCurso(this.idCursoSeleccion.id);
            },
            closeMaximizable() {
                this.displayMaximizable = false;
                this.getAllCourses();
            },
            buscarIdCurso(idCurso){
                this.varSearchService.getCourseById(idCurso).then(data => {
                    this.curso = data.data;
                    console.log(this.curso);           
                });
            }
            
        } 
    
}
</script>