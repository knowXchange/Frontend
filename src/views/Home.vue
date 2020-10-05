<template>
  <div class="home">
    <!-- Titulo de la home page -->    
        <div style=" background-color:#adebad; width:auto; height:200px">
          <h1 style="background-color: rgb(173, 235, 173); position:absolute; top:10%; width:100%;  margin-bottom:0px; text-align: center;"> knowXchange </h1>
        </div>
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>
