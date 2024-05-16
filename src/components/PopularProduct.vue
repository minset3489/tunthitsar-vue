<template>
<section class="product" id="product">

    <h3 class="sub-heading">our products</h3>
    <h1 class="heading">popular products</h1>

    <div class="box-container">
        <div class="box" v-for="product in popProducts" :key="product.id">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
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

</template>


<script>


export default {
    props: ['popProducts'],

    setup() {
        
        const scrollToTop= () => {
        window.scrollTo(0, 0); // Scroll to the top of the document
        }
  
      return {scrollToTop}

    }

}
</script>

<style lang="scss" scoped>

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


@media (max-width:991px){
  .product{
  }
}

@media (max-width:768px){
  .product{
  }
}





</style>
    