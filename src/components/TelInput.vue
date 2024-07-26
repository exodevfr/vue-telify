<template>
  <InputVuetify v-if="framework === 'vuetify'" :framework="framework"  :modelValue="phoneNumber" @update:modelValue="updatePhoneNumber" />
  <input v-else type="tel" :value="phoneNumber" @input="onInput" >
</template>

<script setup lang="ts">
import InputVuetify from './InputVuetify.vue'
import { ref, watch } from 'vue';

const framework = ref(import.meta.env.VITE_FRAMEWORK)

const props = defineProps({
  framework: String,
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const phoneNumber = ref<any>(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  phoneNumber.value = newValue;
})

const updatePhoneNumber = (newValue: string) => {
  emit('update:modelValue', newValue);
};

const onInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit('update:modelValue', input.value);
};

</script>