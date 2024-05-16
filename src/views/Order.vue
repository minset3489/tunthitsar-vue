<template>
<section class="order" id="order">
    <h3 class="sub-heading">order now</h3>
    <h1 class="heading">free and fast</h1>

    <form @submit.prevent>
        <div class="inputBox">
            <div class="input">
                <span>Your name / နာမည်</span>
                <input type="text" placeholder="enter your name" required v-model="cusName">
            </div>
            <div class="input">
                <span>Your Number / ဖုန်းနံပါတ်</span>
                <input type="number" placeholder="enter your number" required v-model="cusNumber">
            </div>
        </div>
        <div class="inputBox">
            <div class="input">
                <span>Your Order / အသုံပြုလိုသော ပမာဏ</span>
                <input type="text" placeholder="20 to 2000 kVA" required v-model="capacity">
            </div>
            <div class="input">
                <span>Place of use / အသုံးပြုမည့်နေရာ</span>
                <input type="text" placeholder="Home / Hotel / Factory / Warehouse" v-model="purpose">
            </div>
        </div>
        <div class="inputBox">
            <div class="input">
                <span>Region / ပြည်နယ် တိုင်းဒေသကြီး</span>
                <select id="region" name="region" v-model="region">
                    <option value="Ayeyarwady" selected>Ayeyarwady</option>
                    <option value="Bago">Bago</option>
                    <option value="Chin">Chin</option>
                    <option value="Kachin">Kachin</option>
                    <option value="Kayah">Kayah</option>
                    <option value="Magway">Magway</option>
                    <option value="Mandalay">Mandalay</option>
                    <option value="Mon">Mon</option>
                    <option value="Naypyidaw">Naypyidaw</option>
                    <option value="Rakhine">Rakhine</option>
                    <option value="Sagaing">Sagaing</option>
                    <option value="Shan">Shan</option>
                    <option value="Tanintharyi">Tanintharyi</option>
                    <option value="Yangon">Yangon</option>
                </select>
                <span>City / မြို့ ရွာ နာမည် </span>
                <input type="text" placeholder="Mhawbi City / Bago City" v-model="city">
            </div>
            <div class="input">
                <span>Your message / အကြောင်းအရာ </span>
                <textarea name="" placeholder="enter your message" id="" cols="30" rows="10" v-model="message"></textarea>
            </div>
        </div>
        <button class="btn" v-if="!isPending" :disabled="isPending" @click="handleSubmit">Enquire...</button>
        <button class="btn" v-if="isPending" disabled>Loading</button>
    </form>
</section>
    
</template>
    
<script>
import { ref } from 'vue'
import { db } from '../firebase/config'
import { serverTimestamp , addDoc, collection} from 'firebase/firestore'

export default {

    setup(){
        const isPending = ref(false)
        
        const cusName = ref('')
        const cusNumber = ref('')
        const capacity = ref('')
        const purpose = ref('')
        const region = ref('Yangon')
        const city = ref('')
        const message = ref('')

        const isFormValid = ref(true)

        const colRef = collection(db, 'customerEnquiry')
        const handleSubmit = async () => {
            if (!validateForm()) {
                return
            }
            try {
            isPending.value = true;
            await addDoc(colRef, {
                name: cusName.value,
                number: cusNumber.value,
                capacity: capacity.value,
                purpose: purpose.value,
                region: region.value,
                city: city.value,
                message: message.value,
                createdAt: serverTimestamp(),
            });
            console.log('Customer enquiry added')
            isPending.value = false
            handleReset()
            } catch (err) {
            console.error('Error during upload:', err.message);
            
            }
        
        };

        // Reset Data in Form
        const handleReset = () =>{
            cusName.value= ''
            cusNumber.value= ''
            capacity.value= ''
            purpose.value= ''
            region.value= 'Yangon'
            city.value= ''
            message.value= ''
        }

         // Validate form function
        const validateForm = () => {
        // Add your own validation logic here
        isFormValid.value = true;

        if (!cusName.value || !cusNumber.value || !capacity.value || !purpose.value || !region.value || !city.value || !message.value) {
            isFormValid.value = false;
            alert('Please fill in all required fields.');
        }

        return isFormValid.value;
        };

        return{ cusName,cusNumber,capacity,purpose,region,city,message, isPending, isFormValid, handleSubmit}
 
    }

}
</script>

<style lang="scss" scoped>
form{
    max-width: 70rem;
    border-radius: .5rem;
    box-shadow: 0 .5rem 1.5rem rgba(0,0,0,.1);
    border:.1rem solid rgba(0,0,0,.2);
    background: #fff;
    padding: 1.5rem;
    margin: 0 auto;

    select {
        margin: 8px 0;
        border: 1px solid #ccc;
        box-sizing:border-box;
        border-radius: .5rem;
        padding:.6rem;
        font-size: 1rem;
        color: #192a56;
        text-transform: none;
        width: 100%;
        background:#eee;
    }

    .inputBox{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .input{
            width: 49%;
            span{
                display: block;
                padding: .4rem 0;
                font-size: 1.2rem;
                color: #666;
            }

            input, textarea{
                background:#eee;
                border-radius: .5rem;
                padding:.6rem;
                font-size: 1rem;
                color: #192a56;
                text-transform: none;
                width: 100%;
            }
            textarea{
                height:10rem;
                resize: none;
            }

            input:focus, textarea:focus{
                border:.1rem solid #27ae60;
                
            }
        }

        .btn{
            margin-top: 0;
        }
    }   

}


@media (max-width:500px){
    .order form .inputBox .input{
        width: 100%;
    }

}




</style>
    