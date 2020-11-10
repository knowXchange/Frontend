<template>
<div>
    <DataTable :value="curso" :paginator="true" :rows="10">
        <Column field="description" header="Descripción"></Column>
        <Column field="title" header="Nombre"></Column>
    </DataTable>
</div>
</template>

<script>
import SearchService from '../service/CoursesService';
  
    export default {
    
        name: 'Search',
        varSearchService : null,
        
        data() {        
            return {        
            curso: null,
            id: null   
            } 
        },  
        created() {
            this.varSearchService = new SearchService(); 
        },
        mounted(){
            this.getAll();
        },
        methods:{
            getAll(){
                this.varSearchService.getAll().then(data => {
                this.curso = data.data;
                console.log(this.curso);
                });
            }
        } 
    
}
</script>