<template>
<div >

    <div class="forSwiper">
        <Swiper :modules="modules"
        :slides-per-view="1"
        :space-between="50"
        navigation
        :pagination="{ clickable: true }"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        :style="{ '--swiper-navigation-color': '#27ae60', '--swiper-pagination-color': '#27ae60' }"
        loop
        >
            <SwiperSlide v-for="(product, index) in slideProducts" :key="product.id">
                <div class="eachSlide">
                    <div class="content">
                        <span class="font-bold">{{product.title}}</span>
                        <h3>{{product.header}}</h3>
                        <p>{{product.description}}</p>
                        <router-link class="btn" to="/order" >order now</router-link>
                    </div>
                    <div class="image">
                        <img :src="product.homeSlideUrl" alt="">
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>



<section class="product" id="product">

<h3 class="sub-heading">our products</h3>
<h1 class="heading">popular products</h1>

<div class="box-container">
    <div class="box" v-for="product in popularProducts" :key="product.id">
        <router-link @click="scrollToTop" :to="{name : 'details', params : { id : product.id }}" class="fas fa-eye"></router-link>
        <router-link @click="scrollToTop" :to="{name : 'details', params : { id : product.id }}" class="fas fa-heart"></router-link>
        
        
        <img :src="product.productUrl" alt="">
        <h3>{{product.brand}} {{ product.capacity }}</h3>
        <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
        </div>
        <span>${{product.price}}</span>
        <router-link @click="scrollToTop" :to="{name : 'details', params : { id : product.id }}" class="btn">Details...</router-link>
    </div>
</div>

</section>

</div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useCollectionStore } from '../stores/collectionStore'

// Swiper
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y,Autoplay  } from 'swiper/modules';


// import CarouselContainer from '../components/CarouselContainer.vue'
// import SlideContent from '../components/SlideContent.vue'


export default {
    name: 'Home',
    components: {Swiper, SwiperSlide,  },

    setup(){
    
    const collectionStore = useCollectionStore()
    const error = ref(null)
    const sortField = ref('capacity')
    const sortDirection = ref('asc')

    const slideProducts = ref([])
    const slideCollection = async() => {
        await collectionStore.getCollection('homeSlider',{
            field: 'createdAt',
            direction: sortDirection.value
        })
        .catch((err) => {
            error.value = 'Could not fetch the data. ' + err.message;
        })
        slideProducts.value = collectionStore.documents
    }


    const popularProducts = ref([])
    const popularCollection = async() => {
        await collectionStore.getCollection('dieselGenerators',{
            field: sortField.value,
            direction: sortDirection.value,
            conditions: [{ field: 'isFav', operator: '==', value: true }]
        })
        .catch((err) => {
            error.value = 'Could not fetch the data. ' + err.message;
        })
        popularProducts.value = collectionStore.documents
    }

    // Fetch the collection when the component is mounted
    onMounted(() => {
        slideCollection()
        popularCollection()
    })

    // Watch for changes in the documents and reset the error
    watch(() => collectionStore.documents, () => {
        error.value = null;
    });

    const scrollToTop= () => {
    window.scrollTo(0, 0); // Scroll to the top of the document
    }

    const onSwiper = (swiper) => {
    console.log(swiper);
    };
    const onSlideChange = () => {
    console.log('slide change');
    };

    return{error, collectionStore, popularProducts, slideProducts, scrollToTop,
    onSwiper, onSlideChange, modules: [Navigation, Pagination, Scrollbar, A11y,Autoplay ],
     }
    }

}
</script>

<style lang="scss" scoped>

.forSwiper{
    padding-top: 6rem;
    user-select: none;
}
.swiper{
    width:100%;
    height: auto;
    align-items: center;
    text-align: center;
}

.swiper-sidle img{
    width: 100%;
}
.eachSlide{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap:2rem;
    padding:2rem 9%;
    .content{
    flex:1 1 24rem;

        span{
            color:#27ae60;
            font-size: 1.5rem;
        }

        h3{
            color:#192a56;
            font-size: 3rem;
            font-weight: bold;
        }

        p{
            color:#666;
            font-size: 1.2rem;
            text-align: justify;
            padding: .5rem 0;
            line-height: 1.5;
        }

    }   

    .image{
        flex:1 1 24rem;

        img{
            margin: 0 auto;
            overflow: hidden;
        }
    }

} 


@media (max-width:992px){

.swiper{
    height: 90vh;
    overflow: hidden;
}
.forSwiper {
    overflow: hidden;

    .eachSlide {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0;

        .content {
            flex: 1 1 30rem;
            font-size: 110%;
        }

    }
}
}


@media (max-width:768px){

.swiper{
    height: 88vh;
    overflow: hidden;
 
}

.forSwiper{
    padding-top: 8rem;
    overflow: hidden;
    .eachSlide{
        gap:0;
        .content{
            font-size: 120%;
        }
      

    }

}
}



.product{
    padding-top: 0;

.box-container{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(23rem, 1fr));
    gap:1.5rem;


    .box{
        padding:2.5rem;
        background:#fff;
        border-radius: .5rem;
        border:.1rem solid rgba(0,0,0,.2);
        box-shadow: 0 .5rem 1.5rem rgba(0,0,0,.1);
        position: relative;
        overflow:hidden;
        text-align: center;

        .fa-heart, .fa-eye{
            position: absolute;
            top:1.5rem;
            background:#eee;
            border-radius: 50%;
            height:3rem;
            width:3rem;
            line-height: 3rem;
            font-size:1.2rem;
            color: #192a56;
        }
        .fa-heart{
            right:-15rem;
        }

        .fa-eye{
            left:-15rem;
        }

        .fa-heart:hover, .fa-eye:hover{
            background:#27ae60;
            color:#fff;
        }  

        img{
            margin: 0 auto;
            
        }

        h3{
            color: #192a56;
            font-size: 1.3rem;
            font-weight: bold;
        }

        .stars{
            padding:1rem 0;
        }

        .stars i{
            font-size: 1.7rem;
            color: #27ae60;
        }

        span{
            color: #27ae60;
            font-weight: bolder;
            margin-right: 1rem;
            font-size: 1.5rem;

        }

    }


    .box:hover .fa-heart{
        right:1.5rem;
    }

    .box:hover .fa-eye{
        left:1.5rem;
    }
}

}





</style>
