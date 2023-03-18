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
  <tm-tabbar v-model:active="active" :auto-select="false">
    <tm-tabbar-item :blur="true" open-type="switchTab" active-color="orange" url="/pages/index/index" text="首页" unicon="http://img13.360buyimg.com/uba/jfs/t1/29316/38/1115/3203/5c0f3d61E35d0c7da/9e557f2cb5c9dab6.jpg" icon="http://img20.360buyimg.com/uba/jfs/t1/9996/36/8646/4833/5c0f3d61E7c1b7e0f/c98ad61124172e93.jpg" />
    <tm-tabbar-item :blur="true" active-color="orange" open-type="switchTab" url="/pages/count/count" text="Count" unicon="tmicon-account" icon="tmicon-userplus-fill" />
  </tm-tabbar>
</template>
