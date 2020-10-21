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
                    <InputText id="emailaddress" type="email" v-model="user.email" disabled/>
                    <small id="username2-help" class="p-invalid" :hidden="hemail">Falta correo electronico.</small>
                </div>
                <div class="p-field p-fluid">
                    <h5 class="p-text-left">Descripcion</h5>
                    <Textarea v-model="user.description" :autoResize="true" rows="5" cols="30" disabled/>
                    <small id="username2-help" class="p-invalid" :hidden="hdescription">Falta descripcion</small>
                </div>
                               
            </Panel>
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
            user2:{},
            vpassword:"",
            huser: true,
            hemail: true,
            hpassword: true,
            hvpassword:true,
            hdescription:true,   
            display:false,    
        }
    },
    created(){
        this.userService = new UserService();    
    },
    mounted(){
        
        this.userService.getUser(localStorage.getItem('id')).then(data => {
            console.log(data),
            this.user = data.data,
            this.user2 = data.data
        })        
    },
    methods:{
        save: function(){
            if (this.user.name == "") this.huser = false
            else this.huser = true
            if (this.user.email=="") this.hemail = false
            else this.hemail = true
            if (this.user.password== "") this.hpassword=false
            else this.hpassword=true
            if (this.vpassword == "" || this.user.password!=this.vpassword) this.hvpassword=false
            else this.hvpassword=true
            if (this.huser==true && this.hemail==true && this.hpassword==true && this.hvpassword==true){
                this.userService.updateUser(this.user).then(data=>{
                    console.log(data);
                })                             
            }
            
        }
    }

}
</script>