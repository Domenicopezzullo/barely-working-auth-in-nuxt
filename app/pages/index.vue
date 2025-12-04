<script setup lang="ts">
import type { ClientUser } from "~~/database/schema";
definePageMeta({
  middleware: ["authenticated"],
});
const {
  user: sessionUser,
  clear: signout,
  fetch: refreshSession,
} = useUserSession();
const user = sessionUser.value as ClientUser | null;
async function logout() {
  await signout();
  refreshSession();
  await navigateTo("/login");
}
</script>

<template>
  <h1 v-if="user">Your name is {{ user.username }}</h1>
  <h1 v-if="user">Your id is {{ user.id }}</h1>
  <button @click="logout">Logout</button>
</template>
