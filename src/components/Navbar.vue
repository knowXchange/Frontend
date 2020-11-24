<template>
 <!-- Barra de navegacion responsive con "lg" -->
    <b-navbar toggleable = "lg"  type = "dark"   style="background:linear-gradient(0deg,#f8f9fa 50%, #adebad 50%;" > 
        
            
            <b-container>                
                <div class="mx-auto">
                    <b-navbar id="navBar" class="mx-auto">
                        <!-- Desplegable de cursos -->
                        <!-- <b-dropdown  style="margin:0px 20px 0px 20px; background:#f8f9fa;" id = "dropdown-left"  split 
                            split-variant = "outline-success" 
                            variant = "success" 
                            text = "Cursos" 
                            > 
                            <b-dropdown-item  href = "#" > Curso 1 </b-dropdown-item > 
                            <b-dropdown-item  href = "#" > Curso 2 </b-dropdown-item > 
                            <b-dropdown-item  href = "#" > Curso 3 </b-dropdown-item> 
                        </b-dropdown > -->
                        <Button label="Buscar Cursos"  class="p-button-rounded p-button-success" :style="{'margin-left': '0 .5em'}" @click="irBuscar"/>
                        <!-- Barra de busqueda -->
                        <b-nav-form style="margin:0px 20px 0px 20px;">                            
                            <b-form-input class="mx-auto" placeholder="Search" style="border-color:green; background:#f8f9fa; color:#28a745;"></b-form-input>            
                        </b-nav-form>
                        
                        <!-- Boton de inicio de sesión -->
                        <Button :label.sync="buttonLabelA" style="background:#f8f9fa;" class="p-button-outlined p-button-success p-mr-2" @click="actionA()"/>
                        <!-- Boton para registrarse o cerrar sesion -->
                        <Button :label.sync="buttonLabelB" style="background:#f8f9fa;" class="p-button-outlined p-button-success" @click="actionB()"/>

                    </b-navbar>
                    <!-- importa la ruta de login para el boton de inicio de sesión -->
                    <router-view/>    
                </div>

            </b-container>
                
        </b-navbar>
</template>


<script>
import SearchService from '../service/CoursesService';
import UserService from '../service/UserService';
export default {
    name : 'Navbar',
    varSearchService : null,
    userService: null,
    data() {        
            return {      
            curso: null,
            id: null,
            entrada: null,
            buttonLabelA: "",
            buttonLabelB: "",
            }
    },
    created() {
            this.varSearchService = new SearchService(); 
            this.userService = new UserService();
            if(localStorage.getItem('id')==0){
                this.buttonLabelA = "Iniciar Sesion";
                this.buttonLabelB = "Registrarse";
            }
            else{
                this.userService.getUser(localStorage.getItem('id')).then(data => {
                    console.log(data),
                    this.buttonLabelA = "Hola "+ data.data.name
                });
                this.buttonLabelB = "Cerrar Sesion";         
            }
        },
    beforeMount(){
    },
    mounted(){
    },
    methods:{
        actionA: function(){
            if(localStorage.getItem('id')==0){
                this.$router.push('login')
            }
            else this.$router.push('account/my-info')
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
        irBuscar(){
            this.$router.push('search')
        }
    }

}
</script>