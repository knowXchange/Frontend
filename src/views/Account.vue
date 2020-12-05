<template>
    <div>
    <mybar/>     
    <router-view/>
    </div>
</template>
<script>
import mybar from '../components/Mybar'


export default {
    name: 'account',
    components: {
        mybar
    }
}
</script>
<style>
</style>