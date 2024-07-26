<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="pr-0 d-flex">
          <v-select 
            v-model="selectedCountry" 
            :items="countries" 
            item-title="name" 
            item-value="code" 
            density="default"
            min-width="80"
            max-width="90"
            :readonly="isDefaultOption"
            class="select-country"
            @update:model-value="onCountryChange"
            :menu-icon="isDefaultOption ? 'mdi-phone' : 'mdi-menu-down'"
            >
            <template #selection>
                <span :class="`fi fi-${selectedCountry}`"></span>
            </template>
            <template #item="{ item, props }">
              <v-list-item v-bind="props" title="" class="d-flex">
                <span :class="`icon-list fi fi-${item.value}`" class="mr-2"></span>
                <span>{{ item.title }}</span>
                <span class="text-caption">{{ ' (' + getPhonePrefix(item.raw.code) + ') ' }}</span>
              </v-list-item>
            </template>
          </v-select>
          <v-text-field
              ref="phoneNumberInput"
              v-model="phoneNumber" 
              density="default"
              class="input-number"
              :counter="maxLength"
              :rules="[phoneNumberRule]"
              filled
              @input="onPhoneNumberInput"
            >
            <template #prepend-inner>
              <!-- <v-icon>mdi-phone</v-icon> -->
              <div class="ml-2 prefix text-grey">
                {{ prefix }}
              </div>
            </template>
          </v-text-field>
      </v-col>
    </v-row>
    <div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useCountries } from '@/composables/useCountries'
import { usePhoneLength } from '@/composables/usePhoneLength'
import { getPhonePrefix, useFormatPhoneNumber, isValidPhoneNumber } from '@/utils/formatted'
import { getConfig } from '../config'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { countries } = useCountries()
const { phoneLength } = usePhoneLength()

// Props
const props = defineProps({
  modelValue: String,
  framework: String,
});

const selectedCountry = ref<string>('fr')
// const phoneNumber = ref<string>('')
const prefix = ref<string>('')
const isPhoneNumberValid = ref<boolean>(true)
const phoneNumberInput = ref<any>(null)
const phoneNumber = ref<any>(props.modelValue)

// Computed
const maxLength = computed(() => {
  const lengths = phoneLength.value[selectedCountry.value] || [9]
  return Math.max(...lengths)
})
const isDefaultOption = computed(() => {
  const countryListOptions = getConfig().countryListOptions ?? ['default'];
  return (
    countryListOptions.length > 1 &&
    countryListOptions.slice(1).every(item => item === '' || item === 'default')
  ) ||
  (countryListOptions.length < 2 &&
    (countryListOptions[0] === 'default' || countryListOptions[0] === '')
  );
});

// Rules
const phoneNumberRule = (value: string): boolean | string => {
  if (!value) {
    return ''
  } 
  return isValidPhoneNumber(selectedCountry.value, value.replace(/\D/g, '')) || t('errors.invalid_phone_number') 
}

watch(selectedCountry, (newVal) => {
  onCountryChange(newVal)
})

watch(phoneNumber, (newVal) => {
  if (newVal === '') {
    reset()
  }
})

watch(() => props.modelValue, (newValue) => {
  phoneNumber.value = newValue;
});

const emit = defineEmits(['update:modelValue']);

watch(phoneNumber, (newValue) => {
  emit('update:modelValue', newValue);
});



onMounted(() => {
  onCountryChange(selectedCountry.value)
})

const formatPhoneNumber = (): void => {
  const rawNumber = phoneNumber.value.replace(/\s+/g, '')
  const formattedNumber = useFormatPhoneNumber(selectedCountry.value, rawNumber)
  if (phoneNumber.value !== formattedNumber) {
    phoneNumber.value = formattedNumber
  }
  isPhoneNumberValid.value = isValidPhoneNumber(selectedCountry.value, rawNumber)
}

const onCountryChange = (countryCode: string): void => {
  prefix.value = getPhonePrefix(countryCode)
  formatPhoneNumber()
}

const onPhoneNumberInput = (event: Event): void => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')

  // Obtenir les longueurs possibles pour le pays sélectionné
  const possibleLengths = phoneLength.value[selectedCountry.value] || [9]

  // Vérifier si la longueur actuelle correspond à l'une des length possibles
  if (!possibleLengths.includes(value.length)) {
    // Si la longueur dépasse la plus grande longueur possible, alors couper la value
    value = value.slice(0, Math.max(...possibleLengths))
    input.value = value // Met à jour directement la valeur de l'input pour bloquer l'entrée
  }

  phoneNumber.value = useFormatPhoneNumber(selectedCountry.value, value);
  isPhoneNumberValid.value = isValidPhoneNumber(selectedCountry.value, value);

  if (phoneNumberInput.value) {
    phoneNumberInput.value.validate();
  }
}

const reset = () => {
  phoneNumberInput.value.resetValidation()
  phoneNumberInput.value.reset()
}
</script>

<style>
.v-counter {
  display: none !important;
}
.fi {
  width: 2em !important;
  line-height: inherit !important;
  border-radius: 3px;
}
.icon-list {
  width: 1.5em !important;
  line-height: inherit !important;
  border-radius: 6px !important;
}
.prefix {
  width: max-content;
}

.v-field {
  border-radius: 0px 12px 12px 0px !important;
}

.v-field__outline {
  display: none !important;
}

.v-field__overlay {
  background-color: #E2E2E2 !important;
}

.v-field--variant-filled .v-field__overlay {
  opacity: 0.5 !important;
}

.v-select--active-menu {
  /* box-shadow: inset 0px 0px 0px 1px #cccccc; */
  background-color: #ededed;
  border-radius: 12px 0 0 12px;
}
.input-number .v-field--active {
  /* box-shadow: inset 0px 0px 0px 1px #cccccc */
  background-color: #ededed;
}
.select-country .v-field__overlay {
  border-radius: 12px 0 0 12px;
}
.select-country .v-field--appended {
  padding-inline-end: 0 !important;
}
.input-number .v-field__overlay {
  border-radius: 0 12px 12px 0;
}
.input-number .v-field--prepended {
  padding-inline-start: 0 !important;
}
</style>../config