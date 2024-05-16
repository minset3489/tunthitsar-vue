<template>
<section class="footer">
<div class="box-container">
    <div class="box capitalize">
        <h3>Quick Links</h3>

        <router-link v-for="link in links" :to="link.url" @click="scrollToTop">{{ link.name }}</router-link>

    </div>

    <div class="box">
        <h3>Content Info</h3>
        <a href="">+123-456-7890</a>
        <a href="">+111-222-333</a>
        <a href="">mahindra@steconenc.com</a>
        <a href="">weichai@steconenc.com</a>
        <a href="">Yangon, Myanmar - 11051</a>
    </div>

    <div class="box">
        <h3>Follow us</h3>
        <a href="">facebook</a>
        <a href="">twitter</a>
        <a href="">instagram</a>
        <a href="">linkedin</a>
    </div>
</div>

<div class="credit">copyright @ 2023 by <span>Tun Thit Sar Forwarding & Trading</span></div>
</section>

</template>

<script>
import { ref } from 'vue'

export default {
    

setup(){

    const links = ref([
            {name : 'home', url:'/'},
            {name : 'products', url:'/products/Mahindra'},
            {name : 'about', url:'/about'},
            {name : 'review', url:'/review'},
            {name : 'order', url:'/order'}
        ])

        const scrollToTop= () => {
        window.scrollTo(0, 0); // Scroll to the top of the document
        }

    return{links,scrollToTop}

}

}
</script>

<style lang="scss" scoped>

.footer .box-container{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18rem,1fr));
    gap: 1.5rem;
}

.footer .box-container .box{
    background-color:#f6f6f6;
    border-radius: 1rem;
    padding: 1rem;
}

.footer .box-container .box h3{
    padding: .5rem 0;
    font-size: 1.5rem;
    color:192a56;
    font-weight: bold;
    text-decoration: underline;
}

.footer .box-container .box a{
    display: block;
    padding: .5rem 0;
    font-size: 1rem;
    color: #666;
}

.footer .box-container .box a:hover{
    color: #27ae60;
    text-decoration: underline;
}

.footer .credit{
    text-align: center;
    border-top: .1rem solid rgba(0,0,0,.1);
    font-size: 1.2rem;
    color:192a56;
    padding: .5rem;
    padding-top: 1.5rem;
    margin-top: 1.5rem;
}

.footer .credit span{
    color: #27ae60;
}

</style>
