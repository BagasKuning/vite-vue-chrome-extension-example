<script setup>
import { ref, reactive, onMounted } from "vue";

const visible = ref(false);
const state = reactive({
  currentTab: null
});

onMounted(() => {
  chrome.runtime.sendMessage({ type: "POPUP_INIT" }, async tab => {
    state.currentTab = await tab;
    console.log(state.currentTab);
  });
});

const changeColor = color => {
  chrome.runtime.sendMessage({ type: "CHANGE_COLOR", color });
};
</script>
<template>
  <div class="overlay" v-show="visible">
    <div class="popup">
      <h1>Automation Extension</h1>
      <button @click="changeColor('#ff5733')">change color</button>
      <pre>{{ currentTab }}</pre>
    </div>
  </div>
</template>

<style>
.overlay {
  @apply fixed inset-0 w-full h-full bg-black bg-opacity-30 z-50;
}

.popup {
  @apply absolute top-4 right-4 bg-white shadow-lg p-4 rounded-md w-72;
}
</style>
