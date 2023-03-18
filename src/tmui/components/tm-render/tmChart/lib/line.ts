import { deepClone } from "@/tmui/tool/function/util";
import { type } from "os";
import { nextTick, render } from "vue";
import type {CRenderGraph,CRenderTypes,CRenderGraphsConfig, GraphShape} from "../../interface"
import type { chartBaseConfig,LINE,xLinesType } from "../interface"
import  { baseConfig } from "./baseConfig"
import  colors from "./colors"
import  {deepMerge,measureText,isInteger,splitArrayAnyway} from "./util"
interface xlineItemType {
	name:string,
	list:Array<LINE.dataItemType>
}

export class lineDraw {
	private render:CRenderTypes|null = null;
	private config:LINE.base
	private dataArray:Array<xlineItemType>=[]
	//图形数组
	private GraptOpts:Array<CRenderGraphsConfig> = []
	//文字标签数组
	private labels:Array<CRenderGraphsConfig> = []
	//横轴数组。
	xline:xLinesType = [];
	//一般分5等分
	private keduDenjiY = 5;
	// 纵向每一刻度高的值是多少
	private keduDanNumberY = 0;
	// 真实像素的刻度值.
	private realDanNumberY = 0;
	
	// 真实像素的刻度值.
	private realDanNumberX = 0;
	// 横向的分割,
	private keduDenjiX = 6;
	//底部偏移量,防止贴边.
	private bottomOffset = 20
	//右间距
	private prOffset = 10
	// 左间距
	private plOffset = 10
	//圆点大小
	private pointR = 6
	private textSize = 11
	
	constructor(render:CRenderTypes|null,config:LINE.base=baseConfig.LINE){
		this.config = {...baseConfig.LINE,...config}
		this.render = render;
		this.setConfig(config)
		// #ifdef NVUE
		this.textSize = (config.label?.textSize??11) * (render?.ctx?.dpr??1)
		// #endif
		return this;
	}
	setConfig(config:LINE.base){
		if(!config) return this;
		this.config = deepMerge(this.config,config)
		this.pointR = this.config.point||6
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
		t.render?.ctx.clearRect(0,0,w,-h)
	}
	setData(data:Array<LINE.dataItemType|Array<LINE.dataItemType>>=[]){
        if(!this.render) return this;
		this.clear()
		let that = this;
		if(data.length==0||!Array.isArray(data)) return this;
		const [w,h] = this.render?.area??[0,0];
		// 处理数据为二维。这里处理的格式，主要是用来兼容pie,ring,line之间的数据转换要转换成功，
		//数据都必须原始的一维数据。
		let chulidata:Array<any>
		if(typeof data[0] === 'object'&&Array.isArray(data[0])){
			// 已经是多条线的二维数据。无需处理。
			chulidata = [...data]
		}else{
			chulidata = [[...data]]
		}
		
		// 找到最大值。
		let flatArrayValue = data.flatMap(el=>el.value);
		let MinValue = Math.min(...flatArrayValue)
		let MaxValue = Math.max(...flatArrayValue)
		let MaxTextWidth = measureText(String(MaxValue),11,this.render.ctx)
		// 计算刻度值从0开始到最大值，的粒度是多少。
		//每一刻度代表的值分量。共5等分。
		this.keduDanNumberY = Math.ceil(MaxValue / (this.keduDenjiY))
		// 真实的高度等分值为真实的画布高/等分数量。
		let realDanNumber = Math.ceil((h-this.bottomOffset) / this.keduDenjiY)
		this.realDanNumberY = realDanNumber;
		//输出横轴的坐标点数组,中心点是从左下角开始计算.
		this.xline = [];
		this.plOffset = Math.ceil(MaxTextWidth+10);
		let safeX = this.plOffset;
		for(let i=0;i<this.keduDenjiY;i++){
			let color = chulidata[0][0]?.color||colors[i];
			this.xline.push({
				x1:safeX,
				y1:-i*realDanNumber-this.bottomOffset,
				x2:w,
				y2:-i*realDanNumber-this.bottomOffset,
				color:color
			})
		}
		this.xline = deepClone(this.xline)
		// 对数据类型进行分组,不同的name表示一组数据.
		let flatArray = data.flat()
		//一行一条数据,按类型分组数据.
		let dataArray:Array<xlineItemType> = splitArrayAnyway(flatArray,'name')
		// 不同的年份表示紧身分割的数据.
		//横向分组,按年份
		let xDataArray:Array<xlineItemType> = splitArrayAnyway(flatArray,'year')
		// 找到横向点最多的一组
		let allPointmaxArrayNum = [];
		//找到数组中最长的一个数组长度.
		function findMaxArrayLen(data:Array<any>):Array<number>{
			let maxnum:Array<number> = [];
			if(Array.isArray(data)){
				data.forEach(el=>{
					if(Array.isArray(el?.list)){
						maxnum.push(el?.list.length)
						maxnum.push(...findMaxArrayLen(el?.list))
					}
				})
			}
			return maxnum;
		}
		
		this.keduDenjiX = Math.max(...findMaxArrayLen(dataArray))-1;
		this.keduDenjiX = Math.max(this.keduDenjiX,1) //保证不为1以下数字.
		let realDanNumberX = Math.ceil((w-this.plOffset-this.pointR*2) / this.keduDenjiX )
		this.realDanNumberX = realDanNumberX
		// this.dataArray = data;
		//计算一行内的每个点的坐标.是负数开始.
		dataArray = dataArray.map((el,index)=>{
			el.list = el.list.map((children,chilindex)=>{
				let color = children?.color||colors[index];
				return {
					...children,
					color:color,
					_xy:{
						x:Math.ceil((realDanNumberX) * chilindex+safeX),
						y: Math.ceil((children.value / MaxValue) * (h-this.bottomOffset)-this.bottomOffset),
					}
				}
			})
			return el;
		})
		
		this.dataArray = dataArray;
		
		return this;
	}
	// 创建横轴标线.如果不需要不创建即可.
	private createXLineShape(){
		let linGraps = this.xline.map((el,index)=>{
			let opts:CRenderGraphsConfig = {
				name:"polyline",
				animationFrame:45,
				animationCurve:"easeOutSine",
				index:1,
				shape:{
					points:[[el.x1,el.y1],[el.x2,el.y2]]
				},
				style:{
					lineWidth:1,
					stroke:'rgba(255,255,255,0.2)',
					fontSize:11,
					lineCap:"round",
				},
				async touchstart(this,{x,y,isCheck}){
					
				}
			}
			return opts;
		})
		
		return linGraps;
	}
	//创建数据的实心点点,如果不需要不创建即可.
	private cretaeXyPoint(){
		let opts:Array<CRenderGraphsConfig> = []
		this.dataArray.forEach((el,index)=>{
			el.list.forEach((children,chilindex)=>{
				let opts_self:CRenderGraphsConfig = {
					name:"circle",
					animationFrame:45,
					animationCurve:"easeOutSine",
					index:1,
					shape:{
						rx:children?._xy.x+this.pointR-2,
						ry:Math.min(Math.ceil(-children?._xy.y-this.bottomOffset+this.pointR),-this.bottomOffset),
						r:this.pointR-2
					},
					style:{
						fill:"#FFFFFF",
						lineWidth:1,
						stroke:children.color,
						fontSize:11,
						lineCap:"round",
					},
					async touchstart(this,{x,y,isCheck}){
						
					}
				}
				opts.push(opts_self)
			})
			
		})
		return opts;
	}
	// 绘制线条,折线或者曲线.
	private cretaeXYSmooleLine(){
		let opts:Array<CRenderGraphsConfig> = []
		let lineType:GraphShape = "polyline"
		if(this.config.smool){
			lineType = "smoothline"
		}
		this.config.smool
		this.dataArray.forEach((el,index)=>{
			let opts_self:CRenderGraphsConfig = {
				name:lineType,
				animationFrame:45,
				animationCurve:"easeOutSine",
				index:1,
				_name:"line",
				shape:{
					points:[],
					close:false
				},
				style:{
					lineWidth:this.config.lineWidth,
					stroke:"",
					fontSize:11,
					lineCap:"round",
				},
				async touchstart(this,{x,y,isCheck}){
					
				}
			}
			
			el.list.forEach((children,chilindex)=>{
				opts_self.shape?.points.push([children._xy.x+this.pointR-2,Math.min(Math.ceil(-children?._xy.y-this.bottomOffset+this.pointR),-this.bottomOffset)])
				opts_self.style.stroke = children.color
				
			})
			opts.push(opts_self)
		})
		
		return opts;
	}
	update(arg:{lineWidth:number}){
		if(!this.render) return;
		this.clear()
		//横轴线
		this.render?.add([...this.createXLineShape(),...this.cretaeXYSmooleLine(),...this.cretaeXyPoint()])||[]
		// let lines = this.render?.add(this.cretaeXYSmooleLine())||[]
		//点阵
		// let graphsXPoint = this.render?.add(this.cretaeXyPoint())||[]
	}
	chart(){
		// if(!this.render||this.dataArray.length==0) return this;
		const [w,h] = this.render?.area??[0,0];
		this.render?.ctx.translate(0,h)
		this.render?.add([...this.createXLineShape(),...this.cretaeXYSmooleLine(),...this.cretaeXyPoint()])||[]
		
		return this;
	}
}