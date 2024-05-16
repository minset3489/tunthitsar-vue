<template>

<header>
    <div class="flex text-center items-center">
        <img src="../assets/TTS Logo.png" alt="">
        <a href="/" class="logo"> Tun Thit Sar </a>
    </div>
    <div>
        <nav :class="openLink ? 'active' : ''" class="navbar">
            <ul>
                <li v-for="link in links" :key="link.name" :class="{ 'linkActive': isActive(link.url) }">
                    <router-link :to="link.url" @click="scrollToTop, openLink = false">{{ link.name }}</router-link>
                </li>
            </ul>
        </nav>
        <nav  v-if="auth.user" :class="openLink ? 'active' : ''" class="navbar">
            <ul>
                <li v-for="link in adminlinks" :key="link.name">
                    <router-link :to="link.url" @click="scrollToTop">{{ link.name }}</router-link>
                </li>
            </ul>
        </nav>
    </div>
    <div v-if="auth.user">
        Logged in as {{ auth.user.email }}
        
        <button class="ml-2 btn"  @click="Logout"> Logout</button>
    </div>
    <div class="icons">
        <i @click="openLink = !openLink" :class="openLink ? 'fa-times' : 'fa-bars'" class="fas" id="menu-bars"></i>
    </div>

</header>

</template>
    
<script>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'


export default {

    setup(){
        let openLink= ref(false)
        const links = ref([
            {name : 'home', url:'/'},
            {name : 'products', url:'/products/Mahindra'},
            {name : 'about', url:'/about'},
            {name : 'review', url:'/review'},
            {name : 'order', url:'/order'}
        ])
        const adminlinks = ref([
            {name : 'home', url:'/dataImports/homedata'},
            {name : 'products', url:'/dataImports/create'},
            {name : 'About', url:'/dataImports/about'},
            {name : 'review', url:'/review'},
            {name : 'order', url:'/dataImports/orderdata'}
        ])

        const auth = useAuthStore()
        // Ensure auth state is initialized
        auth.initAuthState()

        const scrollToTop= () => {
        window.scrollTo(0, 0); // Scroll to the top of the document
        }

        const route = useRoute()

        const isActive = (url) => {
            return route.path === url
        }

        const router = useRouter()
        const Logout = async () => {
            await auth.signOut()
            router.push('/')
            scrollToTop()
        }

        return{scrollToTop, links,adminlinks,openLink,auth,isActive, Logout}
    }
    

}

</script>
    
<style>

header{
    position: fixed;
    top:0; left:0; right:0;
    background:#fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 1000;
    box-shadow: 0 .5rem 1.5rem rgba(0,0,0,.1);
    user-select: none;
}

header img{
    height: 5rem;
    margin: 5px;
    margin-right: 8px;
    
}



header .logo{
    color:#27ae60;
    font-size: 2rem;
    font-weight: bolder;
}


header .navbar ul{
    display: flex;
    cursor: pointer;
}


header .navbar li{
    font-size:1rem;
    border-radius: .5rem;
    padding:.5rem 1.5rem;
    color: #666;
    text-transform: capitalize;
}


header .navbar li.linkActive, header .navbar li:hover{
    color: #fff;
    background: #27ae60;
}


header .icons i,
header .icons a{
    cursor:pointer;
    margin-left: .5rem;
    height:3rem;width: 3rem;
    line-height:3rem;
    text-align: center;
    font-size: 1.2rem;
    color: #192a56;
    border-radius: 50%;
    background:#eee;
}


header .icons i:hover,
header .icons a:hover{
    color: #fff;
    background: #27ae60;
    transform: rotate(360deg);
}

header .icons #menu-bars{
    display: none;
}




@media (max-width:768px){

header .icons #menu-bars{
display: inline-block;
}

header .navbar{
    position: absolute;
    align-items: center;
    text-align: center;
    top:100%; left:0;right:0;
    background:#fff;
    border-top: .1rem solid rgba(0,0,0,.2);
    border-bottom: .1rem solid rgba(0,0,0,.2);
    padding:1rem;
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
}

header .navbar.active{
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}

header .navbar ul{
    display: block;
    font-size: 1rem; 
}

header .navbar li{
    margin: .5rem;
    padding: .5rem;
    background-color: #eee;
}



}



</style>