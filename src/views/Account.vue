<template>
    <div>
    <topbar/>
    <TabMenu :model="items" />      
    <router-view/>
    </div>
</template>
<script>
import topbar from '../components/topbar'

export default {
    name: 'account',
    components: {
        topbar
    },
    data(){
        return {
                items: [
                    {label: 'Mi Perfil', icon: 'pi pi-fw pi-user', to: '/account/my-info'},
                    {label: 'Cursos', icon: 'pi pi-fw pi-folder', to: '/account/my-courses'},
                ]
            }
    }
    
}
</script>
<style>

</style>