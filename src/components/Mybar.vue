<template>
    <div>
    <topbar/>
    <Menubar :model="items" />
    </div>
</template>
<script>
import topbar from '../components/topbar'

export default {
    name: 'mybar',
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
                   label:'Información',
                   icon:'pi pi-fw pi-info-circle',
                   items:[
                      {
                         label: 'Sobre nosotros',
                         icon: 'pi pi-fw pi-users',
                         to: '/about'
                      },
                      {
                         label: 'Ayuda',
                         icon: 'pi pi-fw pi-question',
                         to: '/help'
                      },
                      {
                         label: 'Contactanos',
                         icon: 'pi pi-fw pi-envelope'
                      },
                   ]
                },
                {
                   label:'Cerrar Sesión',
                   icon:'pi pi-fw pi-sign-out',
                   to: '/login'
                }
             ]
        }
    }
    
}
</script>
<style>
</style>