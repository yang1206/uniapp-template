<script lang="ts" setup>
import type { UniPopupInstance } from '@uni-helper/uni-ui-types'
import { getGithub } from '@/api'

const { data } = getGithub()
const popup = ref<UniPopupInstance>()
function popOpen() {
  popup.value?.open?.('center')
}
</script>

<template>
  <div class="px-4 py-10 text-center font-sans text-gray-700 dark:text-gray-200">
    <Counter />
    <button @click="popOpen">
      弹出
    </button>
    <uni-popup ref="popup" type="center">
      <div class="h-400 w-400 bg-white">
        <uni-countdown show-day :hour="12" :minute="12" :second="12" />
      </div>
    </uni-popup>
  </div>
  <TabBar :active-index="1" />
</template>

<route  lang="json">
{
  "style": {
    "navigationStyle": "default",
    "navigationBarTitleText": "Count"
  }
}
</route>
