<template>
  <div class="home">
    <!-- Titulo de la home page -->    
        <div style=" background-color:#adebad; width:auto; height:200px">
          <h1 style="background-color: rgb(173, 235, 173); position:absolute; top:10%; width:100%;  margin-bottom:0px; text-align: center;"> knowXchange </h1>
        </div>
    <Navbar/>
    <br>
    <Carousel :value="courses" :numVisible="2" :numScroll="1">
          <template #item="slotProps">
            <div>
                {{slotProps.data.title}}
            </div>
            <div>
                {{slotProps.data.description}}
            </div>
            <div>
                {{slotProps.data.puntuacion}}
            </div>
          </template>
        </Carousel>
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
  },
  data(){
      return{
          courses: [
                {
                    id:0,
                    title: "titulo",
                    description: "Descripcion",
                    puntuacion: 4
                },
                {
                    id:1,
                    title: "titulo2",
                    description: "Descripcion2",
                    puntuacion: 3
                }
            ]
      }
  }  
}
</script>

<style scoped>
 .p-component {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 1rem;
    font-weight: normal;
    margin-left: 30px;
}
</style>