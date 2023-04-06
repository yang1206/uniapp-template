<script setup lang="ts">
const props = defineProps<{ activeIndex: string | number }>()
const active = ref()
function changeTab(index: number) {
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
onShow(() => {
  active.value = props.activeIndex
})
</script>

<template>
  <u-tabbar :value="active" :fixed="true" :placeholder="false" :safe-area-inset-bottom="false">
    <u-tabbar-item text="首页" icon="home" @click="changeTab" />
    <u-tabbar-item text="我的" icon="account" @click="changeTab" />
  </u-tabbar>
</template>
