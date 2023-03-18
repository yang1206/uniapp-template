import { tmCvOptsType } from ".";
import { shapeKeysType, shapeStyleType } from "./interface";
import rect from "./shape/rect";

export class shape {
    ctx:CanvasRenderingContext2D|null = null;
    opts:tmCvOptsType|null = null
    styleOpts:shapeStyleType = {
        fillColor:'#FF0000',
        lineWidth:0
    };
    private shapeKey:shapeKeysType|null = null;
    constructor(dom:CanvasRenderingContext2D|null,opts:tmCvOptsType,key:shapeKeysType,style?:shapeStyleType,draw?:Function){
        this.ctx = dom;
        this.opts = opts
        if(style){
            this.styleOpts = {...this.styleOpts,...style}
        }
        if(typeof draw !='undefined'){
            this.draw = draw.call(this);
        }else{
            
        }

    }
    draw(){
        let ctx = this.ctx;
        const {x,y,w,h,fillColor,lineWidth} = this.styleOpts;
        ctx.fillStyle = fillColor||"red"
        ctx.fillRect(x,y,w,h)
        // @ts-ignore
        if(ctx?.draw){
            // @ts-ignore
            ctx.draw()
        }

        // rect.call(this,this)
    }
}