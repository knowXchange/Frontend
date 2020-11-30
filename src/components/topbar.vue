<template>
    <div id="Encabezado" class="layout-toplbar p-text-center p-shadow-2 p-p-4 p-grid p-jc-between">
        <div class="p-col-2">
        </div>
        <div class="p-col-6" >
            <router-link to="/"> KnowXChange </router-link>        
        </div>
        <div class="p-col-2">
        </div>        
    </div>    
</template>

<script>
export default {
    name : 'topbar',
    data(){
        return{
            labelButton:"Cerrar Sesion",
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