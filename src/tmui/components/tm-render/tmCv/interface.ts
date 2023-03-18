export interface shapeStyleType {
    fillColor?:string,
    lineWidth?:number,
    x:number,
    y:number,
    w:number,
    h:number
}

export type shapeKeysType = 'rect'
/**定义对象字段的键值只能是规定的组件名称。 */
// type componentKeys = Partial<Record<componentKey, shapeStyleType>>
