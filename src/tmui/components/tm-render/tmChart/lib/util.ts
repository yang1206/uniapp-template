export function deepMerge(target:any = {}, source:any = {}) {
	target = uni.$tm.u.deepClone(target)
	if (typeof target !== 'object' || typeof source !== 'object') return false;
	for (var prop in source) {
		if (!source.hasOwnProperty(prop)) continue;
		if (prop in target) {
			if (typeof target[prop] !== 'object') {
				target[prop] = source[prop];
			} else {
				if (typeof source[prop] !== 'object') {
					target[prop] = source[prop];
				} else {
					if (target[prop].concat && source[prop].concat) {
						target[prop] = target[prop].concat(source[prop]);
					} else {
						target[prop] = deepMerge(target[prop], source[prop]);
					}
				}
			}
		} else {
			target[prop] = source[prop];
		}
	}
	return target;
}

export function measureText(text: string, fontSize: number, context: UniApp.CanvasContext | undefined) {
	var width = 0;
	text = String(text);
	// #ifdef MP-ALIPAY || MP-BAIDU || APP-NVUE
	context = undefined;
	// #endif
	if (context !== false && context !== undefined && context.setFontSize && context.measureText) {
		context.setFontSize(fontSize);
		return context.measureText(text).width;
	} else {
		var text = text.split('');
		for (let i = 0; i < text.length; i++) {
			let item = text[i];
			if (/[a-zA-Z]/.test(item)) {
				width += 7;
			} else if (/[0-9]/.test(item)) {
				width += 5.5;
			} else if (/\./.test(item)) {
				width += 2.7;
			} else if (/-/.test(item)) {
				width += 3.25;
			} else if (/:/.test(item)) {
				width += 2.5;
			} else if (/[\u4e00-\u9fa5]/.test(item)) {
				width += 10;
			} else if (/\(|\)/.test(item)) {
				width += 3.73;
			} else if (/\s/.test(item)) {
				width += 2.5;
			} else if (/%/.test(item)) {
				width += 8;
			} else {
				width += 10;
			}
		}

		return width * fontSize / 10;
	}
}
//是否是整数
export function isInteger(n: number) {
	return Number(n) % 1 === 0
}

/**
 * [groupingData 根据共同字段将数据分组]
 * @param {[type]} arr [数据源]
 * @param {[type]} field [字段名]
 */
// 传入两个参数 一个是待分组的数据 一个是按照哪个字段进行分组
export  function splitArrayAnyway(data: Array<any>, filed: string):Array<any>{
	// map用来保存存过的字段 为下边添加新对象或者将相同字段的数据保存到同一个list中
	let map: any = {};
	// dest主要保存分组后的数据
	let dest: Array<any> = [];
	// 循环遍历传入的data
	data.forEach(item => {
		// 判断map对象中是否有遍历时data的key 如果没有则向dest数组中推入一个新的对象(包含两个属性，一个要分组的字段名，一个保存相同字段名数据的数组)
		if (!map[item[filed]]) {
			dest.push({
				[filed]: item[filed],
				list: [item]
			});
			// 进行一次新添对象的记录
			map[item[filed]] = item;
			// 如果在map中有data遍历的key(字段相同) 则向dest数组里面的相同字段的list下推入数据
		} else {
			dest.forEach(dItem => {
				if (dItem[filed] == item[filed]) {
					dItem.list.push(item);
				}
			});
		}
	})
	return dest;
}


