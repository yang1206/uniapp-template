<script setup lang="ts">

</script>

<template>
  <div class="px-4 py-10 text-center font-sans text-gray-700">
    <div>
      <div class="i-carbon-campsite" inline-block text-80 />
      <p>
        <a rel="noreferrer" href="https://github.com/yang1206/uniapp-template" target="_blank">
          一个uniapp，vite，vue3的起始模版
        </a>
      </p>
      <p>
        <em class="text-sm op75">Opinionated Vite Starter Template</em>
      </p>

      <div class="py-4" />
      <Counter />
    </div>
    <div text-cyan class="content">
      <image class="logo" src="/static/logo.png" />
    </div>
  </div>
  <TabBar :active-index="0" />
</template>

<route type="home" lang="yaml">
style:
  navigationBarTitleText: 首页
</route>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo {
  margin-left: auto;
  margin-right: auto;
  margin-top: 200rpx;
  margin-bottom: 50rpx;
  width: 200rpx;
  height: 200rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
}
</style>
