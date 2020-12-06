<template>
    <div>
    <topbar/>
    <Menubar :model="items">
      <template #end>

         <Button :label.sync="tokensLabel" icon="pi pi-money-bill" iconPos="right" class="p-button-text p-button-success p-mr-2" />
         
         <Button :label.sync="buttonLabelA" style="background:#f8f9fa;" class="p-button-outlined p-button-success p-mr-2" @click="actionA()"/>
         <!-- Boton para registrarse o cerrar sesion -->
         <Button :label.sync="buttonLabelB" style="background:#f8f9fa;" class="p-button-outlined p-button-success" @click="actionB()"/>
      </template>
    </Menubar>
    </div>
</template>
<script>
import topbar from '../components/topbar'
import SearchService from '../service/CoursesService';
import UserService from '../service/UserService';
export default {
    name: 'mybar',
    varSearchService : null,
    userService: null,
    components: {
        topbar
    },
    data(){
        return {
            user:{},
            buttonLabelA: "",
            buttonLabelB: "",
            tokensLabel: "",
            items: [
                {
                   label:'Home',
                   icon:'pi pi-fw pi-home',
                   to: "/",
                },
                {
                   label:'Usuario',
                   icon:'pi pi-fw pi-user',
                   items:[
                      {
                         label:'Mis cursos',
                         icon:'pi pi-fw pi-star-o',
                         to: "/account/my-courses"

                      },
                      {
                         label:'Editar Info',
                         icon:'pi pi-fw pi-user-edit',
                         to: "/account/my-info"
                      },
                      {
                         label:'Buscar curso',
                         icon:'pi pi-fw pi-search',
                         to: "/search"
                      },
                   ]
                },
                {
                   label:'Información',
                   icon:'pi pi-fw pi-info-circle',
                   items:[
                      {
                         label: 'Sobre nosotros',
                         icon: 'pi pi-fw pi-users',
                         to: '/about'
                      },
                      {
                         label: 'Ayuda',
                         icon: 'pi pi-fw pi-question',
                         to: '/help'
                      },
                      {
                         label: 'Contactanos',
                         icon: 'pi pi-fw pi-envelope'
                      },
                   ]
                }
             ]
        }
    },
    created() {
            this.varSearchService = new SearchService(); 
            this.userService = new UserService();
            if(localStorage.getItem('id')==0){
                this.buttonLabelA = "Iniciar Sesion";
                this.buttonLabelB = "Registrarse";
                this.tokensLabel = "0";
            }
            else{
                this.userService.getUser(localStorage.getItem('id')).then(data => {
                    console.log(data),
                    this.buttonLabelA = "Hola "+ data.data.name
                });
                this.buttonLabelB = "Cerrar Sesion";  
                this.tokensLabel = user.tokens;       
            }
        },
    beforeMount(){
    },
    mounted(){

        this.userService.getUser(localStorage.getItem('id')).then(data => {
            console.log(data),
            this.user = data.data,
            this.user.password = ""
        })
    },
    methods:{
        actionA: function(){
            if(localStorage.getItem('id')==0){
                this.$router.push({path:'/login'})
            }
            else this.$router.push({path:'/account/my-info'})
        },
        actionB: function(){
            if(localStorage.getItem('id')==0){
                this.$router.push({path:'/register'})
            }
            else{
                localStorage.setItem('id',0);
                location.reload();
            }
        },
    }
}
</script>
<style>
</style>