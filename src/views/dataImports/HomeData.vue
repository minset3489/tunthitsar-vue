<template>
<section class="pt-28">
    <div>
    <form @submit.prevent>
    <div class="flex">
        <h4 class="text-3xl font-bold">Home Slider</h4>
        <div class="hidden"><input type="text" placeholder="Product ID" v-model="pid"></div>
    </div>
    <div class="flex">
        <span>Title</span>
        <input type="text" required placeholder="Title" v-model="title">
    </div>

    <div class="flex">
        <span>Header</span>
        <input type="text" required placeholder="Header" v-model="header">
    </div>

    <div class="flex">
        <span>Description</span>
        <textarea required placeholder="Description..." v-model="description"></textarea>
    </div>

    <div class="flex">
        <!-- upload playlist image -->
        <span>Upload Product Image</span>
        <input type="file" @change="handleChange">
    </div>
    

    <div class="error">{{ fileError }}</div>

    <button class="btn" v-if="!isPending && !isEdit" :disabled="isPending && isEdit" @click="handleSubmit">Create</button>
    <button class="btn" v-if="isEdit" @click="handleUpdate(pid)">Update</button> 
    <button class="btn" v-if="isEdit" @click="handleReset">Cancel</button>
    <button class="btn" v-if="isPending" disabled>Loading</button>

    </form>
    </div>
</section>
<section class="pt-2">

    <div>
      <table class="table table-bordered table-striped">
      <thead class="thead-dark text-2xl underline">
          <tr>
              <th>Title</th>
              <th class="bg-gray-100">Header</th>
              <th>Description</th>
              <th class="bg-gray-100 w-60">Image</th>
              <th>Edit</th>
              <th class="bg-gray-100">Delete</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="product in collectionStore.documents" :key="product.id">
              <td class="text-right">{{product.title}}</td>
              <td class="bg-gray-100 text-center">{{product.header}}</td>
              <td>{{product.description}}</td>
              <td class="bg-gray-100"><img :src="product.homeSlideUrl" alt=""></td>
              <td ><button @click="handleEdit(product)" class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">Edit</button></td>
              <td class="bg-gray-100"><button @click="handleDelete(product.id,product.filePath)" class="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded  mx-2">Delete</button></td>
          </tr>
      </tbody>
      </table>
  </div>

</section>

</template>
    
<script>
import { ref, onMounted, watch } from 'vue';
import useStorage from '../../composables/useStorage'
import { useAuthStore } from '../../stores/authStore'
import { useCollectionStore } from '../../stores/collectionStore'

// firebase imports
import { db } from '../../firebase/config'
import { doc, serverTimestamp , addDoc, collection, updateDoc, deleteDoc } from 'firebase/firestore'
import { getStorage, deleteObject, ref as storageRef } from 'firebase/storage'
import { useRouter } from 'vue-router'

export default {
    setup() {
    const router = useRouter()
    const { uploadImage, url, filePath } = useStorage()
    const auth = useAuthStore()
    const pid = ref('')
    const title = ref('')
    const header = ref('')
    const description = ref('')
    const file = ref(null)
    const fileError = ref(null)
    const isPending = ref(false)
    const isEdit = ref(false)
    const colRef = collection(db, 'homeSlider')

    const handleSubmit = async () => {
    if (file.value) {
        try {
        isPending.value = true;

        await uploadImage(file.value, 'homeSlider')

        const docRef = await addDoc(colRef, {
            title: title.value,
            header: header.value,
            description: description.value,
            userUid: auth.user.uid,
            userName: auth.user.displayName,
            homeSlideUrl: url.value,
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

    // reset form

    const handleReset = () =>{
        title.value = ''
        header.value = ''
        description.value = ''
        filePath.value = null
        isEdit.value=false
    }

    //Fetching Data
    const collectionStore = useCollectionStore();
    const error = ref(null);
    const sortField = ref('createdAt');
    const sortDirection = ref('asc');

    const updateCollection = () => {
      collectionStore
        .getCollection('homeSlider', {
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


    const handleEdit = (product) => {
        pid.value = product.id
        title.value = product.title
        header.value = product.header
        description.value = product.description
        isEdit.value=true
    }

    // update doc
    const handleUpdate = async (product) => {
        const docRef = doc(db, 'homeSlider', product)

        if(file.value){

            try{
                isPending.value = true;
                isEdit.value = false;

                await uploadImage(file.value, 'homeSlider');
                    updateDoc(docRef, { 
                    title: title.value,
                    header: header.value,
                    description: description.value,
                    userUid: auth.user.uid,
                    userName: auth.user.displayName,
                    homeSlideUrl: url.value,
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
                    title: title.value,
                    header: header.value,
                    description: description.value,
                    userUid: auth.user.uid,
                    userName: auth.user.displayName,
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

    // Delete function
    const handleDelete = async (productId, filePath) => {
        try {
        // Delete the document from Firestore
        await deleteDoc(doc(db, 'homeSlider', productId));

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
    
    return { 
        title, header, description, handleSubmit,handleChange, fileError, isPending,
        collectionStore, error, sortField, sortDirection, updateCollection ,
        handleReset,
        pid,handleEdit, isEdit, handleUpdate,
        handleDelete
    }
    }

    
}
</script>
    
<style lang="scss" scoped>


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