<template>
    <div>
    <topbar/>
    <mybar/>
    
    <header class="bg-dark text-center py-4 mb-4">
        <div class="container">
            <h1 class="font-weight-light text-white">Contactanos</h1>
        </div>
    </header>


    <div class="rounded-pill p-shadow-5 p-text-left p-text-italic" style="margin:2.5%; width: 95%; border-radius: 2%">
        <div class="p-text-left" style="margin-left:5%"> 
            <strong>Sergio:</strong>
            <p>Mi comentario es el siguiente ....</p><br/>
        </div>
    </div>


    </div>
</template>
<script>

import Mybar from '../components/Mybar.vue'


export default {
    name: 'contactus',
    components: {
        Mybar
    },
}
</script>
<style>
</style>