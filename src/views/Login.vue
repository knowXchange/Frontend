<template>
<div class="card" style="font-family: 'Segoe UI', Arial, sans-serif;">
    <topbar/>
    <div class="p-text-center p-mt-4" style="margin:0 auto; width: 25rem; margin-bottom: 2em">
        
        
        <Panel header='Inicio de sesion'>            
            <h5>Usuario</h5>
            <InputText id="username" type="text" v-model="User.name"/>
            <h5>Contraseña</h5>       
            <Password v-model="User.password" v-bind:feedback="false"/>
            <h5></h5>
            <Button 
                label="Iniciar Sesion" 
                class="p-d-block p-mx-auto" 
                @click.native="SingIn()"/>   
            <Dialog                 
                :visible.sync="display" 
                header="Alerta!"
                :modal="true" 
                :style="{width:'50vw'}">                
                {{texto}}
            </Dialog>         
            <h5></h5>
            <Button label="Registrarse" @click="$router.push('register')"/>
        </Panel>
        <router-view/>
    </div>
</div>
</template>

<script>
import UserService from '../service/UserService' 
import topbar from '../components/topbar'
export default {
    name : 'login',
    components: {
        topbar
    },
    data() {
        return {
            User:{
                name: null,
                password: null
            },    
            display: false,
            texto: null
        }
    },  
    userService : null,
    created(){
        this.userService = new UserService();

    },
    methods:{
        mostrar: function(texto){
            this.display = true, 
            this.mensaje = texto, 
            this.texto = texto          
        },
        ocultar: function() {
            this.display = false
        },
        SingIn: function(){
            this.userService.login(this.User).then(data=>{
                console.log(data);
                if(data.request.status === 200){
                    localStorage.setItem('id',data.data),
                    this.$router.push('Account/my-info')
                }
                else{
                    this.mostrar("Error al iniciar sesion");
                }
            }).catch( error => {
                if(error.response.status === 400) 
                    this.mostrar("Usuario no encontrado");
                else this.mostrar("Error en el Servidor");
                });
        }

    }

}
</script>

<style>
</style>