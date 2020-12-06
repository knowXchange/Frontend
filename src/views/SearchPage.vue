<template>
  <div class="search">
    <!-- Titulo de la home page -->    
        <div style=" background-color:#adebad; width:auto; height:100px">
          <h1 style="background-color: rgb(173, 235, 173); position:absolute; top:5%; width:100%;  margin-bottom:0px; text-align: center;"> knowXchange  </h1>
        </div>
        
        <div>
            <b-navbar toggleable="lg" type="dark" variant="dark">
                <b-navbar-brand href="#">Home</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item-dropdown text="Subject" right>
                        <b-dropdown-item href="#">Science</b-dropdown-item>
                        <b-dropdown-item href="#">Tecnology</b-dropdown-item>
                        <b-dropdown-item href="#">Linguistics</b-dropdown-item>
                        <b-dropdown-item href="#">Arts</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>
                </b-navbar-nav>
                
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    
                    <template #button-content>
                        <b-avatar></b-avatar>
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>

        <div class="overflow-auto">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>

          <p class="mt-3">Current Page: {{ currentPage }}</p>

          <b-table
            id="my-table"
            :items="items"
            :per-page="perPage"
            :current-page="currentPage"
            small
          ></b-table>
      </div>
      <div>
        <Carousel :key="cKey" :value="videos" :numVisible="numVideos" :numScroll="1">
          <template #item="slotProps">
            <div class="iframe-container p-mr-2">
              <iframe width="200" height="100" :src="slotProps.data" 
                frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                loading="lazy" allowfullscreen>  
              </iframe>
            </div>
            <div>
              <Button label="Remover" icon="pi pi-trash" class="p-button-success p-mr-2" @click="remove(slotProps.data)"/>
            </div>          
          </template>
        </Carousel>
      </div>
      <div class="p-mb-4">
        <InputText id="URL modificator" type="email" v-model="url"/>
        
        <Button label="Ver" icon="pi pi-check" class="p-button-success p-mr-2" @click="watch()"/>
        <Button label="Guardar" icon="pi pi-check" class="p-button-success p-mr-2" @click="modified()"/>
      </div> 
      <div>
        <iframe id="video" width="560" height="315" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div> 
    <router-view/>
  </div>
</template>

<script>
  export default {
    name : 'pruebas',
    data() {
      return {
        pos : 0,
        url: '',
        videos: [
          'https://img.freepik.com/vector-gratis/circulo-brillante-iluminacion-purpura-aislado-sobre-fondo-oscuro_1441-2396.jpg?size=626&ext=jpg',
          'https://www.youtube.com/embed/videoseries?list=PLo3pNg0eiPc9QucHWnf-msi4iZZksjwP5'
        ],
        numVideos : 0,
        perPage: 3,
        currentPage: 1,
        cKey:0,
        items: [
          { id: 1, first_name: 'Fred', last_name: 'Flintstone' },
          { id: 2, first_name: 'Wilma', last_name: 'Flintstone' },
          { id: 3, first_name: 'Barney', last_name: 'Rubble' },
          { id: 4, first_name: 'Betty', last_name: 'Rubble' },
          { id: 5, first_name: 'Pebbles', last_name: 'Flintstone' },
          { id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble' },
          { id: 7, first_name: 'The Great', last_name: 'Gazzoo' },
          { id: 8, first_name: 'Rockhead', last_name: 'Slate' },
          { id: 9, first_name: 'Pearl', last_name: 'Slaghoople' }
        ]
      }
    },
    computed: {
      rows() {
        return this.items.length
      }
    },
    beforeMount(){
      if(this.videos.length <= 3) this.numVideos = this.videos.length;
      else this.numVideos = 3;
    },
    methods:{
      next(){
        document.getElementById('frame').src = this.videos[this.pos + 1];
        this.pos += 1;       
      },
      previous(){
        document.getElementById('frame').src = this.videos[this.pos - 1];
        this.pos -= 1;
      },
      modified(){      
        this.url = this.url.replace('watch?v=','embed/').split("&")[0];
        document.getElementById('video').src = this.url;
        this.videos.push(this.url);
        this.setCarouselNum();
        this.url = "";
      },
      watch(){
        document.getElementById('video').src = this.url.replace('watch?v=','embed/').split("&")[0];
      },
      remove(item){
        console.log(item);
        this.videos = this.videos.filter(val =>val !== item);      
        this.setCarouselNum();
      },
      setCarouselNum(){        
        if(this.videos.length <=3) this.cKey += 1;
      }
    }
  }
</script>
<style>
  .iframe-container {
    overflow: hidden;
    padding-top: 56.25%; /* 16:9*/
    position: relative;
  }

  .iframe-container iframe {
    border: 0;
    height: 90%;
    left: 0;
    position: absolute;
    top: 0;
    width: 90%;
  }
</style>