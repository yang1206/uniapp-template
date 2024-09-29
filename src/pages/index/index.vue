<script lang="ts" setup>
import { fetchGitHubRepo } from '@/api'
import { useQuery } from '@tanstack/vue-query'

// #ifdef MP
const repo = ref('yang1206/uniapp-template')
const { data } = useQuery(computed(() => {
  return {
    ...fetchGitHubRepo(repo.value),
  }
}))
// #endif
</script>

<template>
  <div class="px-4 py-10 text-center text-gray-700 font-sans">
    <div>
      <div class="i-carbon-campsite" inline-block text-80 />
      <p>
        <!-- #ifdef MP-WEIXIN -->
        <a :href="data?.html_url" text-14px text-gray decoration-none op75 rel="noreferrer" target="_blank">
          一个uniapp，vite，vue3的起始模版
        </a>
        <!-- #endif -->
      </p>
      <div class="py-4" />
      <Counter />
    </div>
    <div flex="~ justify-evenly">
      <image class="logo" src="/static/logo.png" />
      <image class="logo" src="/static/vue.svg" />
      <image class="logo" src="/static/vite.svg" />
    </div>
  </div>
</template>

<route  lang="json">
{
  "style": {
    "navigationStyle": "default",
    "navigationBarTitleText": "Home"
  }
}
</route>

<style scoped>
.logo {
  width: 100rpx;
  height: 100rpx;
  margin-top: 200rpx;
  margin-bottom: 50rpx;
  text-decoration: none;
}
</style>
