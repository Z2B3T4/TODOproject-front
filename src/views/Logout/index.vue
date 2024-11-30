<template>
  <!-- <LogOutHeader /> -->
  <div class="logout">
    <LogOutAside />
    <RouterView />
  </div>
</template>

<script setup>
import LogOutHeader from "@/views/logout/components/LogOutHeader.vue";
import LogOutAside from "@/views/logout/components/LogOutAside.vue";
import { RouterLink, RouterView } from "vue-router";
</script>

<style lang="scss" scoped>
.logout {
  display: flex;
}
</style>
