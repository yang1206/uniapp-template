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

<route  lang="yaml">
style:
  navigationBarTitleText: Count
</route>

<template>
  <tm-app>
    <div px-4 py-10 text-center font-sans text-gray-700 class="dark:text-gray-200">
      <p class="font-semibold">
        {{ useCount.count }}
      </p>

      <button class="rounded-full text-center lh-60 size-60 animated animated-bounce btn" @click="inc()">
        +
      </button>
      <button class="rounded-full text-center lh-60 size-60 animated animated-jello btn" @click="dec()">
        -
      </button>
      <button @click="popOpen">
        弹出
      </button>
      <uni-popup ref="popup" type="center" :safe-area="false">
        <div bg-white size-400>
          <uni-countdown show-day :hour="12" :minute="12" :second="12" />
        </div>
      </uni-popup>
    </div>
    <TabBar :active-index="1" />
  </tm-app>
</template>

<style lang="scss" scoped></style>
