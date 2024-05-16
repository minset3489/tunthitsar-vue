<template>
    <div class="carousel">
        <slot :currentSlide="currentSlide" />

        <!-- Navigation -->
        <div v-if="navEnabled" class="navigate">
            <div class="toggle-page left">
                <i @click="prevSlide" class="fas fa-chevron-left"></i>
            </div>
            
            <div class="toggle-page right">
                <i @click="nextSlide" class="fas fa-chevron-right"></i>
            </div>
        </div>

        <!-- Pagination -->
        <div v-if="paginationEnabled" class="pagination">
            <span @click="goToSlide(index)" v-for="(product,index) in getSlideCount" :key="index" :class="{active : index + 1 === currentSlide}">
             
            </span>
        </div>

    </div>
</template>


<script>
import { ref,computed } from 'vue';
export default{

    props: ['startAutoPlay', 'timeout', 'navigation', 'pagination', 'slideCount'],

    setup(props){
        const currentSlide = ref(1)
        const getSlideCount = computed(() => {
            return props.slideCount.length;
        })
        const autoPlayEnabled = ref(props.startAutoPlay === undefined ? true : props.startAutoPlay)
        const timeoutDuration = ref(props.timeout === undefined ? 5000 : props.timeout)
        const paginationEnabled = ref(props.pagination === undefined ? true : props.pagination)
        const navEnabled = ref(props.navigation === undefined ? true : props.navigation)
        

        // next slide
        const nextSlide = () => {
            if( currentSlide.value === getSlideCount.value ){
                currentSlide.value = 1
                return
            }
            currentSlide.value += 1
        }

        //  prev slide
        const prevSlide = () => {
            if( currentSlide.value === 1 ){
                currentSlide.value = getSlideCount.value
                return
            }
            currentSlide.value -= 1
        }

        const goToSlide = (index) => {
            currentSlide.value = index + 1
        }

        // autoplay
        const autoPlay = () => {
            setInterval( () => {
                nextSlide()
            }, timeoutDuration.value) 
        }

        if (autoPlayEnabled.value){
            autoPlay()
        }


        return { currentSlide, getSlideCount, nextSlide, prevSlide, goToSlide, paginationEnabled , navEnabled} 

    }

}
</script>

<style lang="scss">


.carousel{
  position:relative;
  max-height: 100vh;
  height: 100vh;
}

.navigate{
    padding: 0 16px;
    height: 100%;
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    .toggle-page{
    display: flex;
    flex:1;
    }

    .right{
    justify-content: flex-end;
    }

    i{
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: #192a56;
    color: #fff;
    opacity: .5;
    }
}

.pagination{
    position: absolute;
    bottom: 0;
    padding-bottom: 1rem;
    width: 100%;
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;

    span{
        cursor: pointer;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06);
    }

    .active{
        background-color: #666;
        opacity: .5;
    }

}



</style>