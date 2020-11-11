<template>
<div>
    <div style=" background-color:#adebad; width:auto; height:100px">
        <h1 style="background-color: rgb(173, 235, 173); position:absolute; top:5%; width:100%;  margin-bottom:0px; text-align: center;"> knowXchange  </h1>
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
        <DataTable :value="curso" :paginator="true" :rows="10">           
            <Column field="title" header="Nombre del curso"></Column>
            <Column field="description" header="Descripción del curso"></Column>
        </DataTable>
    </div>
</div>
</template>

<script>
import SearchService from '../service/CoursesService';
  
    export default {
    
        name: 'Search',
        varSearchService : null,
        
        data() {        
            return {   
            cursosRama: null,         
            curso: null,
            id: null,
            entrada: null,
            items: [
                
                        //  label:'Buscar',
                        //  icon:'pi pi-fw pi-calendar-times',
                        //  items:[
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
                                        this.getAll();
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
            this.getAll();
        },
        methods:{
            getAll(){
                this.varSearchService.getAll().then(data => {
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
                    this.getAll();
                }
            }
        } 
    
}
</script>