import { appendDom, removeDom, updateDom } from "./dom"
import { Fiber } from "./fiber"
import { commitEffect } from "./useEffect"
/**
 * fiber tree 构建完成后执行commit
 */
export function commit() {
  commitDom(Fiber.wipRoot?.child)
  commitEffect()
  Fiber.curRoot = Fiber.wipRoot
  Fiber.wipRoot = undefined
}

function commitDom(fiber?: Fiber) {
  if (!fiber) return

  // 删除
  if (Fiber.deletions.length) {
    Fiber.deletions.map(fiber => removeDom(fiber))
    Fiber.deletions = []
  }
  // 添加
  if (fiber.effectTag === 'placement') {
    appendDom(fiber)
  }
  // 更新
  if (fiber.effectTag === 'update') {
    const oldProps = fiber.alternate?.props
    updateDom(fiber.dom!, fiber.props, oldProps)
  }

  commitDom(fiber.child)
  commitDom(fiber.sibling)
}
