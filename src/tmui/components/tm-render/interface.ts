export type animationName = 'linear'|'easeInSine'|'easeOutSine'|'easeInOutSine'|'easeInQuad'|'easeOutQuad'|'easeInOutQuad'|'easeInCubic'|'easeOutCubic'|'easeInOutCubic'|'easeInQuart'|'easeInQuart'|'easeOutQuart'|
'easeInOutQuart'|'easeInQuint'|'easeOutQuint'|'easeInOutQuint'|'easeInBack'|'easeOutBack'|'easeInOutBack'|'easeInElastic'|'easeOutElastic'|'easeInOutElastic'|'easeInBounce'|'easeInBounce'|'easeInOutBounce';
export type GraphShape = "circle"|"ellipse"|"rect"|"rectRound"|"ring"|"arc"|"sector"|"regPolygon"|"polyline"|"smoothline"|"bezierCurve"|"text"|"path"|"image"|"star"|"arrow";
export namespace  GraphShapeTypes{
    export interface circle{
        rx?:number,
        ry?:number,
        y?:number
    }
    export interface ellipse{
        rx?: number,
		ry?: number,
		hr?: number,
		vr?: number
    }
    export interface rect{
        x?: number,
		y?: number,
		w?: number,
		h?: number
    }
    export interface rectRound{
        x?: number,
		y?: number,
		w?: number,
		h?: number,
		radius?:[number,number,number,number],
		close?:number,//true时为填充，否则描边。
    }
    export interface ring{
        rx?:number,
        ry?:number,
        y?:number
    }
    export interface arc{
        rx?:number,
        ry?:number,
        y?:number,
        startAngle?: number,
		endAngle?: number,
		clockWise?: boolean
    }
    export interface sector{
        rx?:number,
        ry?:number,
        y?:number,
        startAngle?: number,
		endAngle?: number,
		clockWise?: boolean
    }
    export interface regPolygon{
        rx?:number,
        ry?:number,
        r?:number,
		side?: number
    }
    export interface polyline{
        points?: Array<[number,number]>,
		close?: boolean
    }
    export interface smoothline{
        points?: Array<[number,number]>,
		close?: boolean
    }
    export interface bezierCurve{
        points?: Array<[number,number]>,
		close?: boolean
    }
    export interface text{
        content?: string,
		position?: [number,number],
        maxWidth?:number,
		x?: number,
		y?: number,
		rowGap?: number
    }
    export interface path{
        points?: Array<number>,
		close?: boolean
    }
    export interface image{
        x?: number,
		y?: number,
		w?: number,
		h?: number,
		sx?: number,
		sy?: number,
		src?: string
    }
    export interface star{
        points?: Array<number>,
		close?: false,
		x?: number,
		y?: number,
		numPoints?: number, //星星的角数量
		innerRadius?: number, //内部凹进去的比例
		outerRadius?: number, //角向外凸出的比例。
    }
    export interface arrow{
        points?: Array<number>,
		close?: boolean,
		x?: number,
		y?: number,
		tension?: number, //弯曲程度。
		pointerLength?: number, //箭头指针长度。
		pointerWidth?: number, //箭头指针宽度。
		pointerAtBeginning?: boolean, //我们需要在两边画指针吗？默认值为 false。
		pointerAtEnding?: boolean, //结束端显示箭头。
		hitPoints?:  Array<number>, //检测命中点。
    }
    
}
export type CRenderGraphStyle = {
    //数据颜色 [0, 0, 0, 1]
  fill?: string|Array<number>,
  stroke?: string|Array<number>,
  opacity?: number,
  lineCap?: 'butt'|'round'|'square',
  lineJoin?: 'round'|'bevel'|'miter',

  lineDash?: Array<number>,
  lineDashOffset?: number,
  shadowBlur?: number,
  shadowColor?:  string|Array<number>,
  shadowOffsetX?: number,
  shadowOffsetY?: number,
  lineWidth?: number,
  graphCenter?: [number,number],
  scale?: [number,number],
  rotate?: number,
  translate?: [number,number],
  hoverCursor?: 'default'|'pointer'|'auto'|'crosshair'|'move'|'wait',
  fontStyle?: 'normal'|'italic'|'oblique',
  fontVarient?: 'normal'|'small-caps',

  fontWeight?: 'normal'|'bold'|'bolder'|'lighter'|number,
  fontSize?: number,
  fontFamily?:String,
  padding?:number,
  lineHeight?:number,//行高
  wrap?:boolean,//是否自动断行。
  ellipsis?:boolean,//一行，超过省略号。
  letterSpacing?:number,
  textDecoration?:'none'|'underline',
  textAlign?: 'start'|'end'|'left'|'right'|'center',
  textBaseline?: 'top'|'bottom'|'middle'|'alphabetic'|'hanging',

  gradientColor?: Array<string>,
  gradientType?: 'linear' | 'radial',
  /**
   * @description Gradient params
   * @type {Array}
   * @default gradientParams = null
   * @example gradientParams = [x0, y0, x1, y1] (Linear Gradient)
   * @example gradientParams = [x0, y0, r0, x1, y1, r1] (Radial Gradient)
   */
  gradientParams?: Array<number>,

  gradientWith?: 'stroke' | 'fill',
  /**
   * @description Gradient color stops
   * @type {String}
   * @default gradientStops = 'auto'
   * @example gradientStops = 'auto' | [0, .2, .3, 1]
   */
  gradientStops?: 'auto' | Array<number>,
  /**
   * @description Extended color that supports animation transition
   * @type {Array|Object}
   * @default colors = null
   * @example colors = ['#000', '#111', '#222', 'red' ]
   * @example colors = { a: '#000', b: '#111' }
   */
  colors?: null|Array<string>|{a?:string,b?:string,[key:string]:any},
  [key:string]:any
}
export type CRenderGraphShape = GraphShapeTypes.arc|GraphShapeTypes.arrow|GraphShapeTypes.bezierCurve|GraphShapeTypes.circle
|GraphShapeTypes.ellipse|GraphShapeTypes.image|GraphShapeTypes.path|GraphShapeTypes.polyline|GraphShapeTypes.polyline
|GraphShapeTypes.rect|GraphShapeTypes.rectRound|GraphShapeTypes.regPolygon|GraphShapeTypes.ring|GraphShapeTypes.sector
|GraphShapeTypes.smoothline|GraphShapeTypes.star|GraphShapeTypes.text
export interface CRenderGraphsConfig {
     name:GraphShape,
     visible?: boolean,
	 tmid?:string|number,
     drag?: boolean,

     hover?: boolean,

     index?: number,

     animationDelay?: number,

     animationFrame?: number,

     animationCurve?: animationName,

     animationPause?: boolean,

     hoverRect?: Array<number>,
	 hoverCheck?: Function|null,
	 hoverCheckProcessor?: Function|null,
	 _startAngle?:number,
     _endzhanbi?:number,
     mouseEnter?: (this:CRenderGraph,arg:{x:number,y:number})=>void,
     mouseOuter?: (this:CRenderGraph,arg:{x:number,y:number})=>void,
     mousedown?: (this:CRenderGraph,arg:{x:number,y:number})=>void,
     mouseup?: (this:CRenderGraph,arg:{x:number,y:number})=>void,
     click?: (this:CRenderGraph,arg:{x:number,y:number})=>void,
     touchmove?: (this:CRenderGraph,arg:{x:number,y:number,isCheck:boolean})=>void,
     touchstart?: (this:CRenderGraph,arg:{x:number,y:number,isCheck:boolean})=>void,
     touchend?: (this:CRenderGraph,arg:{x:number,y:number,isCheck:boolean})=>void,
	 
    shape?:CRenderGraphShape,
    style?:CRenderGraphStyle,
	[key:string]:any
    
}
export interface CRenderGraph extends CRenderGraphsConfig{
    animationQueue:Array<any>,
	graphs:Array<CRenderGraph>,
    attr:(key:"shape"|"style"|string,value:CRenderGraphStyle|CRenderGraphsConfig|CRenderGraphShape|string|number|boolean)=>void,
    animation:(key:"shape"|"style"|string,value:CRenderGraphStyle|CRenderGraphShape,isRender?:boolean)=>Promise<void>,
    animationEnd:()=>void,
    pauseAnimation:()=>void,
    playAnimation:()=>void,
    beforeAdd:()=>void,
    added:()=>void,
    beforeDraw:()=>void,
    drawed:()=>void,
    beforeDelete:()=>void,
    deleted:()=>void,
}
export interface CRenderTypes {
    dpr:number,
    ctx:UniApp.CanvasContext,
    area:Array<number>,
    graphs:Array<CRenderGraph>,
    add:(shape:CRenderGraphsConfig|Array<CRenderGraphsConfig>)=>CRenderGraph|Array<CRenderGraph>,
    delGraph:(graph:CRenderGraph|Array<CRenderGraph>)=>void,
    delAllGraph:()=>void,
    launchAnimation:()=>void | Promise<void>,
    animateAble:()=>boolean,
    clearArea:()=>void,
}
