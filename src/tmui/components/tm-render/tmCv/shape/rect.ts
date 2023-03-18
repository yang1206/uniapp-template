import { shape } from "../shape";

export default function(shape?:shape){
    
    if(!shape||!shape?.ctx) return;
    
    let ctx = shape.ctx;
    const {x,y,w,h,fillColor,lineWidth} = shape.styleOpts;
    ctx.fillStyle = fillColor||"red"
    ctx.fillRect(x,y,w,h)
    // @ts-ignore
    if(ctx?.draw){
        // @ts-ignore
        ctx.draw()
    }
    console.log(shape.styleOpts)
}