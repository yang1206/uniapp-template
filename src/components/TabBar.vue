<script setup lang="ts">
const props = defineProps<{ activeIndex: string | number }>()
const size = ref('48rpx')
const aColor = ref('#3CB4E5')
const unColor = ref('#84929A')
const active = ref()
onShow(() => {
  active.value = props.activeIndex
})
const changeTab = (item: any, index: number) => {
  active.value = index
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
  <vin-tabbar
    v-model:visible="active" safe-area-inset-bottom :size="size" :active-color="aColor"
    :unactive-color="unColor" bottom @tab-switch="changeTab"
  >
    <vin-tabbar-item tab-title="首页" icon="home" />
    <vin-tabbar-item tab-title="Count" icon="my" />
  </vin-tabbar>
</template>
