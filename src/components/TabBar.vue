<script setup lang="ts">
const props = defineProps<{ activeIndex: string | number }>()
const active = ref()
onShow(() => {
  active.value = props.activeIndex
})
</script>

<template>
  <tm-tabbar v-model:active="active" :auto-select="false">
    <tm-tabbar-item :blur="true" open-type="switchTab" active-color="orange" url="/pages/index/index" text="首页" icon="tmicon-collection-fill" />
    <tm-tabbar-item :blur="true" active-color="orange" open-type="switchTab" url="/pages/count/count" text="Count" unicon="tmicon-account" icon="tmicon-userplus-fill" />
  </tm-tabbar>
</template>
