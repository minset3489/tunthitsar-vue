<template>
    <section class="about" id="about">
        <h3 class="sub-heading">about us</h3>
        <h1 class="heading">why choose us?</h1>
        <div class="row" v-for="item in collectionStore.documents" :id="item.id">
    
            <div class="image">
                <img :src="item.aboutImgUrl" alt="">
            </div>
    
            <div class="content">
                <h3>{{item.title}}</h3>
                <p>{{item.description}}</p>
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
                <router-link class="btn" to="/products/Mahindra" @click="scrollToTop">Explore..</router-link>
            </div>
        </div>
    </section>
    
    </template>
        
    <script>
    import { ref, onMounted, watch } from 'vue';
    import { useCollectionStore } from '../stores/collectionStore'
    
    export default {
    
        setup(){
    
        const collectionStore = useCollectionStore();
        const error = ref(null);
        const sortField = ref('createdAt');
        const sortDirection = ref('asc');
    
        const updateCollection = () => {
            collectionStore
            .getCollection('aboutInfo', {
                field: sortField.value,
                direction: sortDirection.value,
            })
            .catch((err) => {
                error.value = 'Could not fetch the data. ' + err.message;
            });
        };
    
        // Fetch the collection when the component is mounted
        onMounted(updateCollection);
    
        // Watch for changes in the documents and reset the error
        watch(() => collectionStore.documents, () => {
            error.value = null;
        });
    
        return { collectionStore
        }
    
    
        }
    
    }
    </script>
    
    <style lang="scss" scoped>
    
    .row{
        display: flex;
        flex-wrap: wrap;
        gap:1.5rem;
        align-items: center;
    
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
        