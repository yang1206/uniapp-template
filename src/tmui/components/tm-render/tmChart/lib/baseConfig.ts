import type { chartBaseConfig,PIE,RING } from "../interface"
export const baseConfig = {
	pie:{
		gradien:false,
		legend:{
			show:false,
			textSize:11,
		},
		label:{
			show:true,
			textSize:11,
			lineWidth:2,
			_zhanbi:0,
			formart:(el:PIE.dataItemType)=>{
				return ""
			}
		}
	},
	ring:{
		lineWidth:16,
		lineDash:[],
		legend:{
			show:false,
			textSize:11,
		},
		label:{
			show:true,
			textSize:11,
			lineWidth:2,
			_zhanbi:0,
			formart:(el:RING.dataItemType)=>{
				return ""
			}
		}
	},
	line:{
		lineWidth:3,
		point:5,
		smool:false,//是否是曲线
		legend:{
			show:false,
			textSize:11,
		},
		label:{
			show:true,
			textSize:11,
			lineWidth:2,
			_zhanbi:0,
			formart:(el:RING.dataItemType)=>{
				return ""
			}
		}
	}
}