<template>
     <section class="about" id="about">
    <h3 class="sub-heading">Product Details</h3>
    <h1 class="text-6xl text-center font-bold py-4 uppercase underline" 
    :class="{ 'text-red-600': collectionStore.document?.brand === 'Mahindra', 'text-black': collectionStore.document?.brand === 'Weichai' }">
        {{ collectionStore.document?.brand }}
    </h1>

    <div class="row">

        <div class="image">
            <img :src="collectionStore.document?.productUrl" alt="">
        </div>

        <div class="content">
            <div class="text-4xl text-center font-bold"> {{ collectionStore.document?.capacity }} kVA</div>
            <table class="min-w-full">
                <tbody>
                    <tr class="text-xl underline">
                        <td class="p-2 text-center text-2xl font-bold" colspan="2">Engine</td>
                    </tr>
                    <tr class="text-xl bg-slate-200">
                        <td class="p-2 ">Engine Model</td>
                        <td class="p-2 ">{{ collectionStore.document?.engModel }}</td>
                    </tr>
                    <tr class="text-xl bg-slate-100">
                        <td class="p-2 ">RPM</td>
                        <td class="p-2 ">{{ collectionStore.document?.rpm }}</td>
                    </tr>
                    <tr class="text-xl bg-slate-200">
                        <td class="p-2 ">Cooling</td>
                        <td class="p-2 ">{{ collectionStore.document?.cooling }}</td>
                    </tr>
                    <tr class="text-xl bg-slate-100">
                        <td class="p-2 ">Cylinders</td>
                        <td class="p-2 ">{{ collectionStore.document?.cylinders }}</td>
                    </tr>
                    <tr class="text-xl underline">
                        <td class="p-2 text-center text-2xl font-bold" colspan="2">Alternator</td>
                    </tr>
                    <tr class="text-xl bg-slate-200">
                        <td class="p-2 ">Make</td>
                        <td class="p-2 ">{{ collectionStore.document?.altMake }}</td>
                    </tr>
                    <tr class="text-xl bg-slate-100">
                        <td class="p-2 ">Voltage (V)</td>
                        <td class="p-2 ">{{ collectionStore.document?.voltage }}</td>
                    </tr>
                    <tr class="text-xl bg-slate-200">
                        <td class="p-2 ">Frequency (Hz)</td>
                        <td class="p-2 ">{{ collectionStore.document?.altFrequency }}</td>
                    </tr>
                    <tr class="text-xl underline">
                        <td class="p-2 text-center text-2xl font-bold" colspan="2">General Info</td>
                    </tr>
                    <tr class="text-xl bg-slate-200">
                        <td class="p-2 ">Fuel tank capacity (in Ltrs.)</td>
                        <td class="p-2 ">{{ collectionStore.document?.fuelTank }}</td>
                    </tr>
                    <tr class="text-xl bg-slate-100">
                        <td class="p-2 ">Genset dimensions L x W x H (mm)</td>
                        <td class="p-2 ">{{ collectionStore.document?.dgDimensions }}</td>
                    </tr>
                </tbody>
            </table>


            <div class="icons-container">
                <div class="icons">
                    <i class="fas fa-shipping-fast"></i>
                    <span>free delivery</span>
                </div>
                <div class="icons">
                    <i class="fas fa-dollar-sign"></i>
                    <span>easy payments</span>
                </div>
                <div class="icons">
                    <i class="fas fa-headset"></i>
                    <span>24/7 service</span>
                </div>
                
            </div>
            <router-link @click="scrollToTop" :to="{name : 'products', params : { id : collectionStore.document?.brand }}" class="btn">More Products...</router-link>
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
      const error = ref(null)
      const collectionStore = useCollectionStore()
  
      const updateCollection = () => {
        collectionStore.getDocument('dieselGenerators', props.id)
          .catch((err) => {
            error.value = 'Could not fetch the data. ' + err.message;
          })
      }
  

      // Fetch the collection when the component is mounted
      onMounted(updateCollection)
  
      watch(() => collectionStore.document, () => {
        error.value = null;
      })

      const scrollToTop= () => {
        window.scrollTo(0, 0); // Scroll to the top of the document
        }
  
      return {scrollToTop,  error, collectionStore }
    }
  }
  </script>

<style lang="scss" scoped>

.row{
    display: flex;
    flex-wrap: wrap;
    gap:1.5rem;
    align-items: top;

    .image{
        flex:1 1 30rem;
        img{
            width: 100%;
        }
    }

    .content{
        flex:1 1 30rem;
        h3{
            color: #192a56;
            font-size: 2rem;
            padding:.5rem 0;
            font-weight: bold;
        }
        p{
            color: #666;
            font-size: 1rem;
            padding: .5rem 0;
            line-height: 2;
        }
        .icons-container{
            display: flex;
            gap: 1rem;
            flex-wrap:wrap;
            padding:1rem 0;
            margin-top: .5rem;
            .icons{
                background:#eee;
                border-radius: .5rem;
                border: .1rem solid rgba(0,0,0,.2);
                display: flex;
                align-items: center;
                justify-content: center;
                gap:1rem;
                flex: 1 1 12rem;
                padding:1rem .5rem;

                i{
                    font-size: 2rem;
                    color: #27ae60;
                }
                span{
                    font-size: 1rem;
                    color: #192a56;
                }
            }
        }
    }
}



</style>