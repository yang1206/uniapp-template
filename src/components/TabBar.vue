<script setup lang="ts">
withDefaults(defineProps<{ activeIndex: string | number }>(), {
  activeIndex: 0,
})
const active = ref()
const aColor = ref('#3CB4E5')
const unColor = ref('#84929A')
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
</script>

<template>
  <view>
    <block>
      <u-tabbar
        :value="active" :fixed="true" :active-color="aColor" :="unColor" :placeholder="false"
        safe-area-inset-bottom
      >
        <u-tabbar-item text="首页" icon="home" @click="changeTab" />
        <u-tabbar-item text="我的" icon="account" @click="changeTab" />
      </u-tabbar>
    </block>
  </view>
</template>
