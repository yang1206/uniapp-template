// @ts-expect-error
import * as TWEEN from "@/tmui/tool/lib/tween.min.js";
import { getCanvas } from "@/tmui/tool/function/getCanvas";
// #ifdef APP-NVUE
import { enable, WeexBridge } from "@/tmui/tool/gcanvas/index.js";
const dom = uni.requireNativePlugin("dom");
// #endif
import { ComponentPublicInstance } from "vue"
import rect from "./shape/rect";
import { shape } from "./shape";
export interface tmCvOptsType {
    left?: number,
    top?: number,
    width: number,
    height: number,
    dpr?: number
}
/**
 * tmCv是tmui作者专为uniapp或者无dom下定制轻量级的canvas绘制插件
 * 非常轻量类jQ的链式调用，大道至简。
 */
export class tmCv {
    private requestIdleCallback:Function|null = null
    private requestAnimationFrame:Function|null = null
    /**onFramdi，关闭时需要注销 */
    private timid:any = null;
    ctx:CanvasRenderingContext2D|null = null;
	private canvasId:string = ""
	private proxy:ComponentPublicInstance|null = null;
    private opts:tmCvOptsType = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        dpr: 1
    }
    constructor(proxy:ComponentPublicInstance,domId:string,opts?:tmCvOptsType){
		this.canvasId = domId;
		this.proxy = proxy;
		if(typeof opts !== 'undefined'){
		    this.opts = {...this.opts,...opts}
		}
    }
	init():Promise<tmCv>{
		return this._getNodes(this.proxy)
	}
	private _getNodes(proxy:ComponentPublicInstance|null):Promise<tmCv>{
		let t = this;
		let sys = uni.getSystemInfoSync()
		function initOpts(node:any){
			try {
			    if(typeof window !=='undefined'){
			        t.requestIdleCallback = window.requestIdleCallback;
			        t.requestAnimationFrame = window.requestAnimationFrame;
			    }
			    // @ts-expect-error
			    if(node&&node !==null && typeof node !='undefined' && node?.requestAnimationFrame&&this.requestAnimationFrame == null){
			        t.requestAnimationFrame = node.requestAnimationFrame
			        t.requestIdleCallback = node.cancelAnimationFrame
			    }
			    if(t.requestAnimationFrame == null){
			        t.requestAnimationFrame = uni.$tm.u.requestAnimationFrame;
			        t.requestIdleCallback = uni.$tm.u.cancelAnimationFrame
			    }
			} catch (error) {
			    console.error("tmCv:",error)
			}
			
			function updateFrame(){
			    TWEEN.update()
			    t.timid = uni.$tm.u.requestAnimationFrame(updateFrame)
			}
			updateFrame()
		}
		return new Promise((res,rej)=>{
			if(!t.proxy) {
				res(t)
				return;
			}
			let delay = 10
			// #ifdef APP-NVUE
			let isAndroid = sys.osName == "android";
			if (isAndroid) {
				delay = 250
			} else {
				delay = 100
			}
			// #endif
			// #ifdef MP
			delay = 60
			// #endif
			// #ifdef APP-VUE
			delay = 30
			// #endif
			// #ifdef APP-NVUE
			setTimeout(() => {
				/*获取元素引用*/
				let domId = t.canvasId.replace(/[\.|#]/g,"")
				var ganvas: any = proxy?.$refs[domId] ?? null;
				dom?.getComponentRect(ganvas, function(res: any) {
					t.opts.left = res?.size?.left ?? 0;
					t.opts.top = res?.size?.top ?? 0;
					t.opts.dpr = sys.pixelRatio;
					// @ts-ignore
					getCanvas(t.proxy, domId, t.opts.width, t.opts.height).then((e) => {
						t.ctx = e.ctx
						initOpts(e.node)
						res(t)
					}).catch(error => {
						console.error(error)
					})
					
				});
				
			}, delay);
			// #endif
			// #ifndef APP-NVUE
			setTimeout(() => {
				
				uni
					.createSelectorQuery()
					.in(proxy)
					.select(".canvas")
					.boundingClientRect((result) => {
			        	// @ts-ignore
						t.opts.left = result?.left ?? 0;
						// @ts-ignore
						t.opts.top = result?.top ?? 0;
						t.opts.dpr = sys.pixelRatio;
						// @ts-ignore
						getCanvas(t.proxy, t.canvasId,t.opts.width, t.opts.height).then((e) => {
							t.ctx = e.ctx
							e.ctx.fillStyle = 'red'
							e.ctx.fillRect(0,0,100,100)
							if(e.ctx.draw){
								e.ctx.draw()
							}

							console.log(e)
							return
							initOpts(e.node)
							res(t)
						}).catch(error => {
							
						})
					})
					.exec();
			}, delay);
			// #endif
		})
		
	}
    
    /**注销tmCv */
    destory(){
        if(!this.requestIdleCallback) return;
        this.requestIdleCallback(this.timid)
    }

    rect(arg={x:0,y:0,w:0,h:0}){
		if(!this.ctx) return
		let ctx = this.ctx;
		
		const {x,y,w,h} = arg;
        ctx.setFillStyle("red")
        ctx.fillRect(0,0,100,100)
        if(ctx.draw){
            ctx.draw()
        }
		console.log(ctx)
		return
		new shape(this.ctx,this.opts,'rect',arg).draw()
		// console.log(new shape(this.ctx,this.opts,'rect',arg))

        // if(!this.ctx) return
        // let ctx = this.ctx;
        // this._rect(arg,ctx)
        // const rfun = this._rect
        // return {
        //     animation:function<T>(to:T){
        //         let t = this
        //         return new Promise((res,rej)=>{
        //             new TWEEN.Tween(arg)
        //             .to(to,750)
        //             .easing(TWEEN.Easing.Quadratic.InOut)
        //             .onUpdate((e:any)=>{
        //                 rfun(e,ctx)
        //             })
        //             .onStart(()=>{})
        //             .onStop(()=>{})
        //             .onComplete(()=>{
        //                 res(t)
        //             })
        //             .start();
        //         })
                
        //     }
        // }
    }
    _rect(arg={x:0,y:0,w:0,h:0},ctx:CanvasRenderingContext2D){
        const {x,y,w,h} = arg;
        ctx.fillStyle = "red"
        ctx.fillRect(x,y,w,h)
        if(ctx.draw){
            ctx.draw()
        }
    }
    animation<T>(shape:Function,arg:T,duration=1000){
        if(!this.ctx) return;
        let ctx = this.ctx;
        function rect(arg={x:10}){
            ctx.fillStyle = "red"
            ctx.fillRect(arg.x, 10, 150, 75)
            if(ctx.draw){
                ctx.draw()
            }
        }

        new TWEEN.Tween({x:10})
        .to({x:750},750)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate((e:any)=>{
            console.log(e.x)
            rect({x:e.x})
        })
        .start();
    }
}