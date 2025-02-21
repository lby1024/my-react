import { createDom } from "./dom"
import { Fiber } from "./fiber"
import { isFunctionComponent } from "./tool"
import { VDom } from "./vdom"

export function unitWork(fiber: Fiber): Fiber | undefined {

  if (isFunctionComponent(fiber)) {
    updateFunctionComponet(fiber)
  }
  else {
    updateHostComponent(fiber)
  }

  return getNextUnit(fiber)
}


function getNextUnit(fiber: Fiber): Fiber | undefined {
  if (fiber.child) return fiber.child
  if (fiber.sibling) return fiber.sibling
  const parent = Fiber.findParent(fiber, 'sibling')
  if (parent) return parent.sibling
  return
}


function updateFunctionComponet(fiber: Fiber) {
  Fiber.wip = fiber
  Fiber.hookIndex = 0
  fiber.hooks = []
  fiber.effectHooks = []
  const fn = fiber.type as Function
  const child = fn(fiber.props)
  recocile(fiber, [child])
}

function updateHostComponent(fiber: Fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  recocile(fiber, fiber.props.children)
}


function recocile(fiberParent: Fiber, children: VDom[]) {
  Fiber.createFibers(fiberParent, children, (newFiber, i, brother) => {
    newFiber.return = fiberParent
    if (i === 0) {
      fiberParent.child = newFiber
    }
    if (brother) {
      brother.sibling = newFiber
    }
  })
}