<script setup lang="ts">
import type { CategoryCode } from '~/constants/categories'

const props = defineProps({
  word: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String as unknown as () => CategoryCode | '',
    default: '',
  },
  index: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: CategoryCode | ''): void
  (e: 'choose', idx: number): void
}>()

</script>

<template>
  <span class="inline-flex flex-col items-center px-1 cursor-pointer select-none" @click="emit('choose', props.index)">
    <span :class="props.modelValue ? 'text-blue-600 font-semibold' : ''">{{ word }}</span>
    <span v-if="props.modelValue" class="text-xs mt-0.5 leading-none text-gray-600">{{ props.modelValue }}</span>
  </span>
</template>
