<template>
<div class="card" style="font-family: 'Segoe UI', Arial, sans-serif;">
    <div id="Encabezado" class="layout-toplbar p-text-center p-shadow-2 p-p-4" >
        <router-link to="/"> KnowXChange </router-link>
        
    </div>
    <div class="p-text-center" style="margin:0 auto; width: 25rem; margin-bottom: 2em">
        
        
        <Panel header='Inicio de sesion'>            
            <h5>Usuario</h5>
            <InputText id="username" type="text" v-model="Usuario"/>
            <h5>Contraseña</h5>       
            <Password v-model="Contraseña" v-bind:feedback="false"/>
            <h5></h5>
            <Button 
                label="Recuperar Contraseña" 
                class="p-button-link" 
                @click.native="mostrar('Recuperar')">
            </Button>
            <h5></h5>
            <Button 
                label="Iniciar Sesion" 
                class="p-d-block p-mx-auto" 
                @click.native="mostrar('Iniciar sesion')"/>   
            <Dialog                 
                :visible.sync="display" 
                :header.sync="mensaje"
                :v-text.sync="texto"
                :modal="true" 
                :style="{width:'50vw'}">                
                Se presiono el boton {{texto}}
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
export default {
    name : 'login',
    data() {
        return {   
            Users : null,    
            Usuario: "",
            Contraseña: "",     
            display: false,
            mensaje : "",
            user : null,
            texto : ""
        }
    },  
    userService : null,
    created(){
        this.userService = new UserService();

    },
    mounted(){
        this.userService.getAll().then(data => {
            console.log(data);
        })
    },
    methods:{
        mostrar: function(texto){
            this.display = true, 
            this.mensaje = texto, 
            this.texto = texto          
        },
        ocultar: function() {
            this.display = false
        }
    }

}
</script>

<style>
#Encabezado{
    margin-bottom: 2em;
    font-size: 30px;
    background-color: #adebad;  
}
</style>