<script lang="ts" setup>
import { useCounterStore } from '@/store'
const useCount = useCounterStore()
const { inc, dec } = useCount
</script>

<route  lang="yaml">
style:
  navigationBarTitleText: Count
</route>

<template>
  <div px-4 py-10 text-center font-sans text-gray-700 class="dark:text-gray-200">
    <p class="font-semibold">
      {{ useCount.count }}
    </p>
    <button class="animated animated-bounce m-4 h-8 w-8 rounded-full text-center lh-8 btn" @click="inc()">
      +
    </button>
    <button class="animated animated-jello m-4 h-8 w-8 rounded-full text-center lh-8 btn" @click="dec()">
      -
    </button>
  </div>
  <TabBar :active-index="1" />
</template>

<style lang="scss" scoped></style>
