<script setup lang="ts">
import { getGithub } from '@/api'
const { data } = await getGithub()
</script>

<template>
  <div class="mt-6 w-full inline-flex gap-2 text-center text-xl">
    <a class="i-line-md:github-loop icon-btn" rel="noreferrer" :href="data?.html_url" target="_blank" title="GitHub" />
  </div>
</template>
