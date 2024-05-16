<template>
<section>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div v-if="auth.error" class="error">{{ auth.error }}</div>
    <button v-if="!auth.isPending">Log in</button>
    <button v-if="auth.isPending" disabled>Loading...</button>
  </form>
</section>
</template>

<script>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'


export default {
  setup() {
    const auth = useAuthStore()
    const email = ref('')
    const password = ref('')
    const router = useRouter()
    
    // console.log(auth.isPending)

    const handleSubmit = async () => {
      await auth.logIn(email.value, password.value)

      if (!auth.error) {
        
        // router.push('/')
      }
    }

    return { email, password, handleSubmit, auth}
  }
}
</script>


<style scoped>
form {
  max-width: 400px;
  margin: 0 auto;
  margin-top:2rem;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
  border: 1px solid  #ebebeb;
  background: white;
}

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
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
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
</style>