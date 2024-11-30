<template>
  <div class="todo">
    <TODOHeader />
    <TODOtab />
  </div>
</template>

<script setup>
import TODOHeader from "@/views/TODO/components/TODOHeader.vue";
import TODOtab from "@/views/TODO/components/TODOtab.vue";
</script>

<style lang="scss" scoped>
.todo {
  flex-grow: 1;
}
</style>
