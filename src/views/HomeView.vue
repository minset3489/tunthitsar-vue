<template>
<div class="home">

<CarouselContainer 
:navigation="true" 
:pagination="true" 
:startAutoPlay="true" 
:timeout="5000"
:slideCount="slideProducts" 
class="slide" v-slot="{currentSlide}">
  <SlideContent  v-for="(product, index) in slideProducts" :key="product.id">
    <div v-show="currentSlide === index + 1 " class="eachSlide">
      <div class="content">
          <span class="font-bold">{{product.title}}</span>
          <h3>{{product.header}}</h3>
          <p>{{product.description}}</p>
          <router-link class="btn" to="/" >order now</router-link>
      </div>
      <div  class="image">
        <img :src="product.homeSlideUrl" alt="">
      </div>
    </div>
  </SlideContent>
</CarouselContainer>



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

import CarouselContainer from '../components/CarouselContainer.vue'
import SlideContent from '../components/SlideContent.vue'
import PopularProduct from '../components/PopularProduct.vue'

export default {
  name: 'HomeView',
  components: { CarouselContainer, SlideContent},

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


    return{error, collectionStore, popularProducts, slideProducts, scrollToTop}
  }

}
</script>

<style lang="scss" scoped>

.slide{
    
    position:relative;
    padding-top:1.5rem;

    .eachSlide{
      position: absolute;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap:2rem;
      padding:2rem 9%;
      padding-top: 7rem;



      .content{
        flex:1 1 24rem;

        span{
            color:#27ae60;
            font-size: 1.5rem;
        }

        h3{
            color:#192a56;
            font-size: 4rem;
            font-weight: bold;
        }

        p{
            color:#666;
            font-size: 1.5rem;
            padding: .5rem 0;
            line-height: 1.5;
        }

      }   

      .image{
          flex:1 1 24rem;

          img{
              margin: 0 auto;
              height:20rem;
              overflow: hidden;
          }
      }

    } 

}


@media (max-width:991px){


  .slide{
    .eachSlide{
      .content{
        


      .image{
          img{
          }
      }

    } 

}
}
}

@media (max-width:768px){
  .slide .eachSlide .content h3{
    font-size: 5rem;
}

}



.product{

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
