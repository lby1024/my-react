import { isTextNode, isVdom } from "./tool"
import { HTMLTagName, Ojb, VDomType } from "./type"

export type VDom = {
  type: VDomType
  props: any
}

/**
 * 生成文本虚拟dom
 */
export function createTextNode(text: string) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}
/**
 * 生成虚拟dom
 */
export function createElement(
  type: HTMLTagName,
  props: Ojb,
  ...children: any[]
) {

  // 当child为数组时, 需要将其拍平
  // [1,2, [3,4]] -> [1,2,3,4]
  // todo...
  // todo...
  // todo...


  // 当child是数字或string时, 需要将其变成textNode
  children = children.map(child => {
    if (isTextNode(child)) {
      return createTextNode(child)
    }

    if (isVdom(child)) {
      return child
    }

    return false
  })

  // 当child为 undefined, null, false时, 去掉该child
  // 场景: 
  //    let show = false; 
  //    { show && <Card /> }
  // [1,2, false] -> [1,2]
  children = children.filter(item => !!item)

  return {
    type,
    props: {
      ...props,
      children
    }
  }
}
