<template>
    <div>
    <topbar/>
    <Menubar :model="items" />      
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
                {
                   label:'Home',
                   icon:'pi pi-fw pi-home',
                   to: "/",
                },
                {
                   label:'Usuario',
                   icon:'pi pi-fw pi-user',
                   items:[
                      {
                         label:'Mis cursos',
                         icon:'pi pi-fw pi-star-o',
                         to: "/account/my-courses"

                      },
                      {
                         label:'Editar Info',
                         icon:'pi pi-fw pi-user-edit',
                         to: "/account/my-info"
                      },
                      {
                         label:'Buscar curso',
                         icon:'pi pi-fw pi-search',
                         to: "/search"
                      },
                   ]
                },
                {
                   label:'Cerrar Sesión',
                   icon:'pi pi-fw pi-sign-out',
                   to: "/login"
                }
             ]
        }
    }
    
}
</script>
<style>
</style>