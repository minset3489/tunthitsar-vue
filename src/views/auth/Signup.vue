<template>
<section>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Display name" v-model="displayName">
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div v-if="auth.error" class="error">{{ auth.error }}</div>
    <button v-if="!auth.isPending">Sign up</button>
    <button v-if="auth.isPending" disabled>Loading</button>
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
    const displayName = ref('')
    const router = useRouter()
    
    // console.log(auth.isPending)

    const handleSubmit = async () => {
      await auth.signUp(email.value, password.value, displayName.value)

      if (!auth.error) {
        console.log('user signed up')
        // router.push('/')
      }
    }

    return { email, password,displayName, handleSubmit, auth}
  }
}
</script>