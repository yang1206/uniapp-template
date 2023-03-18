<template>
  <view :style="{ width: `${_width}rpx`, height: `${_height}rpx` }">
    <!-- #ifdef APP-NVUE -->
    <gcanvas
      v-if="show"
      @mouseup.stop="touchend"
      @mousedown.stop="touchstart"
      @mousemove.stop="touchmove"
      @touchend.stop="touchend"
      @touchmove.stop="touchmove"
      @touchstart="touchstart"
      :id="canvasId"
      :ref="canvasId"
      class="canvas"
      :style="{ width: `${_width}rpx`, height: `${_height}rpx` }"
    >
    </gcanvas>
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN || MP-ALIPAY || MP-QQ -->
    <canvas
      @mouseup.stop="touchend"
      @mousedown.stop="touchstart"
      @mousemove.stop="touchmove"
      @touchend.stop="touchend"
      @touchmove.stop="touchmove"
      @touchstart.stop="touchstart"
      type="2d"
      id="canvasId"
      canvas-id="canvasId"
      class="canvas"
      :style="{ width: `${_width}rpx`, height: `${_height}rpx` }"
    ></canvas>
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN || MP-ALIPAY || MP-QQ || APP-NVUE -->
    <canvas
      @mouseup.stop="touchend"
      @mousedown.stop="touchstart"
      @mousemove.stop="touchmove"
      @touchend.stop="touchend"
      @touchmove.stop="touchmove"
      @touchstart.stop="touchstart"
      :id="canvasId"
      :canvas-id="canvasId"
      class="canvas"
      :style="{ width: `${_width}rpx`, height: `${_height}rpx` }"
    ></canvas>
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
/**
 * render为画面绘制组件
 * @description 可以通过render组件对canvas组件进行操作并绘制相关内容。
 */
import { getCurrentInstance, computed, ref, onMounted, nextTick } from "vue";
import crender from "./crender/index.js";
import { tmCharts } from "./tmChart/tmChart";
import type {
  CRenderTypes,
  CRenderGraph,
  GraphShapeTypes,
  CRenderGraphsConfig,
} from "./interface";
import type { tmChartsType } from "./tmChart/interface";
// #ifdef APP-NVUE
import { enable, WeexBridge } from "../../tool/gcanvas/index.js";
const dom = uni.requireNativePlugin("dom");
// #endif
const { CRender, extendNewGraph, newGraph } = crender;
const emits = defineEmits(["onInit", "touchend", "touchstart", "touchmove"]);
const proxy = getCurrentInstance()?.proxy ?? null;
const props = defineProps({
  width: {
    type: Number,
    default: 750,
  },
  height: {
    type: Number,
    default: 500,
  },
});
let render: CRenderTypes;
const vnodeCtx = proxy;
const canvasId = ref("canvasId");
const sysinfo = uni.getSystemInfoSync();
const show = ref(true); //安卓上首次要隐藏不然卡。
let isAndroid = false;
// #ifdef APP-NVUE
isAndroid = uni.getSystemInfoSync().osName == "android";
show.value = false;
// #endif

let canvaConfig = {
  left: 0,
  top: 0,
  width: uni.upx2px(props.width),
  height: uni.upx2px(props.height),
};
// #ifndef MP-WEIXIN || MP-ALIPAY || MP-QQ
canvasId.value = "tm" + uni.$tm.u.getUid(5);
// #endif
let ctx: UniApp.CanvasContext;
let canvas2d: UniApp.CanvasContext;

const _width = computed(() => props.width);
const _height = computed(() => props.height);
onMounted(() => {
  // #ifdef APP-NVUE
  if (isAndroid) {
    setTimeout(function () {
      show.value = true;
    }, 200);
  } else {
    show.value = true;
  }
  // #endif
});

function init(): Promise<tmCharts> {
  return new Promise((res, rej) => {
    if (render) {
      res(render);
      return;
    }
    let delayTime = 150;
    if (isAndroid) {
      delayTime = 250;
    }
    // #ifdef APP-VUE
    delayTime = 50;
    // #endif

    setTimeout(async function () {
      // #ifdef APP-NVUE
      ctx = await drawNvue_init();

      // #endif
      // #ifdef MP-WEIXIN || MP-ALIPAY || MP-QQ
      const { ctx2d, canvas } = await MpWeix_init();
      ctx = ctx2d;
      canvas2d = canvas;

      // #endif

      // #ifndef MP-WEIXIN || MP-ALIPAY || MP-QQ || APP-NVUE
      ctx = await appvueH5Other();
      // #endif
      ctx.width = uni.upx2px(_width.value);
      ctx.height = uni.upx2px(_height.value);
      ctx["dpr"] = Math.ceil(sysinfo.pixelRatio);
      render = new CRender(ctx, proxy, canvas2d);
      render.dpr = Math.ceil(sysinfo.pixelRatio);

      res(new tmCharts(render));
    }, delayTime);
  });
}
//appvue,h5,和其它平台。
function appvueH5Other(): Promise<UniApp.CanvasContext> {
  return new Promise((resolve, reject) => {
    let c2d = uni.createCanvasContext(canvasId.value, vnodeCtx);
    uni
      .createSelectorQuery()
      .in(vnodeCtx)
      .select(".canvas")
      .boundingClientRect((result) => {
        canvaConfig.left = result?.left ?? 0;
        canvaConfig.top = result?.top ?? 0;
        c2d["dpr"] = sysinfo.pixelRatio;
        resolve(c2d);
      })
      .exec();
  });
}
//支付宝和微信，QQ 支持2d渲染。
function MpWeix_init(): Promise<{
  ctx2d: UniApp.CanvasContext;
  canvas: HTMLCanvasElement | null;
}> {
  return new Promise((resolve, rej) => {
    const query = uni.createSelectorQuery().in(vnodeCtx);
    // #ifdef MP-ALIPAY

    query
      .select("#canvasId")
      .node()
      .exec((res2) => {
        const canvas = res2[0].node;
        canvaConfig.left = res2[0].left;
        canvaConfig.top = res2[0].top;
        let ctxvb: UniApp.CanvasContext = canvas.getContext("2d");

        resolve({ ctx2d: ctxvb, canvas: canvas });
      });
    // #endif
    // #ifdef MP-WEIXIN || MP-QQ
    query
      .select("#canvasId")
      .fields({
        node: true,
        size: true,
        context: true,
      })
      .exec((res) => {
        canvaConfig.left = res[0].left;
        canvaConfig.top = res[0].top;
        // #ifdef MP-WEIXIN
        let canvas: any = res[0]?.node;
        let ctxvb: UniApp.CanvasContext = canvas.getContext("2d");
        const dpr = uni.getSystemInfoSync().pixelRatio;
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctxvb.scale(dpr, dpr);
        resolve({ ctx2d: ctxvb, canvas: canvas });
        // #endif

        // #ifdef MP-QQ
        resolve({ ctx2d: res[0].context, canvas: null });
        // #endif
      });
    // #endif
  });
}
function drawNvue_init(): Promise<UniApp.CanvasContext> {
  return new Promise((resolve, reject) => {
    /*获取元素引用*/
    var ganvas: any = vnodeCtx?.$refs[canvasId.value] ?? null;
    dom?.getComponentRect(ganvas, function (res: any) {
      canvaConfig.left = res?.size?.left ?? 0;
      canvaConfig.top = res?.size?.top ?? 0;
      /*通过元素引用获取canvas对象*/
      var canvasObj = enable(ganvas, {
        bridge: WeexBridge,
      });
      let cx = canvasObj.getContext("2d");
      resolve(cx);
    });
  });
}
function save(): Promise<string> {
  return new Promise((su, fa) => {
    if (!ctx) {
      uni.showToast({ title: "初始化失败", icon: "none" });
      fa("初始化失败");
      return;
    }
    let size = 500;
    // #ifdef APP-NVUE
    uni.showLoading({ title: "..." });
    // ctx.getImageData(0,0,props.width,props.height,function(res:imageData){
    // 	console.log(ArrayBufferToBase64(res.data).length)
    // 	fa(true)
    // 	uni.hideLoading()
    // })

    ctx.toTempFilePath(
      0,
      0,
      size,
      size,
      uni.upx2px(size),
      uni.upx2px(size),
      "png",
      1,
      function (res: any) {
        uni.hideLoading();
        console.log(res.errMsg);
        if (res.errMsg == "canvasToTempFilePath:ok") {
          su(res.tempFilePath);
        } else {
          fa(res.errMsg);
        }
      }
    );

    // #endif

    // #ifndef APP-NVUE

    uni.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: uni.upx2px(size),
      height: uni.upx2px(size),
      canvasId: canvasId.value,
      canvas: canvas2d,
      success: function (res) {
        // 在H5平台下，tempFilePath 为 base64
        su(res.tempFilePath);
      },
      fail: (res) => {
        fa(res);
      },
    });

    // #endif
  });
}

// ---------------
let dragGrpahId = "";
let isDrag = false;
let old_x = 0;
let old_y = 0;
function touchend(event: TouchEvent | MouseEvent) {
  let evx = 0;
  let evy = 0;
  //触摸
  if (event.type.indexOf("mouse") == -1 && event.changedTouches.length == 1) {
    evx = event.changedTouches[0]?.x ?? event.changedTouches[0]?.pageX;
    evy = event.changedTouches[0].y ?? event.changedTouches[0]?.pageY;
    //电脑端。
  } else {
    evx = event.pageX - canvaConfig.left;
    evy = event.pageY - canvaConfig.top;
  }

  let x = evx;
  let y = evy;
  dragGrpahId = "";
  isDrag = false;

  //在那个元素上离开的。
  let gps = render.graphs;
  let isClickGrpahs = gps.filter((el, index) => {
    if (el.name == "text") {
      el.hoverRect = [x, y, el.textWidth, el.textHeight];
    }
    console.log(el.hoverCheck([x, y], el));
    return el.hoverCheck([x, y], el) || el.hoverCheckProcessor([x, y], el);
  });

  if (isClickGrpahs.length > 0) {
    let nowgap = isClickGrpahs[0];
    // 执行元素上绑定的事件。
    if (nowgap[event.type])
      nowgap[event.type].call(nowgap, {
        x: x,
        y: y,
      });
  }
  //触发画板的事件。
  emits("touchend", {
    x: x,
    y: y,
    isCheck: isClickGrpahs.length > 0,
  });
}
function touchmove(event: TouchEvent | MouseEvent) {
  let evx = 0;
  let evy = 0;
  let isPc = false;
  //触摸
  if (event.type.indexOf("mouse") == -1 && event.changedTouches.length == 1) {
    evx = event.changedTouches[0]?.x ?? event.changedTouches[0]?.pageX;
    evy = event.changedTouches[0].y ?? event.changedTouches[0]?.pageY;
    isPc = false;
    //电脑端。
  } else {
    evx = event.pageX - canvaConfig.left;
    evy = event.pageY - canvaConfig.top;
    isPc = true;
  }

  let movex = evx - old_x;
  let movey = evy - old_y;
  let x = evx;
  let y = evy;
  // 触发发画板的事件
  emits("touchmove", {
    x: x,
    y: y,
  });
  if (isDrag == false) return;
  //在哪个元素移动的。
  let gps = render.graphs;
  let isClickGrpahs = gps.filter((el, index) => {
    return (
      (el.hoverCheck([x, y], el) || el.hoverCheckProcessor([x, y], el)) &&
      el.tmid == dragGrpahId
    );
  });

  if (isClickGrpahs.length > 0) {
    let nowgap = isClickGrpahs[0];
    if (isPc) {
      movex = evx - old_x;
      movey = evy - old_y;
    }
    if (
      (nowgap.drag === true && isDrag == true) ||
      (nowgap.drag === true && isPc == false)
    ) {
      if (
        nowgap.name == "circle" ||
        nowgap.name == "ellipse" ||
        nowgap.name == "ring" ||
        nowgap.name == "arc" ||
        nowgap.name == "regPolygon"
      ) {
        nowgap.attr("shape", {
          rx: movex,
          ry: movey,
        });
      } else if (
        nowgap.name == "rect" ||
        nowgap.name == "rectRound" ||
        nowgap.name == "path" ||
        nowgap.name == "image" ||
        nowgap.name == "star" ||
        nowgap.name == "arrow"
      ) {
        nowgap.attr("shape", {
          x: movex,
          y: movey,
        });
      } else if (nowgap.name == "text") {
        nowgap.attr("shape", {
          position: [movex, movey],
        });
      }

      // 执行元素上绑定的事件。
      if (nowgap[event.type])
        nowgap[event.type].call(nowgap, {
          x: movex,
          y: movey,
        });
      // if(nowgap['mousemove']||nowgap['touchmove']){

      // 	if (nowgap['mousemove']) nowgap.mousemove.call(nowgap,{x:movex,y:movey})
      // 	if (nowgap['touchmove']) nowgap.touchmove.call(nowgap,{x:movex,y:movey})
      // }
    }
    //配置不允许拖出边界。
    // if(this.dragGrpahId === nowgap.tmid
    // && movex+nowgap.shape.w<this.canvaConfig.width
    // && movey+nowgap.shape.h<this.canvaConfig.height
    // && x>=0&&y>=0&&movex>=0&&movey>=0
    // ){

    // }
    // this.$emit('shape:touchmove',{x:x,y:y,shape:nowgap})
  }
}
function touchstart(event: TouchEvent | MouseEvent) {
  let evx = 0;
  let evy = 0;
  let isPc = false;
  //触摸
  if (event.type.indexOf("mouse") == -1 && event.changedTouches.length == 1) {
    evx = event.changedTouches[0]?.x ?? event.changedTouches[0]?.pageX;
    evy = event.changedTouches[0].y ?? event.changedTouches[0]?.pageY;
    isPc = false;
    //电脑端。
  } else {
    evx = event.pageX - canvaConfig.left;
    evy = event.pageY - canvaConfig.top;
    isPc = true;
  }

  let x = evx;
  let y = evy;

  let gps = render.graphs;
  //点中了哪些图片，第一个是最顶层的，依次类推。
  let isClickGrpahs = gps.filter((el, index) => {
    // 要判断谁的层级高就是先托动谁。
    return el.hoverCheck([x, y], el) || el.hoverCheckProcessor([x, y], el);
  });

  if (isClickGrpahs.length > 0) {
    var indexOfMax = 0;
    var max = isClickGrpahs.reduce(
      (a, c, i) => (c.index > a ? ((indexOfMax = i), c.index) : a),
      0
    );
    let nowgap = isClickGrpahs[indexOfMax];

    if (nowgap.drag === true) {
      dragGrpahId = nowgap.tmid;
      let gapPos = [];
      if (
        nowgap.name == "circle" ||
        nowgap.name == "ellipse" ||
        nowgap.name == "ring" ||
        nowgap.name == "arc" ||
        nowgap.name == "regPolygon"
      ) {
        gapPos = [nowgap.shape.rx, nowgap.shape.ry];
      } else if (
        nowgap.name == "rect" ||
        nowgap.name == "rectRound" ||
        nowgap.name == "path" ||
        nowgap.name == "image" ||
        nowgap.name == "star" ||
        nowgap.name == "arrow"
      ) {
        gapPos = [nowgap.shape.x, nowgap.shape.y];
      } else if (nowgap.name == "text") {
        gapPos = nowgap.shape.position;
      }
      if (isPc) {
        old_x = evx - gapPos[0];
        old_y = evy - gapPos[1];
      } else {
        old_x = x - gapPos[0];
        old_y = y - gapPos[1];
      }

      isDrag = true;
    }
    // 执行元素上绑定的事件。

    if (nowgap[event.type])
      nowgap[event.type].call(nowgap, {
        x: x,
        y: y,
      });
  } else {
    dragGrpahId = "";
  }

  emits("touchstart", {
    x: x,
    y: y,
  });
}

//save保存当前渲染的图片,init重新初始化对象
defineExpose({ save, init: init });
</script>

<style></style>
