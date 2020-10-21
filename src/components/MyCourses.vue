<template>
    <div>
    <TabMenu :model="items" />      
    <router-view/>
    </div>
</template>
<script>
export default {
    name: 'account',
    data(){
        return {
                items: [
                    {label: 'Cursos Inscritos', icon: 'pi pi-fw pi-folder', to: '/account/my-courses/courses-enrrolled'},
                    {label: 'Cursos Creados', icon: 'pi pi-fw pi-folder', to: '/account/my-courses/courses-created'},
                ]
            }
    }
    
}
</script>
<style>

</style>