import { Fiber } from "./fiber";
import { isFunctionComponent } from "./tool";
import { Ojb } from "./type";
/**
 * 删除dom
 */
export function removeDom(fiber?: Fiber) {
  if (!fiber) return

  if (isFunctionComponent(fiber)) {
    removeDom(fiber.child)
  }
  else {
    const parent = Fiber.findParent(fiber, 'dom')
    if (!parent) return
    parent.dom?.removeChild(fiber.dom!)
  }
}
/**
 * 将子节点添加到父节点
 */
export function appendDom(fiber: Fiber) {

  if (isFunctionComponent(fiber)) {
    return
  }

  let parent = Fiber.findParent(fiber, 'dom')

  if (parent) {
    // parent.dom.appendChild(fiber.dom)
    parent.dom?.appendChild(fiber.dom!)
  }
}
/**
 * 根据fiber生成真实dom
 */
export function createDom(fiber: Fiber) {
  if (fiber.type === Function) return undefined

  let dom = fiber.type === 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(fiber.type as string)

  updateDom(dom, fiber.props)

  return dom
}

/**
 * 更新真实节点
 * 1. old有,  new有   -> update属性
 * 2. old有,  new没有 -> 删除属性
 * 3. new有, old没有  -> add属性
 */
export function updateDom(
  dom: Element | Text,
  newProps: Ojb,
  oldProps: Ojb = {}
) {

  Object.keys(oldProps)
    .filter(key => key !== 'children')
    .forEach(key => {
      // 1. old有,  new有   -> update
      if (key in newProps) {
        setAttr(dom, key, newProps[key], oldProps[key])
      }
      // 2. old有,  new没有 -> 删除
      else {
        removeAttr(dom, key)
      }
    })

  // 3. new有, old没有  -> add
  Object.keys(newProps)
    .filter(key => key !== 'children')
    .forEach(key => {
      if (key in oldProps) return
      setAttr(dom, key, newProps[key])
    })

}

function setAttr(
  dom: Element | Text,
  key: string,
  value: any,
  oldValue?: any
) {
  if (key.startsWith("on")) {
    const eventType = key.slice(2).toLowerCase();
    const newCallback = value
    const oldCallback = oldValue
    dom.removeEventListener(eventType, oldCallback);
    dom.addEventListener(eventType, newCallback);
  } else {
    setAttribute(dom, key, value)
  }
}

function removeAttr(dom: Element | Text, key: string) {
  if (dom instanceof Element) {
    dom.removeAttribute(key)
  }
}

function setAttribute(
  dom: Element | Text,
  key: string,
  value: any
) {
  if (dom instanceof Element) {
    dom.setAttribute(key, value)
  } else {
    dom.textContent = value // 文本节点只有textContent一个属性, 且无法添加删除
  }
}