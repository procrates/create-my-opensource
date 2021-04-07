<template>
  <form class="space-y-6" @submit.prevent="login()" method="POST">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">
        Email address
      </label>
      <div class="mt-1">
        <input
          id="email"
          v-model="credentials.email"
          name="email"
          type="email"
          autocomplete="email"
          required
          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">
        Password
      </label>
      <div class="mt-1">
        <input
          id="password"
          v-model="credentials.password"
          name="password"
          type="password"
          autocomplete="current-password"
          required
          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input
          id="remember_me"
          name="remember_me"
          type="checkbox"
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label for="remember_me" class="ml-2 block text-sm text-gray-900">
          Remember me
        </label>
      </div>

      <div class="text-sm">
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
          Forgot your password?
        </a>
      </div>
    </div>

    <div>
      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign in
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Signin',
  layout: 'auth',
  data() {
    return {
      credentials: {
        name: '',
        password: '',
        email: '',
      },
    }
  },
  methods: {
    ...mapActions({
      attemptLogin: 'attemptLogin',
    }),
    login() {
      this.attemptLogin({ ...this.credentials })
        .then(() => {
          alert(`You have signed in!`)
        })
        .catch((error) => {
          alert(`Somethings gone wrong logging in.
                 Error: ${error}`)
          console.error(error, 'Somethings gone wrong logging in')
        })
    },
  },
}
</script>
