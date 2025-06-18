import { commit } from "./commit"
import { Fiber } from "./fiber"
import { unitWork } from "./recocile"
import { useEffect } from "./useEffect"
import { useState } from "./useState"
import { createElement } from "./vdom"

requestIdleCallback(workLoop)

function workLoop(d: IdleDeadline) {
  const hasTime = () => d.timeRemaining() > 1

  while (hasTime() && Fiber.unitWork) {
    Fiber.unitWork = unitWork(Fiber.unitWork)
    // 局部更新fiber树, 的边界判断
    if (Fiber.wipRoot?.sibling === Fiber.unitWork) {
      Fiber.unitWork = undefined
    }

  }

  if (Fiber.wipRoot && !Fiber.unitWork) {
    commit()
  }

  requestIdleCallback(workLoop)
}

function render(fiber: Fiber) {
  // 第一次渲染
  // fiber.type是'div'
  if (!Fiber.curRoot) {
    Fiber.wipRoot = fiber
  }
  // 第二次渲染
  if (Fiber.curRoot && !Fiber.curRoot.alternate) {
    Fiber.wipRoot = {
      ...fiber,
      alternate: fiber
    }
  }
  // 第三次渲染(双缓存)
  if (Fiber.curRoot && Fiber.curRoot.alternate) {

    // 修改Fiber.curRoot.alternate, 将其变得和fiber一样
    Fiber.curRoot.alternate.type = fiber.type
    Fiber.curRoot.alternate.props = fiber.props

    Fiber.wipRoot = Fiber.curRoot.alternate
    Fiber.wipRoot.alternate = fiber
  }

  Fiber.unitWork = Fiber.wipRoot

}

const React = {
  createElement,
  render,
  useState,
  useEffect
}

export default React