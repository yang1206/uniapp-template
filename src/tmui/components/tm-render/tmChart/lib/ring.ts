import { render } from "vue";
import type {CRenderGraph,CRenderTypes,CRenderGraphsConfig} from "../../interface"
import type { chartBaseConfig,RING } from "../interface"
import  { baseConfig } from "./baseConfig"
import  colors from "./colors"
import  {deepMerge,measureText,isInteger} from "./util"
export class ringDraw {
	private render:CRenderTypes|null = null;
	private config:RING.base
	private dataArray:Array<RING.dataItemType>=[]
	private GraptOpts:Array<CRenderGraphsConfig> = []
	private labels:Array<CRenderGraphsConfig> = []
	private textSize = 11
	constructor(render:CRenderTypes|null,config:RING.base=baseConfig.RING){
		this.config = {...baseConfig.RING,...config}
		this.render = render;
		this.setConfig(config)
		
		// #ifdef NVUE
		this.textSize = (config.label?.textSize??11) * (render?.dpr??1)
		// #endif
		return this;
	}
	setConfig(config:RING.base){
		if(!config) return this;
		this.config = deepMerge(this.config,config)
		return this;
	}
	// 获取文字的方向，是在左边还是在右边
	private getLabelDir(deg:number):'left'|'right'{
		const range = Math.PI/180;
		const zero = -range*90;
		const rulst = deg+zero;
		if(rulst>range*90){
			return "left"
		}
		return 'right';
		
	}
	private clear(isDel=true){
		let t = this;
		if(!t.render) return;
		const [w,h] = t.render?.area??[0,0];
		if(isDel){
			t.render?.delAllGraph();
		}
		t.render?.ctx.clearRect(0,0,w,h)
	}
	update(arg:{lineWidth:number}){
		if(!this.render) return;
		this.clear()
		//横轴线
		this.chart()
	}
	setData(data:Array<RING.dataItemType>=[]){
        if(!this.render) return this;
		this.clear()
		let that = this;
		if(data.length==0||!Array.isArray(data)) return this;
		// 计算数据信息。
		let totalCountArray = data.map(el=>el.value);
		let textSize = 	that.textSize
		if(that.render?.ctx.setFontSize){
			that.render?.ctx.setFontSize(textSize)
		}
		let textWidthAr:Array<number> = []
		
		//分割数据的起始和结束值。
		const splidata = [[0,totalCountArray[0]]]
		let totalCount = totalCountArray.reduce((a,b)=>{
			splidata.push([a,a+b])
			return a+b;
		})
		const [w,h] = this.render?.area??[0,0];
		const range = Math.PI/180;
		data = data.map((el,index)=>{
			let bilv = el.value/totalCount;
			let zhanbi = Number(bilv.toFixed(2))*100;
			el.startzhanbi = -range*90+Number((splidata[index][0]/totalCount).toFixed(2)) * 360*range;
			el.endzhanbi =-range*90+Number((splidata[index][1]/totalCount).toFixed(2)) * 360*range;
			el._zhanbi = zhanbi
			let text = (that.config.label?.formart(el)??"").trim()
			textWidthAr.push(Math.ceil(measureText(text?text:"100%"+"",textSize,that.render?.ctx)))
			return el;
		});
		
		let textWidth = Math.max(...textWidthAr)
		data = data.map((el,index)=>{
			let startzhanbi = el.startzhanbi??0;
			let endzhanbi =el.endzhanbi??0;
			let zhanbi =el._zhanbi??0;
			let color = el.color||colors[index];
			let rx =  w/2;
			let ry = rx;
			let r = w/2-10 - textWidth
			let opts:CRenderGraphsConfig = {
				name:"arc",
				animationFrame:45,
				animationCurve:"easeOutSine",
				index:1,
				shape:{
					rx:rx,
					ry:ry,
					r:r-(this.config?.lineWidth??0)/2,
					startAngle:-range*90,
					endAngle:range,
				},
				_startAngle:startzhanbi,
				_endzhanbi:endzhanbi,
				style:{
					scale:[1,1],
					lineWidth:this.config.lineWidth,
					stroke:color,
					shadowBlur:0,
					shadowColor:"rgba(0,0,0,0)",
					shadowOffsetX:3,
					shadowOffsetY:3,
					fontSize:11,
					lineCap:"butt",
					
				},
				async touchstart(this,{x,y,isCheck}){
					const scale = this.style?.scale??[1,1];
					that.render?.graphs.forEach(el=>el.attr("shape",{startAngle:el._startAngle,endAngle:el._endzhanbi}))
					that.render?.graphs.forEach(el=>el.attr("index",1))
					that.render?.graphs.forEach(el=>el.attr("style",{shadowBlur:0,shadowColor:"rgba(0,0,0,0)"}))
					this.attr("style",{shadowBlur:10,shadowColor:"rgba(0,0,0,0.5)"})
					this.attr("index",8)
					that.render?.graphs.forEach(el=>{
						let sl = el.style?.scale??[1,1];
						if(sl[0]!=1){
							el.animation('style',{scale:[1,1]})
						}
					})
					this.animation('style',{scale:[1.05,1.05]})
				}
			}
			
			if(this.config.lineDash&&Array.isArray(this.config.lineDash)){
				// #ifndef APP-NVUE
				if(this.config.lineDash.length>0){
					opts.style = Object.assign(opts.style,"lineDash")
					opts.style.lineDash = this.config.lineDash
				}
				// #endif
			}
			let dir = that.getLabelDir(endzhanbi)
			let x = rx;
			let y = ry;
			let txx = (startzhanbi+endzhanbi)/2;
			let ofx = Math.cos(txx)*r
			let ofy = Math.sin(txx)*r
			x = rx+ofx
			y = rx+ofy
			if(ofx<0){
				x =x - 10
			}else{
				x +=10
			}
			//角度在顶部
			if(txx>=0.78&&txx <=2.53 ){
				y+=12
			}
			//角度在底部
			if(txx<=-0.78&&txx >=3.92){
				y-=-12
			}
			let text =String(that.config.label?.formart(el)).trim();
			let content =  text?text:(isInteger(zhanbi)?zhanbi:zhanbi.toFixed(1))+"%"
			that.labels.push({
				name:"text",
				index:50,
				shape:{
					content:content,
					position:[x,y]
				},
				style:{
					fill:color,
					textBaseline:'bottom',
					textAlign:ofx<0?'right':'left',
					fontSize:that.textSize,
				}
			})
			
			return {...el,zhanbi:zhanbi,color:color,opts:opts}
		})
		this.dataArray = data;
		return this;
	}
	
	chart(){
		if(!this.render) return this;
		let opts = this.dataArray.map(el=>el.opts)
		
        if(!opts||typeof opts === 'undefined') return this;
		
		const graphs = this.render.add(opts)
        if(Array.isArray(graphs)){
		    graphs.reverse()
            graphs.forEach(el=>el.animation('shape',{startAngle:el._startAngle,endAngle:el._endzhanbi},true))
        }
		this.render?.launchAnimation()
		this.render.add(this.labels)
	}
}