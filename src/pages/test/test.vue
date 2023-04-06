<script setup lang="ts">
import { getGithub } from '@/api'
const githubInfo = ref()
const getData = async () => {
  const data = await getGithub()
  githubInfo.value = data
}
getData()
const popup = ref()
const open = () => {
  popup.value.open()
}
</script>

<template>
  <text>
    测试router
  </text>
  <view>
    <text v-if="githubInfo" text-20>
      {{ githubInfo?.full_name }}
    </text>
  </view>
  <button @click="getData()">
    测试请求
  </button>
</template>
