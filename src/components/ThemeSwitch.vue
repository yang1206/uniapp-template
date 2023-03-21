<script setup lang="ts">
import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia'
const store = useTmpiniaStore()
const dark = shallowRef(store.tmStore.dark)
// 方法一：调用pinia方法

const toggle = () => {
  store.setTmVuetifyDark(!store.tmStore.dark)
}
</script>

<template>
  {{ store.tmStore.dark }}
  <div v-if="store.tmStore.dark" class="i-line-md:moon-alt-loop" @click="toggle" />
  <div v-else class="i-line-md:moon-alt-to-sunny-outline-loop-transition" @click="toggle" />
</template>
