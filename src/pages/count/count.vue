<script lang="ts" setup>
import type { UniPopupInstance } from '@uni-helper/uni-ui-types'
import { useCounterStore } from '@/store'

const useCount = useCounterStore()
const { inc, dec } = useCount
const popup = ref<UniPopupInstance>()
function popOpen() {
  popup.value?.open?.('center')
}
</script>

<template>
  <div class="px-4 py-10 text-center font-sans text-gray-700 dark:text-gray-200">
    <p class="font-semibold">
      {{ useCount.count }}
    </p>

    <div class="mx-200 my-20 flex gap-20">
      <button class="f-c-c rounded-full lh-60 size-60 animated animated-bounce btn" @click="inc()">
        +
      </button>
      <button class="f-c-c rounded-full lh-60 size-60 animated animated-jello btn" @click="dec()">
        -
      </button>
    </div>
    <button @click="popOpen">
      弹出
    </button>
    <uni-popup ref="popup" type="center">
      <div class="bg-white size-400">
        <uni-countdown show-day :hour="12" :minute="12" :second="12" />
      </div>
    </uni-popup>
  </div>
  <TabBar :active-index="1" />
</template>
