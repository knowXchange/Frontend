<template>
    
</template>


<script>
import PersonaService from '../service/PersonaService'
// Carecteristicas del componente
export default {
    name : 'home',
    data () {
        return{

            personas : null //tabla del back llamada personas
        }
    },
    personaService : null, //Esta global para poderlo instanciar
    created() { // Metodo del ciclo de vida
        this.personaService = new PersonaService();

    },
    mounted (){ //Metodo para cuando el componente ya fue montado
        this.personaService.getAll().then(data =>{
            console.log(data);
        })
    }


    
}
</script>

<style lang="stylus">

</style>