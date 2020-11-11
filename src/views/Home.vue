<template>
  <div class="home">
    <!-- Titulo de la home page -->    
        <div style=" background-color:#adebad; width:auto; height:200px">
          <h1 style="background-color: rgb(173, 235, 173); position:absolute; top:10%; width:100%;  margin-bottom:0px; text-align: center;"> knowXchange </h1>
        </div>
    <Navbar/>
    <br>
    <div style="display: flex">
      <Card style="width: 25em">
            <template slot="header">
                <img alt="user header" src="demo/images/usercard.png">
            </template>
            <template slot="title">
                Curso
            </template>
            <template slot="subtitle">
                Card subtitle
            </template>
            <template slot="content">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
            <template slot="footer">
                <Button icon="pi pi-check" label="Save" class="p-button-success" />
                <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
            </template>
        </Card>
        <Card style="width: 25em">
            <template slot="header">
                <img alt="user header" src="demo/images/usercard.png">
            </template>
            <template slot="title">
                Curso
            </template>
            <template slot="subtitle">
                Card subtitle
            </template>
            <template slot="content">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
            <template slot="footer">
                <Button icon="pi pi-check" label="Save" class="p-button-success"/>
                <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
            </template>
        </Card>
        <Card style="width: 25em">
            <template slot="header">
                <img alt="user header" src="demo/images/usercard.png">
            </template>
            <template slot="title">
                Curso
            </template>
            <template slot="subtitle">
                Card subtitle
            </template>
            <template slot="content">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
            <template slot="footer">
                <Button icon="pi pi-check" label="Save" class="p-button-success"/>
                <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
            </template>
        </Card>
      
    </div>
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

<style scoped>
 .p-component {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 1rem;
    font-weight: normal;
    margin-left: 30px;
}
</style>