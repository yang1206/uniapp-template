<script setup lang="ts">
import { useCounterStore } from '@/store'

const props = defineProps<{
  value?: number
}>()

const useCount = useCounterStore()
const { count } = storeToRefs(useCount)
</script>

<template>
  <div class="my-20 inline-flex items-center gap-100">
    <button class="f-c-c rounded-full lh-60 size-60 animated animated-bounce btn" @click="useCount.inc()">
      +
    </button>
    <p font="mono">
      {{ value ? value : count }}
    </p>
    <button class="f-c-c rounded-full lh-60 size-60 animated animated-jello btn" @click="useCount.dec()">
      -
    </button>
  </div>
</template>
