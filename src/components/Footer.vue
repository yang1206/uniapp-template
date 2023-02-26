<script setup lang="ts">
import { getGithub } from '@/api'
const { data } = await getGithub()
</script>

<template>
  <div class="text-xl w-full text-center mt-6 inline-flex gap-2">
    <a class="icon-btn i-line-md:github-loop" rel="noreferrer" :href="data?.html_url" target="_blank" title="GitHub" />
  </div>
</template>
