<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import sentences from '~/data/sentences'
import GameSentence from '~/components/GameSentence.vue'
import type { CategoryCode } from '~/constants/categories'

const { timeLimit: TIME_LIMIT = 30 } = useAppConfig()
const isTimed = TIME_LIMIT >= 0

const currentIndex = ref(0)
const reveal = ref(false)
const timeLeft = ref(isTimed ? TIME_LIMIT : 0)
let interval: NodeJS.Timer | null = null

const sentenceData = computed(() => sentences[currentIndex.value])

function startTimer() {
  if (!isTimed) {
    reveal.value = false
    return
  }
  interval && clearInterval(interval)
  timeLeft.value = TIME_LIMIT
  reveal.value = false
  interval = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      reveal.value = true
      stopTimer()
    }
  }, 1000)
}

function stopTimer() {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}

function nextSentence() {
  currentIndex.value = (currentIndex.value + 1) % sentences.length
  if (isTimed) startTimer()
}

if (isTimed) {
  onMounted(startTimer)
  onBeforeUnmount(stopTimer)
}

</script>

<template>
  <div class="game-page">
    <h1>Nature des Mots</h1>
    <div v-if="isTimed" class="timer">Temps restant: {{ timeLeft }}s</div>

    <GameSentence :data="sentenceData" :reveal="reveal" ref="sentenceComp" />

    <button class="next" @click="nextSentence">Phrase suivante</button>
  </div>
</template>

<style scoped>
.game-page {
  text-align: center;
  padding: 24px;
}
.timer {
  font-size: 1.2rem;
  margin-bottom: 12px;
}
.next {
  margin-top: 12px;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
