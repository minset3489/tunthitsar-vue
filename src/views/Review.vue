<template>
<section class="review" id="review">
    <h3 class="sub-heading">customer's review</h3>
    <h1 class="heading">what they say</h1>

    <div>

        <div class="box">
            <i class="fas fa-quote-right"></i>
            <div class="user">
                <img src="../images/man -1.jpg" alt="">
                <div class="user-info">
                    <h3>john doe</h3>
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>
                </div>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

        <div class="box">
            <i class="fas fa-quote-right"></i>
            <div class="user">
                <img src="../images/girl-1.jpg" alt="">
                <div class="user-info">
                    <h3>john doe</h3>
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>
                </div>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

        <div class="box">
            <i class="fas fa-quote-right"></i>
            <div class="user">
                <img src="../images/gril-2.jpg" alt="">
                <div class="user-info">
                    <h3>john doe</h3>
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>
                </div>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

        <div class="box">
            <i class="fas fa-quote-right"></i>
            <div class="user">
                <img src="../images/man -1.jpg" alt="">
                <div class="user-info">
                    <h3>john doe</h3>
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>
                </div>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        
    </div>

</section>

</template>
    
<script>


export default {

    setup(){


    }

}
</script>

<style lang="scss" scoped>


.box{
    padding:2rem;
    box-shadow: 0 .5rem 1.5rem rgba(0,0,0,.1);
    border:.1rem solid rgba(0,0,0,.2);
    border-radius: .5rem;
    position:relative;
    margin-bottom: 2rem;

    .fa-quote-right{
            position: absolute;
            top:2rem; right: 2rem;
            font-size: 3rem;
            color:#ccc;
    }
    .user{
        display: flex;
        gap:1.5rem;
        align-items: center;
        padding-bottom:1.5rem;
        img{
            height:7rem;
            width:7rem;
            border-radius: 50%;
            object-fit: cover;
        }
        h3{
            color:#192a56;
            font-size: 1.5rem;
            padding-bottom:.5rem;
            font-weight: bold;
        }
        i{
            font-size: 1.3rem;
            color: #27ae60;
        }
    }

    p{
        font-size: 1rem;
        line-height:1.8;
        color:#666;
    }
}






</style>
    