<script lang="ts" setup>
import { useAppStore } from '@/store'

const { darkMode } = storeToRefs(useAppStore())
const page = ref(getCurrentPages()[0].route)
const activeIndex = ref()
const aColor = ref('#3CB4E5')
const unColor = ref('#84929A')
const size = ref('24rpx')
onShow(async () => {
  if (page.value === 'pages/index/index')
    activeIndex.value = 0
  if (page.value === 'pages/count/count')
    activeIndex.value = 1
})

function changeTab(_: any, index: number | string) {
  if (index === 0) {
    uni.switchTab({
      url: '/pages/index/index',
    })
  }
  else if (index === 1) {
    uni.switchTab({
      url: '/pages/count/count',
    })
  }
}
</script>

<template>
  <nut-config-provider :theme="darkMode ? 'dark' : ''">
    <slot />
    <!-- 支付宝小程序自定义 tabbar需要特殊处理 -->
    <!-- #ifndef MP-ALIPAY -->
    <nut-tabbar
      v-model="activeIndex" :size="size" :active-color="aColor" :unactive-color="unColor"
      safe-area-inset-bottom bottom placeholder @tab-switch="changeTab"
    >
      <nut-tabbar-item tab-title="Home" icon="home" @click="changeTab" />
      <nut-tabbar-item dot tab-title="Count" icon="my" @click="changeTab" />
    </nut-tabbar>
    <!-- #endif -->
  </nut-config-provider>
</template>

<style>
.header {
  color: #fff;
  background-color: black;
}
</style>
