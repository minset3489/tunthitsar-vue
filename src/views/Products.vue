<template>
<section>
    <h3 class="sub-heading">our products</h3>
    <div class="flex items-center justify-center text-2xl my-4">
        <span
        class="text-red-600 hover:cursor-pointer"
        :class="{ 'font-bold underline': brand === 'Mahindra' }"
        @click="changeBrand('Mahindra')"
      >
        Mahindra
      </span>
      
    <span class="mx-2">/</span> 
    <span
        class="text-black-800 hover:cursor-pointer"
        :class="{ 'font-bold underline': brand === 'Weichai' }"
        @click="changeBrand('Weichai')"
      >
        Weichai
      </span>
    </div>
    <div class="box-container">
        <div class="box" v-for="product in collectionStore.documents" :key="product.id">
            <div class="image">
                <img :src="product.productUrl" alt="">
                <a href="#" class="fas fa-heart"></a>
            </div>
            <div class="content">
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <h3>{{product.brand}} {{ product.capacity }} kVA</h3>
                <p>{{product.description}}</p>
                <router-link @click="scrollToTop" :to="{name : 'details', params : { id : product.id }}" class="btn">Details...</router-link>
               
                <span class="price">${{product.price}}</span>
            </div>
        </div>
    </div>
</section>

</template>
    
<script>
import { ref, onMounted, watch } from 'vue'
import { useCollectionStore } from '../stores/collectionStore'

export default {
    props: ['id'],

    setup(props) {
    const collectionStore = useCollectionStore()
    const error = ref(null);
    const sortField = ref('capacity')
    const sortDirection = ref('asc')
    const brand = ref('Mahindra')

    if(props.id){
        brand.value = props.id
    }
    
    const updateCollection = () => {
      collectionStore
        .getCollection('dieselGenerators',{
          field: sortField.value,
          direction: sortDirection.value,
          conditions: [{ field: 'brand', operator: '==', value: brand.value }]
        })
        .catch((err) => {
          error.value = 'Could not fetch the data. ' + err.message;
        })
    };

    // Fetch the collection when the component is mounted
    onMounted(updateCollection)

    // Watch for changes in the documents and reset the error
    watch(() => collectionStore.documents, () => {
      error.value = null;
    })

    const changeBrand = (newBrand) => {
        brand.value=newBrand
        updateCollection(); 
    }

    const scrollToTop= () => {
        window.scrollTo(0, 0); // Scroll to the top of the document
        }

    return {scrollToTop, brand, collectionStore, error, changeBrand };
  },

}
</script>

<style lang="scss" scoped>


.box-container{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    gap:1.5rem;
    .box{
        background: #fff;
        border:.1rem solid rgba(0,0,0,.2);
        border-radius: .5rem;
        box-shadow: 0 .5rem 1.5rem rgba(0,0,0,.1); 

        .image{
            height:20rem;
            width: 100%;
            padding:1.5rem;
            overflow: hidden;
            position:relative;

            img{
                height:100%;
                width: 100%;
                border-radius: .5rem;
                object-fit: cover;
            }

            .fa-heart{
                position: absolute;
                top: 2rem; right:2rem;
                height: 4rem;
                width: 4rem;
                line-height: 4rem;
                text-align: center;
                font-size: 1.5rem;
                background:#fff ;
                border-radius: 50%;
                color: #192a56;
            }

            .fa-heart:hover{
                background-color: #27ae60;
                color: #fff;
            }
        }

        .content{
            padding:2rem;
            padding-top: 0;

            .stars{
                padding-bottom: 1rem;

                i{
                    font-size: 1.7rem;
                    color: #27ae60;
                }
            }
            h3{
                color: #192a56;
                font-size: 1.5rem;
                font-weight: bold;
            }
            p{
                color:#666;
                font-size: 1rem;
                text-align: justify;
                padding: .5rem 0;
                line-height: 1.5;
            }
            .price{
                color: #27ae60;
                margin-left:1rem;
                font-size: 1.2rem;
                font-weight: bold;
            }
        }

    }
}
 






</style>
    