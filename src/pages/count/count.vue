<script lang="ts" setup>
import { useCounterStore } from '@/store'
const useCount = useCounterStore()
const { inc, dec } = useCount
</script>

<template>
  <div font-sans px-4 py-10 text-center text-gray-700 class="dark:text-gray-200">
    <p class="font-semibold">
      {{ useCount.count }}
    </p>
    <button class="btn m-4 h-8  w-8 rounded-full lh-8  text-center" @click="inc()">
      +
    </button>
    <button class="btn m-4 h-8 w-8 rounded-full lh-8 text-center" @click="dec()">
      -
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
