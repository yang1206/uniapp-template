import { prototype } from "events"
import type { CRenderTypes,CRenderGraph,GraphShapeTypes,CRenderGraphsConfig} from "../interface"



// 图表基础配置表.
export interface chartBaseConfig {
	pie?:PIE.base,
	ring?:RING.base,
	line?:LINE.base,
	[key:string]:any
}
//PIE
export interface pieDrawType{
	setConfig:(config?:PIE.base)=>pieDrawType,
	setData:(data:Array<PIE.dataItemType>)=>pieDrawType,
	update:()=>pieDrawType,
	chart:()=>pieDrawType,
}
export namespace PIE {
	export interface base {
		gradien?:boolean,//是否渐变。
		legend?:{
			show?:boolean,
			textSize?:number,
		},
		label?:{
			show?:boolean,
			textSize?:number,
			lineWidth?:number,
			formart?:(item:PIE.dataItemType)=>string
		}
		,[key:string]:any
	}
	export interface dataItemType{
		name:string,
		value:number,
		color?:string,
		_zhanbi?:number,
		startzhanbi?:number,
		endzhanbi?:number,
		opts?:CRenderGraphsConfig
		formart?:(item:dataItemType)=>string;
		[key:string]:any
	}
	export interface labelOpts{
		name:string,
		x:number,
		y:number,
	}
}
//RING
export interface ringDrawType{
	setConfig:(config?:PIE.base)=>ringDrawType,
	setData:(data:Array<PIE.dataItemType>)=>ringDrawType,
	update:()=>pieDrawType,
	chart:()=>ringDrawType,
}
export namespace RING {
	export interface base extends PIE.base {
		lineWidth?:number,
		lineDash?:Array<number>
	}
	export interface dataItemType extends PIE.dataItemType {
		
	}
	export interface labelOpts extends PIE.labelOpts {
		
	}
}
// LINE折线
export type xLinesType  = Array<{
		x1:number,
		y1:number,
		x2:number,
		y2:number,
		color:string
	}>
export interface lineDrawType{
	setConfig:(config?:LINE.base)=>lineDrawType,
	setData:(data:Array<LINE.dataItemType>)=>lineDrawType,
	update:()=>pieDrawType,
	chart:()=>lineDrawType,
}
export namespace LINE {
	export interface base extends PIE.base {
		lineWidth?:number,//曲线的厚度.
		point?:number,//显示的曲线上面的点大小.
		smool?:boolean //是否是曲线,否则为折线.
	}
	export interface dataItemType extends PIE.dataItemType  {
		year?:string|number
	}
	export interface labelOpts extends PIE.labelOpts {
	}
}


//--------

// 配置回调结束应该出现的接口函数对象
export interface tmChartsType {
	render:CRenderTypes|null,
	pie:(selfConfig?:PIE.base)=>pieDrawType,
	ring:(selfConfig?:RING.base)=>ringDrawType,
	line:(selfConfig?:LINE.base)=>lineDrawType,
	
}
