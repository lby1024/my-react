import { Fiber } from "./fiber"

export function isFunctionComponent(fiber?: Fiber) {
  if (!fiber) return false
  return typeof fiber.type === 'function'
}

export function isTextNode(child: any) {
  if (typeof child === 'string') return true
  if (typeof child === 'number') return true
}


export function isVdom(child: any) {
  if (child.type) {
    return true
  }
}
