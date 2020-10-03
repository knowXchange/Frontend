<template>
    <div>

        <!-- Titulo de la home page -->
        <div style=" background-color:#adebad; width:auto; height:200px">
            <h1 style="background-color: rgb(173, 235, 173); position:absolute; top:22%; width:100%;  margin-bottom:0px; text-align: center;">KnowXChange</h1>
        </div>
        
        <!-- Barra de navegacion responsive con "lg" -->
        <b-navbar  toggleable = "lg"  type = "dark"   style="background:linear-gradient(0deg,#f8f9fa 50%, #adebad 50%;" > 
            
            <b-container>                
                <div class="mx-auto">
                    <b-navbar  class="mx-auto">
                        <!-- Desplegable de cursos -->
                        <b-dropdown  style="margin:0px 20px 0px 20px; background:#f8f9fa;" id = "dropdown-left"  split 
                            split-variant = "outline-success" 
                            variant = "success" 
                            text = "Cursos" 
                            > 
                            <b-dropdown-item  href = "#" > Curso 1 </b-dropdown-item > 
                            <b-dropdown-item  href = "#" > Curso 2 </b-dropdown-item > 
                            <b-dropdown-item  href = "#" > Curso 3 </b-dropdown-item> 
                        </b-dropdown >
                        <!-- Barra de busqueda -->
                        <b-nav-form style="margin:0px 20px 0px 20px;">                            
                            <b-form-input class="mx-auto" placeholder="Search" style="border-color:green; background:#f8f9fa; color:#28a745;"></b-form-input>            
                        </b-nav-form>
                        
                        <!-- Boton de inicio de sesión -->
                        <b-button  variant = "outline-primary" style="background:#f8f9fa; border-color:green; color:#28a745; margin:0px 20px 0px 20px;"> Iniciar sesión </b-button >
                    </b-navbar>
                    
                </div>

            </b-container>
                
        </b-navbar> 

    </div>
    
</template>


<script>
export default {
    name : 'home'    
}
</script>


<style lang="stylus">

</style>