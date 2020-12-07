<template>
  <div class="home">
    <!-- Titulo de la home page -->    
        <div style=" background-color:#adebad; width:auto; height:200px">
          <h1 style="background-color: rgb(173, 235, 173); position:absolute; top:10%; width:100%;  margin-bottom:0px; text-align: center;"> knowXchange </h1>
        </div>
    <Navbar/>
    <br>
    

        <div class="card">
        <Carousel :value="courses" :numVisible="1" :numScroll="1">
           
           <template #item="slotProps">
               <div class="product-item">
                  <div class="product-item-content">
                        <div>
                          <h4 class="p-mb-1">{{slotProps.data.title}}</h4>
                          <h6 class="p-mt-0 p-mb-3">{{slotProps.data.description}}</h6>
                          <Rating :value="Math.round(slotProps.data.averageScore)" :readonly="true" :cancel="false" />
                          <div class="car-buttons p-mt-5">                             
                              <Button icon="pi pi-search" class="p-button p-button-rounded p-mr-2" @click="openMaximizable(slotProps.data)" />
                            
                          </div>
                      </div>
                  </div>
              </div>
          </template>
        </Carousel>
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
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import SearchService from '../service/CoursesService' 
import UserService from '../service/UserService' 
import KBService from '../service/KBService'


export default {
  name: 'Home',
  components: {
    Navbar
  },
  data(){
      return{
          message: {
                title:'',
                display: false,
                content: '',
            },
          lessons:[],
          displayMaximizable: false,
          course: {},
          curso: null,
          courses: []
      }
  },
    created() {
        this.varSearchService = new SearchService();
        this.userService = new UserService();
        this.kbService = new KBService();
    },
    mounted(){
        
        this.kbService.getAllK().then(data => {
            this.area = data.data;
        })
        this.kbService.getBbyK().then(data=>{
             this.branch = data.data;
        })
        this.varSearchService.getCourseRandom(10).then(data=>{
            this.courses = data.data;
        })

    }, 
    methods:{
        openMaximizable(course) {
                    this.course = course;
                    this.varSearchService.getLessons(course.id).then(data=>{
                        this.lessons = data.data
                    });
                    this.displayMaximizable = true;                
        },
        closeMaximizable() {
                    this.displayMaximizable = false;
                    
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
                    });       
        }
    } 
}
</script>

<style scoped>
 .p-component {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 1rem;
    font-weight: normal;
    margin-left: 30px;
}
</style>