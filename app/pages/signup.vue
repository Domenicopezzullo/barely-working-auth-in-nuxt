<script setup lang="ts">
const { loggedIn, user, fetch: refreshSession } = useUserSession();
const credentials = reactive({
  username: "",
  password: "",
});
async function login() {
  await $fetch("/api/signup", {
    method: "POST",
    body: credentials,
  });

  // Refresh the session on client-side and redirect to the home page
  await refreshSession();
  await navigateTo("/");
}
</script>

<template>
  <form @submit.prevent="login">
    <input v-model="credentials.username" type="text" placeholder="Email" />
    <input
      v-model="credentials.password"
      type="password"
      placeholder="Password"
    />
    <button type="submit">Login</button>
  </form>
</template>
