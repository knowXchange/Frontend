<template>
<div class="card" style="font-family: 'Segoe UI', Arial, sans-serif;">
    <topbar/>
    <div class="p-text-center p-mt-4" style="margin:0 auto; width: 25rem; margin-bottom: 2em">
        <Panel header='Registro de usuario'>  
            <div class="p-field p-fluid">          
                <h5 class="p-text-left">Nombre de Usuario</h5>
                <InputText id="username" type="text" v-model="user.name" @keydown.space.prevent/>
                <small id="username2-help" class="p-invalid" :hidden="huser">Falta nombre de usuario.</small>
            </div>
            <div class="p-field p-fluid">
                <h5 class="p-text-left">Correo electronico</h5>
                <InputText id="emailaddress" type="email" v-model="user.email"/>
                <small id="username2-help" class="p-invalid" :hidden="hemail">Falta correo electronico.</small>
            </div>
            <div class="p-field p-fluid">
                <h5 class="p-text-left">Descripcion</h5>
                <Textarea v-model="user.description" placeholder="Hola soy ..." :autoResize="true" rows="5" cols="30"/>
                <small id="username2-help" class="p-invalid" :hidden="hdescription">Falta descripcion</small>
            </div>
            <div class="p-field p-fluid">
                <h5 class="p-text-left">Contraseña</h5>
                <Password v-model="user.password" :feedback="true"/>
                <small id="username2-help" class="p-invalid" :hidden="hpassword">Falta contraseña</small>
            </div>
            <div class="p-field p-fluid">
                <h5 class="p-text-left">Confirmar contraseña</h5>
                <Password v-model="vpassword" :feedback="false"/>
                <small id="username2-help" class="p-invalid" :hidden="hvpassword">Las contraseñas no coinciden.</small>
            </div>            

            <h5></h5>
            <Button 
                label="Ya estas registrado?" 
                class="p-button-link" 
                @click="$router.push('login')">
            </Button>
            <h5></h5>
            
            <Button 
                label="Registrarse" 
                class="p-d-block p-mx-auto" 
                @click.native="VRegistro('as')"/>   
            <Dialog                 
                :visible.sync="display" 
                header='Atencion!!!'
                :v-text.sync="texto"
                :modal="true" 
                :style="{width:'50vw'}">                
                {{texto}}
            </Dialog>         
            <h5></h5>
        </Panel>
    </div>
    <router-view/>
</div>
</template>

<script>
import topbar from '../components/topbar'
import UserService from '../service/UserService' 
export default {
    name : 'Register',
    components: {
        topbar
    },
    data() {
        return {   
            items: [{
                label: 'Personal',
                to: '/register'
            },
            {
                label: 'Seat',
                to: '/steps/seat'
            }],
            Users : null,   
            user:{ 
                name: "",
                email: "",
                password: "",
                tocken: 100,
                description: null
            },  
            vpassword: "",   
            display: false,
            mensaje : "",
            texto : "",
            pass: "",
            huser: true,
            hemail: true,
            hdescription: true,
            hpassword: true,  
            hvpassword: true,
        }
    },  
    userService : null,
    created(){
        this.userService = new UserService();

    },    
    methods:{
        mostrar: function(texto){
            this.display = true, 
            this.texto = texto          
        },
        ocultar: function() {
            this.display = false
        },
        VRegistro: function(sg){
            if (this.user.name == "") this.huser = false
            else this.huser = true
            if (this.user.email=="") this.hemail = false
            else this.hemail = true
            if (this.user.description=="") this.hdescription = false
            else this.hdescription = true
            if (this.user.password== "") this.hpassword=false
            else this.hpassword=true
            if (this.vpassword == "" || this.user.password!=this.vpassword) this.hvpassword=false
            else this.hvpassword=true
            if (this.huser==true && this.hemail==true && this.hpassword==true && this.hvpassword==true && this.hdescription==true){
                this.userService.addUser(this.user).then(data => {
                    console.log(data);
                    if(data.request.status==201) this.mostrar("Registro exitoso");
                    else this.mostrar("Error en el registro")
                }).catch(error =>{
                    if( error.response.status === 400 ){
                        this.mostrar("El usuario ya existe")
                    }else{
                        this.mostrar( "Error en el servidor" );
                    }
                });               
            }                
        }
    }

}
</script>

<style>

</style>