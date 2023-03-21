<script setup lang="ts">
import { useTitle } from '@/composables/useTitle'
import { router } from '@/router'
import { useCounterStore } from '@/store'
const useCount = useCounterStore()
const { title, changeTitle } = useTitle()
const showWin = ref(false)
const showWin2 = ref(false)
const showWin3 = ref(false)
const pos = ref('bottom')

function goTest() {
  router.push({
    type: 'navigateTo',
    path: 'pages/test/test',
  })
}
</script>

<template>
  <tm-app>
    <div px-4 py-10 text-center font-sans text-gray-700 class="dark:text-gray-200">
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
        <p class="font-semibold">
          {{ useCount.count }}
        </p>
      </div>
      <div text-cyan class="content">
        <image class="logo" src="/static/logo.png" />
        <ThemeSwitch />
        <div class="text-area">
          <p text-yellow class="title">
            {{ title }}
          </p>
        </div>
        <div @click="changeTitle">
          changeTitle
        </div>
        <tm-button shape="square" type="info" @click="goTest">
          test
        </tm-button>
        <tm-button
          block :margin="[12, 12]" :padding="[24, 0]" color="cyan"
          :height="56" :font-size="24" label="通过插槽触发弹层" @click="showWin = true"
        />
        <tm-drawer v-model:show="showWin" :placement="pos">
          <tm-button :margin="[12, 12]" color="green" :width="160" :height="56" :font-size="24" label="内弹出盖内部" @click="showWin2 = true" />
          <tm-button :margin="[12, 12]" color="green" :width="160" :height="56" :font-size="24" label="内弹出盖全屏" @click="showWin3 = true" />
          <tm-drawer v-model:show="showWin2" in-content :width="300" :height="300" :placement="pos" />
          <tm-drawer v-model:show="showWin3" :width="300" :height="300" :placement="pos" />
          <tm-sheet :margin="[32, 0, 32, 32]" :shadow="4" :round="2" color="orange" outlined>
            <tm-text :font-size="24" _class="font-weight-b" label="带边框,背景透明" />
          </tm-sheet>
          <tm-sheet color="blue-grey" outlined :round="3">
            <tm-sheet color="green" outlined :round="3">
              <tm-sheet color="red" outlined :round="3">
                <tm-sheet color="green" outlined text :round="3">
                  <tm-text :font-size="24" _class="font-weight-b" label="可以无限嵌套" />
                </tm-sheet>
              </tm-sheet>
            </tm-sheet>
          </tm-sheet>
          <tm-result color="green" status="success" />
          <!-- inContent -->
        </tm-drawer>
      </div>
    </div>
    <TabBar :active-index="0" />
  </tm-app>
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
