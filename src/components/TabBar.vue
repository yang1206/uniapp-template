<script setup lang="ts">
const props = defineProps<{ activeIndex: string | number }>()
const aColor = ref('#3CB4E5')
const unColor = ref('#84929A')
function changeTab(index: number) {
  if (index === 0) {
    uni.switchTab({
      url: '/pages/index/index',
    })
  }
  else if (index === 1) {
    uni.switchTab({
      url: '/pages/count/count?id=12h12b1',
    })
  }
}
</script>

<template>
  <view>
    <block>
      <u-tabbar
        :value="activeIndex" :fixed="true" :active-color="aColor" :inactive-color="unColor" :placeholder="false"
        safe-area-inset-bottom
      >
        <u-tabbar-item text="首页" icon="home" @click="changeTab" />
        <u-tabbar-item text="Count" icon="plus-circle" @click="changeTab" />
      </u-tabbar>
    </block>
  </view>
</template>
