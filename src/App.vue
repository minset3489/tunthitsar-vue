<template>
    <SiteNavi/>
    <router-view></router-view>
    <SiteFooter/>
</template>

<script >
import SiteNavi from './components/SiteNavi.vue'
import SiteFooter from './components/SiteFooter.vue';
export default {
  components: {SiteNavi, SiteFooter}


}

</script>

<style scoped>

</style>
