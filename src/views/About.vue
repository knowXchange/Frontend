
<template>
    <div>
    <topbar/>
    <mybar/>
    
    <header class="bg-dark text-center py-4 mb-4">
        <div class="container">
            <h1 class="font-weight-light text-white">Sobre nosotros</h1>
        </div>
    </header>

        <div class="container">
        <div class="row">
            <!-- Team Member 1 -->
            <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-0 shadow">
                <img src="../assets/santiago.jpg" class="card-img-top" alt="...">
                <div class="card-body text-center">
                <h5 class="card-title mb-0">Santiago Jesús Gómez Gil</h5>
                <div class="card-text text-black-50">Web Developer</div>
                </div>
            </div>
            </div>
            <!-- Team Member 2 -->
            <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-0 shadow">
                <img src="../assets/javier.jpg" class="card-img-top" alt="...">
                <div class="card-body text-center">
                <h5 class="card-title mb-0">Javier Alejandro Ortiz Silva</h5>
                <div class="card-text text-black-50">Web Developer</div>
                </div>
            </div>
            </div>
            <!-- Team Member 3 -->
            <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-0 shadow">
                <img src="../assets/david.jpg" class="card-img-top" alt="...">
                <div class="card-body text-center">
                <h5 class="card-title mb-0">David Sneider Ovalle Pineda</h5>
                <div class="card-text text-black-50">Web Developer</div>
                </div>
            </div>
            </div>
            <!-- Team Member 4 -->
            <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-0 shadow">
                <img src="https://source.unsplash.com/sNut2MqSmds/500x350" class="card-img-top" alt="...">
                <div class="card-body text-center">
                <h5 class="card-title mb-0">Juan Sebastián Reina Zamora</h5>
                <div class="card-text text-black-50">Web Developer</div>
                </div>
            </div>
            </div>

            <!-- Team Member 4 -->
            <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-0 shadow">
                <img src="../assets/sergio.jpg" class="card-img-top" alt="...">
                <div class="card-body text-center">
                <h5 class="card-title mb-0">Sergio Iván Sarmiento Beltrán</h5>
                <div class="card-text text-black-50">Web Developer</div>
                </div>
            </div>
            </div>
        </div>
    </div>


    </div>
</template>
<script>

import Mybar from '../components/Mybar.vue'

export default {
    name: 'about',
    components: {
        Mybar
    },
}
</script>
<style>
</style>