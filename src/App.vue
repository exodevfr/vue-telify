<template>
  <div id="app">
    <TelInput v-model="phoneNumber" :framework="framework" />
  </div>
</template>

<script setup lang="ts">
import TelInput from '~/components/TelInput.vue';
import { ref } from 'vue';

const phoneNumber = ref('')
const framework = ref(import.meta.env.VITE_FRAMEWORK) 
</script>
