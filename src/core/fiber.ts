import { EffectHook, Hook, VDomType } from "./type"
import { VDom } from "./vdom"

export class Fiber {
  static unitWork?: Fiber // 工作单元
  static wipRoot?: Fiber // 正在绘制
  static curRoot?: Fiber // 绘制完成
  static wip?: Fiber  // 这在执行的函数组件对应的Fiber
  static hookIndex: 0
  static deletions: Fiber[] = []

  type: VDomType
  props: { [key: string]: any }
  effectTag?: 'placement' | 'update'
  child?: Fiber
  sibling?: Fiber
  return?: Fiber
  dom?: Element | Text
  alternate?: Fiber
  hooks?: Hook[]
  effectHooks?: EffectHook[]
  /**
   * 创建新的fiber
   */
  constructor(vdom: VDom) {
    this.effectTag = 'placement'
    this.type = vdom.type
    this.props = vdom.props
    this.dom = undefined
    this.alternate = undefined
    this.child = undefined
    this.sibling = undefined
    this.return = undefined
  }
  /**
   * 复用旧的fiber
   */
  static copy(oldFiber: Fiber, vdom?: VDom): Fiber {
    return {
      effectTag: 'update',
      type: oldFiber.type,
      props: vdom?.props || oldFiber.props,
      dom: oldFiber.dom,
      alternate: oldFiber,
      child: undefined,
      sibling: undefined,
      return: undefined,
    }
  }

  /**
   * 查找存在dom的父节点
   * let parent = Fiber.findParent(fiber, 'dom')
   * 查找存在sibling的父节点
   * const parent = Fiber.findParent(fiber, 'sibling')
   */
  static findParent(fiber: Fiber, key: keyof Fiber) {
    let parent = fiber.return

    while (parent && !parent[key]) {
      parent = parent.return
    }

    if (parent && parent[key]) {
      return parent
    }
  }

  /**
   * 创建fiber
   * 类型没有发生变化: 复用
   * 类型发生变化: 不复用
   */
  static createFiber(vdom: VDom, oldfiber?: Fiber) {

    const sameType = vdom.type === oldfiber?.type

    if (sameType) {
      return Fiber.copy(oldfiber, vdom)
    }

    if (oldfiber) {
      Fiber.deletions.push(oldfiber)
    }

    return new Fiber(vdom)
  }

  static createFibers(
    parentFiber: Fiber,
    children: VDom[],
    callback: (newFiber: Fiber, i: number, brother: Fiber) => void
  ) {

    let oldFiber = parentFiber.alternate?.child
    let brother: Fiber
    children.map((vdom, i) => {
      const newFiber = Fiber.createFiber(vdom, oldFiber)
      callback(newFiber, i, brother)
      brother = newFiber
      oldFiber = oldFiber?.sibling
    })

    while (oldFiber) {
      Fiber.deletions.push(oldFiber)
      oldFiber = oldFiber.sibling
    }
  }

}