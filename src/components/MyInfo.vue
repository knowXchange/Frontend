<template>
    <div>
        <div>
            
        </div>
        <div style="margin: 0 auto; width: 80%">            
            <Panel header='Mi Informacion'>  
                <div class="p-field p-fluid">          
                    <h5 class="p-text-left">Nombre de Usuario</h5>
                    <InputText id="username" type="text" v-model="user.name" disabled/>
                    <small id="username2-help" class="p-invalid" :hidden="huser">Falta nombre de usuario.</small>
                </div>
                <div class="p-field p-fluid">
                    <h5 class="p-text-left">Correo electronico</h5>
                    <InputText id="emailaddress" type="email" v-model="user.email"/>
                    <small id="username2-help" class="p-invalid" :hidden="hemail">Falta correo electronico.</small>
                </div>
                <div class="p-field p-fluid">
                    <h5 class="p-text-left">Descripcion</h5>
                    <Textarea v-model="user.description" :autoResize="true" rows="5" cols="30"/>
                    <small id="username2-help" class="p-invalid" :hidden="hdescription">Falta descripcion</small>
                </div>  
                <div class="p-text-right">
                    <Button label="Guardar" icon="pi pi-check" class="p-button-success p-mr-2" @click="save()"/>
                </div>                             
            </Panel>
            <Panel header='Cambiar contraseña'>
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
                <div class="p-text-right">
                    <Button label="Guardar" icon="pi pi-check" class="p-button-success p-mr-2" @click="savePassword()"/>
                </div>  
            </Panel>
            <Dialog                 
                :visible.sync="display" 
                header='Operacion Exitosa'
                :v-text.sync="text"
                :modal="true" 
                :style="{width:'50vw'}">          
                {{text}}
            </Dialog>
        </div>
    </div>   
</template>
<script>    
import UserService from '../service/UserService' 
export default {
    name: 'MyInfo',
    data(){
        return{
            user:{},
            vpassword:"",
            huser: true,
            hemail: true,
            hpassword: true,
            hvpassword:true,
            hdescription:true,   
            display:false,
            text: "",    
        }
    },
    created(){
        this.userService = new UserService();    
    },
    mounted(){
        
        this.userService.getUser(localStorage.getItem('id')).then(data => {
            console.log(data),
            this.user = data.data,
            this.user.password = ""
        })        
    },
    methods:{
        save: function(){
            if (this.user.name == "") this.huser = false
            else this.huser = true
            if (this.user.email=="") this.hemail = false
            else this.hemail = true    
            if (this.user.description=="") this.hdescription = false
            else this.hdescription = true        
            if (this.huser==true && this.hemail==true && this.hdescription==true){
                this.userService.updateUser(this.user).then(data=>{
                    console.log(data);
                    if(data.status === 200){
                        this.text = "Informacion Actualizada con Exito";
                        this.display = true;
                    }
                    else {
                        this.text="Error al actualizar la Informacion";
                        this.display = true;
                    }
                })                             
            }
            
        },
        savePassword: function(){
            if (this.user.password== "") this.hpassword=false
            else this.hpassword=true
            if (this.vpassword == "" || this.user.password!=this.vpassword) this.hvpassword=false
            else this.hvpassword=true
            if (this.hpassword==true && this.hvpassword==true){
                this.userService.updatePassword(this.user).then(data=>{
                    console.log(data);
                    if(data.status === 200){
                        this.text = "Contraseña Actualizada con Exito";
                        this.display = true;
                    }
                    else {
                        this.text="Error al actualizar la contraseña";
                        this.display = true;
                    }
                })                             
            }
        }
    }

}
</script>