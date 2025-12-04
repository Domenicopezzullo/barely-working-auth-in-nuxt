<script setup lang="ts">
const { loggedIn, user, fetch: refreshSession } = useUserSession();
const credentials = reactive({
  username: "",
  password: "",
});
async function login() {
  const res = await $fetch("/api/login", {
    method: "POST",
    body: credentials,
  });
  if (res.success == true) {
    await navigateTo("/");
  }
  await refreshSession();
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
