<script setup lang="ts">
import { ref, watch } from 'vue'
import { CATEGORIES, type CategoryCode } from '~/constants/categories'
import type { ClassifiedSentence } from '~/data/sentences'

const props = defineProps<{
  data: ClassifiedSentence
  reveal: boolean
}>()

const answers = ref<(CategoryCode | '')[]>(() => props.data.sentence.split(' ').map(() => ''))
const pickerIdx = ref(-1) // -1 means closed

watch(
  () => props.reveal,
  (val) => {
    if (val) {
      answers.value = [...props.data.categories]
    }
  },
)

function openPicker(idx: number) {
  pickerIdx.value = idx
}
function selectCategory(code: CategoryCode) {
  if (pickerIdx.value >= 0) {
    answers.value[pickerIdx.value] = code
    pickerIdx.value = -1
    // emit update to parent if needed
  }
}

defineExpose({ answers })
</script>

<template>
  <div class="sentence">
    <WordSelector
      v-for="(word, idx) in props.data.sentence.split(' ')"
      :key="idx + word"
      :word="word"
      :index="idx"
      v-model="answers[idx]"
      @choose="openPicker"
    />
  </div>

  <!-- Bottom sheet category picker -->
  <Teleport to="body">
    <div v-if="pickerIdx >= 0" class="fixed inset-0 z-50 flex items-end">
      <div class="absolute inset-0 bg-black/50" @click="pickerIdx = -1" />
      <div class="relative w-full bg-white rounded-t-2xl p-4 shadow-lg">
        <h3 class="text-center font-bold mb-3">{{ props.data.sentence.split(' ')[pickerIdx] }}</h3>
        <div class="flex flex-wrap justify-center gap-2">
          <button
            v-for="c in CATEGORIES"
            :key="c.code"
            @click="selectCategory(c.code)"
            class="px-3 py-2 rounded border text-sm"
            :class="c.code === answers[pickerIdx] ? 'bg-blue-600 text-white' : 'bg-gray-100'"
          >
            {{ c.code }} - {{ c.label }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.sentence {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 16px;
}
</style>
