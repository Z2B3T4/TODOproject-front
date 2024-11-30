<template>
  <div class="text-button">
    <div class="text-button-icon">
      <slot></slot>
    </div>
    <div class="textdiv">{{ text }}</div>
  </div>
</template>

<script setup>
defineProps({
  text: String,
});
</script>

<style lang="scss" scoped>
.text-button {
  width: 100px;
  height: 50px;
  border: 1px solid lightblue;
  display: flex;
  margin: 10px;
  border-radius: 10%;
  .text-button-icon {
    align-content: center;
    padding: 0 0 0 5px;
  }
  .textdiv {
    padding: 0 0 0 5px;
    align-content: center;
    width: 70%;
  }
}
.text-button:hover {
  color: rgb(37, 213, 213);
  background: rgb(216, 236, 192);
  cursor: pointer;
  transition: 0.5s;
}
</style>
