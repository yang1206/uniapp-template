<template>
  <div class="px-4 py-10 text-center font-sans text-gray-700">
    <div>
      <div class="i-carbon-campsite" inline-block text-80 />
      <p>
        <a text-14px text-gray decoration-none op75 rel="noreferrer" href="https://github.com/yang1206/uniapp-template" target="_blank">
          一个uniapp，vite，vue3的起始模版
        </a>
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
  margin-top: 200rpx;
  margin-bottom: 50rpx;
  width: 100rpx;
  height: 100rpx;
  text-decoration: none;
}
</style>
