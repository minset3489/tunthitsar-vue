<template>
<section class="pt-28">
  <div>
    <form @submit.prevent>
      <div class="flex">
          <h4 class="text-3xl font-bold">Create / Update a Product</h4>
          <div class="hidden"><input type="text" placeholder="Product ID" v-model="pid"></div>
      </div>

      <label for="brand" >Choose a brand:</label>
      <select id="cars" name="cars" v-model="brand">
        <option  value="Mahindra" >Mahindra</option>
        <option value="Weichai">Weichai</option>
      </select>
      
      <input type="text" required placeholder="kVA" v-model="capacity">

      <label for="phase" >Phase:</label>
      <select id="cars" name="cars" v-model="phase">
        <option value="Single">Single</option>
        <option value="Three">Three</option>
      </select>

      <input type="text" required placeholder="price in USD" v-model="price">
      <textarea required placeholder="Description..." v-model="description"></textarea>

      <input type="text" required placeholder="Engine Model" v-model="engModel">
      <input type="text" required placeholder="RPM" v-model="rpm">
      <input type="text" required placeholder="Cooling" v-model="cooling">
      <input type="text" required placeholder="Cylinders" v-model="cylinders">
      <input type="text" required placeholder="Alternator Make" v-model="altMake">
      <input type="text" required placeholder="Voltage (V)" v-model="voltage">
      <input type="text" required placeholder="Frequency (Hz)" v-model="altFrequency">
      <input type="text" required placeholder="Fuel tank capacity (in Ltrs.)" v-model="fuelTank">
      <input type="text" required placeholder="Genset dimensions L x W x H (mm)" v-model="dgDimensions">

      <!-- upload playlist image -->
      <label>Upload Product Image</label>
      <input type="file" @change="handleChange">

      
      <label class="text-xl">Popular product ? </label>
      <span :class="{ icon: true, fav: isFav }" @click="isFav = !isFav" class="material-icons">favorite</span>
    
      <div class="error">{{ fileError }}</div>

      <button class="btn" v-if="!isPending && !isEdit" :disabled="isPending && isEdit" @click="handleSubmit">Create</button>
      <button class="btn" v-if="isEdit" @click="handleUpdate(pid)">Update</button> 
      <button class="btn" v-if="isEdit" @click="handleReset">Cancel</button>
      <button class="btn" v-if="isPending" disabled>Loading</button>
    
    </form>
  </div>
</section>

<section class="pt-2">
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

  <div>
      <table class="table table-bordered table-striped">
      <thead class="thead-dark text-2xl underline">
          <tr>
              <th>kVA</th>
              <th class="bg-gray-100"><span class="material-icons m-4">favorite</span></th>
              <th>Phase</th>
              <th class="bg-gray-100">Description</th>
              <th class="w-40">Image</th>
              <th class="bg-gray-100">Price</th>
              <th>Edit</th>
              <th class="bg-gray-100">Delete</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="product in collectionStore.documents" :key="product.id">
              <td class="text-right">{{product.capacity}}</td>
              <td class="bg-gray-100 text-center"><span :class="{ icon: true, fav: product.isFav }" class="material-icons">favorite</span></td>
              <td class="text-center">{{product.phase}}</td>
              <td class="bg-gray-100">{{product.description}}</td>
              <td><img :src="product.productUrl" alt=""></td>
              <td class="bg-gray-100 text-right">{{product.price}}</td>
              <td ><button @click="handleEdit(product)" class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">Edit</button></td>
              <td class="bg-gray-100"><button @click="handleDelete(product.id,product.filePath)" class="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded  mx-2">Delete</button></td>

          </tr>
      </tbody>
      </table>
  </div>

   
</section>
</template>
  
<script>
import { ref,onMounted, watch } from 'vue'
import useStorage from '../../composables/useStorage'
import { useAuthStore } from '../../stores/authStore'
import { useCollectionStore } from '../../stores/collectionStore'

// firebase imports
import { db } from '../../firebase/config'
import { doc, serverTimestamp , addDoc, collection, updateDoc, deleteDoc } from 'firebase/firestore'
import { getStorage, deleteObject, ref as storageRef } from 'firebase/storage'


export default {
  setup() {

    const { uploadImage, url, filePath } = useStorage()
    const auth = useAuthStore()
    const brand = ref('Mahindra')
    const capacity = ref('')
    const phase = ref('')
    const price = ref('')
    const description = ref('')
    const engModel = ref('')
    const rpm = ref('')
    const cooling = ref('')
    const cylinders =ref('')
    const altMake = ref('')
    const voltage =ref('')
    const altFrequency = ref('')
    const fuelTank =ref('')
    const dgDimensions = ref('')
    const isFav = ref(false)
    const file = ref(null)
    const fileError = ref(null)
    const isPending = ref(false)
    const colRef = collection(db, 'dieselGenerators')

    const pid = ref('')
    const isEdit = ref(false)

    //allowed file types
    const types = ['image/png', 'image/jpeg']

    const handleChange = (e) =>{
      const selected = e.target.files[0]
      console.log(selected)

      if(selected && types.includes(selected.type)){
          file.value = selected
          fileError.value = null
      }
      else{
          file.value = null
          fileError.value = 'Please select an image file (png or jpeg)'
      }

    }

    // Create function
    const handleSubmit = async () => {
    if (file.value) {
      try {
        isPending.value = true;

        await uploadImage(file.value, 'dieselGenerators')

        const docRef = await addDoc(colRef, {

          brand: brand.value,
          capacity: capacity.value,
          phase: phase.value,
          price : price.value,
          description: description.value,
          engModel : engModel.value,
          rpm : rpm.value,
          cooling : cooling.value,
          cylinders : cylinders.value,
          altMake : altMake.value,
          voltage: voltage.value,
          altFrequency : altFrequency.value,
          fuelTank : fuelTank.value,
          dgDimensions : dgDimensions.value,
          userUid: auth.user.uid,
          userName: auth.user.displayName,
          isFav: isFav.value,
          productUrl: url.value,
          filePath: filePath.value,
          createdAt: serverTimestamp(),
        });
        console.log('product added')
        isPending.value = false
        handleReset()

      } catch (err) {
        console.error('Error during upload:', err.message);
        
      }
    }
  };


  
  // Delete function
  const handleDelete = async (productId, filePath) => {
    try {
      // Delete the document from Firestore
      await deleteDoc(doc(db, 'dieselGenerators', productId));

      // Create a reference to the file to delete
      const desertRef = storageRef(getStorage(), filePath);

      // Delete the file
      await deleteObject(desertRef).then(() => {
        // File deleted successfully
        console.log('Product and image deleted');
      }).catch((error) => {
        // Uh-oh, an error occurred!
        console.error('Error deleting product:', error.message);
      });

    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

 
  // Update Function
  const handleUpdate = async (product) => {
    const docRef = doc(db, 'dieselGenerators', product)

    if(file.value){

        try{
            isPending.value = true;
            isEdit.value = false;

            await uploadImage(file.value, 'dieselGenerators')
                updateDoc(docRef, { 
                  brand: brand.value,
                  capacity: capacity.value,
                  phase: phase.value,
                  price : price.value,
                  description: description.value,
                  engModel : engModel.value,
                  rpm : rpm.value,
                  cooling : cooling.value,
                  cylinders : cylinders.value,
                  altMake : altMake.value,
                  voltage: voltage.value,
                  altFrequency : altFrequency.value,
                  fuelTank : fuelTank.value,
                  dgDimensions : dgDimensions.value,
                  userUid: auth.user.uid,
                  userName: auth.user.displayName,
                  isFav: isFav.value,
                  productUrl: url.value,
                  filePath: filePath.value,
                  createdAt: serverTimestamp(),
            })
            console.log('product updated')
            isPending.value = false
            handleReset()
        } 
        catch (err) {
        console.error('Error during upload:', err.message);
        
        }
        
    }
    else{
        
        try{
            isPending.value = true;
            isEdit.value = false;

            updateDoc(docRef, { 
                brand: brand.value,
                capacity: capacity.value,
                phase: phase.value,
                price : price.value,
                description: description.value,
                engModel : engModel.value,
                rpm : rpm.value,
                cooling : cooling.value,
                cylinders : cylinders.value,
                altMake : altMake.value,
                voltage: voltage.value,
                altFrequency : altFrequency.value,
                fuelTank : fuelTank.value,
                dgDimensions : dgDimensions.value,
                userUid: auth.user.uid,
                userName: auth.user.displayName,
                isFav: isFav.value,
                createdAt: serverTimestamp(),
            })
            console.log('product updated')
            isPending.value = false
            handleReset()
        } 
        catch (err) {
        console.error('Error during upload:', err.message);
        
        }
        
    }
      
  }


    //Send Data to Form
    const handleEdit = (product) => {
        pid.value = product.id
        brand.value = product.brand
        capacity.value = product.capacity
        phase.value = product.phase
        price.value = product.price
        description.value = product.description
        engModel.value = product.engModel
        rpm.value = product.rpm
        cooling.value = product.cooling
        cylinders.value = product.cylinders
        altMake.value = product.altMake
        voltage.value = product.voltage
        altFrequency.value = product.altFrequency
        fuelTank.value = product.fuelTank
        dgDimensions.value = product.dgDimensions
        isEdit.value=true
        isFav.value=product.isFav
        window.scrollTo(0, 0)
    }

    // Reset Data in Form
    const handleReset = () =>{
        capacity.value = ''
        phase.value = ''
        price.value = ''
        description.value = ''
        filePath.value = null
        isEdit.value=false
        engModel.value = ''
        rpm.value = ''
        cooling.value = ''
        cylinders.value = ''
        altMake.value = ''
        voltage.value = ''
        altFrequency.value = ''
        fuelTank.value = ''
        dgDimensions.value = ''
    }

    //Fetch data function from Pinia Store
    const collectionStore = useCollectionStore();
    const error = ref(null);
    const sortField = ref('capacity');
    const sortDirection = ref('asc');

    const updateCollection = () => {
      collectionStore
        .getCollection('dieselGenerators',{
          field: sortField.value,
          direction: sortDirection.value,
          conditions: [{ field: 'brand', operator: '==', value: brand.value }]
        })
        .catch((err) => {
          error.value = 'Could not fetch the data. ' + err.message;
        });
    };

    // Fetch the collection when the component is mounted
    onMounted(updateCollection)

    // Watch for changes in the documents and reset the error
    watch(() => collectionStore.documents, () => {
      error.value = null;
    })

    const changeBrand = (newBrand) => {
        brand.value=newBrand
        updateCollection()
    }
    
    return { collectionStore, error, isFav,
      brand, capacity, phase, price, description, engModel, rpm, cooling, cylinders,altMake,voltage,altFrequency,fuelTank,dgDimensions,
      handleSubmit,handleChange, fileError, isPending,
      pid, handleEdit, handleUpdate,isEdit, handleReset,
      handleDelete , changeBrand
    }

  } //END OF SETUP

  
}
</script>
  
<style scoped>


.icon {
  color: #27ae60;
  cursor: pointer;
}
.icon.fav {
  color: #f83f5e;
}

form {
    max-width: 700px;
    margin: 0 auto;
    margin-top:2rem;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
    border: 1px solid  #ebebeb;
    background: white;

    

    input, textarea {
    border: 0;
    border-bottom: 1px solid #ebebeb;
    padding: 10px;
    outline: none;
    display: block;
    width: 100%;
    box-sizing: border-box;
    margin: 20px auto;
    }

    select {
      width: 100%;
      padding: 0;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing:border-box;
    }

    input[type="file"] {
    border: 0;
    padding: 0;
    }

    span{
        color:#27ae60;
        font-size: 1.5rem;
        padding: 10px;
        margin: 20px auto;
        font-weight: bold;
    }

    /* buttons */
    button, .btn { 
        background: #ebebeb;
        border-radius: 8px;
        border: 0;
        padding: 8px 12px;
        font-weight: 600;
        cursor: pointer;
        color:#666;
        display: inline-block;
    }
    button:hover, .btn:hover {
        background: #4f515a;
        color: white;
    }
    button:disabled {
        opacity: 0.5;
        color: #4f515a;
        background: #ebebeb;
        cursor: not-allowed;
    }
}
</style>