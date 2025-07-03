import { Fiber } from "./fiber";
import React from "./react";
import { Hook } from "./type";

export function useState<T>(initValue: T) {
  const fiber = Fiber.wip

  const oldHook = fiber?.alternate?.hooks?.[Fiber.hookIndex]
  // 创建hook
  const hook: Hook = {
    state: oldHook ? oldHook.state : initValue,
    ququ: []
  }
  // 更新state
  oldHook?.ququ.forEach(fn => {
    hook.state = fn(oldHook.state)
  })
  // 保存hook
  fiber?.hooks?.push(hook)
  // 其他
  Fiber.hookIndex++

  function setState(value: any) {
    const cb: Function = typeof value === 'function'
      ? value
      : () => value

    if (hasChanged(cb) === false) return
    hook.ququ.push(cb)
    React.render(fiber!)
  }

  function hasChanged(callback: Function) {
    const state = callback(hook?.state)

    if (state !== hook.state) {
      return true
    }

    return false
  }

  type CB = (state: T) => any
  type SetState = (cb: T | CB) => void

  return [hook.state, setState] as [T, SetState]
}