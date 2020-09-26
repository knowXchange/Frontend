<template>
<div class="card" style="font-family: 'Segoe UI', Arial, sans-serif;">
    <div class="layout-toplbar p-text-center p-shadow-2 p-p-4" style="margin-bottom: 2em; font-size: 30px; background-color:rgba(60, 60, 60, 0.26)">KnowXChange 
        
    </div>
    <div class="p-text-center" style="margin:0 auto; width: 25rem; margin-bottom: 2em">
        
        
        <Panel header='Login'>            
            <h5>Usuario</h5>
            <span class="p-float-label" >
                <InputText id="username" type="text" v-model="value" class="p-mr-2 p-d-block"/>
                <label for="username">Username</label>
            </span>
            <h5>Contraseña</h5>       
            <Password v-model="value" />
            <h5></h5>
            <Button label="Recuperar Contraseña" class="p-button-link" />
            <h5></h5>
            <div class="demo-container p-p-4">
                <Button label="Iniciar Sesion" class="p-d-block p-mx-auto" />
            </div>           
            <h5></h5>
            <Button label="Registrarse" />
        </Panel>
    </div>
</div>
</template>

<script>
export default {
    name : 'demo'
    
}
</script>

<style>

</style>