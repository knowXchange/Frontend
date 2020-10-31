<template>
    <div>
        <div>
        </div>
        <div style="margin: 0 auto; width: 80%">
            <Toolbar class="p-mb-4">
                <template slot="left">
                    <Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openCreate" />
                    
                </template>
            </Toolbar>
            
            <DataTable ref="dt" :value="courses" :selection.sync="courseSelection" dataKey="id" :paginator="true" :rows="10">
                
                <Column field="id" header="ID"></Column>
                <Column field="title" header="Curso"></Column>
                <Column field="description" header="Descripcion"></Column>
                <Column :exportable="false">
                    <template  #body="slotProps">
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteCourse(slotProps.data)"/>
                    </template>
                </Column>
            </DataTable>
            <Dialog :visible.sync="displayCreate" header="Crear Curso" :maximizable="true" :modal="true" >
                    <div class="p-field p-fluid">
                        <h5 class="p-text-left">Titulo del curso</h5>
                        <InputText id="titulo" type="titulo" v-model="Course.title"/>
                        <small id="username2-help" class="p-invalid" :hidden="htitle">Falta titulo.</small>
                    </div>
                    <div class="p-field p-fluid">
                        <h5 class="p-text-left">Descripcion</h5>
                        <Textarea id="descripcion" type="descripcion" v-model="Course.description"/>
                        <small id="username2-help" class="p-invalid" :hidden="hdescription">Falta descripcion.</small>
                    </div>
                    <div class="p-mr-2 p-mb-2">
                        <h5 class="p-text-center">Clasifique el curso</h5>
                        <Dropdown v-model="selectedArea" :options="area" optionLabel="title" placeholder="Area" @change="searchBranch()" class="p-mr-2 p-mb-2"/>
                        <Dropdown v-model="selectedBranch" :options="branch" optionLabel="title" placeholder="Rama" class="p-mr-2"/>
                    </div>
                    <div>
                        <Button label="Crear" icon="pi pi-plus" class="p-button-success p-mr-2" @click="createCourse()" />
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
            courseDT:{},
            htitle: true,
            hdescription: true,          
            courses: [],
            courses2: [],
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
            this.displayCreate=true
        },
        closeCreate: function(){
            this.displayCreate=false;
        },
        createCourse: function(){
            console.log(this.selectedArea);
            console.log(this.selectedBranch);
            if(this.Course.title=="")this.htitle=false;
            else this.htitle=true;
            if(this.Course.description=="")this.hdescription=false;
            else this.hdescription=true;
            if(this.htitle==true && this.hdescription==true && this.selectedBranch!=null){                
                this.Course.branchId = this.selectedBranch.id;
                this.coursesService.add(this.Course).then(data=>{
                    console.log(data)
                });
                this.displayCreate = false;
                this.activate();
                
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
        activate() {
            setTimeout(() => this.getCreated(), 100000);
        },
        deleteCourse: function(course){ 
            console.log(course)   
            this.courseDT=course;        
            this.coursesService.delete(course.id);
            this.courses = this.courses.filter(val =>val.id !== this.courseDT.id);
        }
    }    
}
</script>