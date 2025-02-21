import { Fiber } from "./fiber"
import { isFunctionComponent } from "./tool"

export function useEffect(callback: Function, deps: any[]) {

  Fiber.wip?.effectHooks?.push({
    callback,
    deps,
    beforeCallback: undefined
  })

}

export function commitEffect() {
  function runEffects(fiber?: Fiber) {
    if (!fiber) return

    if (isFunctionComponent(fiber)) {
      runEffectHooks(fiber)
    }

    runEffects(fiber.child)
    runEffects(fiber.sibling)
  }

  function runBefore(fiber?: Fiber) {
    if (!fiber) return

    if (isFunctionComponent(fiber)) {
      runEffectsBefore(fiber)
    }

    runBefore(fiber.child)
    runBefore(fiber.sibling)
  }

  runBefore(Fiber.wipRoot)
  runEffects(Fiber.wipRoot)
}

function runEffectsBefore(fiber: Fiber) {
  if (!fiber.alternate) return

  const effectHooks = fiber.alternate.effectHooks

  effectHooks?.map(effectHook => {
    const deps = effectHook.deps
    if (deps.length > 0) {
      effectHook.beforeCallback && effectHook.beforeCallback()
    }
  })
}
/**
 * 执行fiber节点上的副作用函数
 */
function runEffectHooks(fiber: Fiber) {

  fiber.effectHooks?.map((effectHook, i) => {
    const run = shouldRun(fiber, i) // 判断副作用是否需要执行
    if (run === true) {
      effectHook.beforeCallback = effectHook.callback()
    }
  })

}

/**
 * 副作用函数需要执行的情况
 * 情况1: fiber.alternate不存在, 既是函数组件第一次执行
 * 情况2: oldState !== state
 */
function shouldRun(fiber: Fiber, index: number) {
  // 情况1: fiber.alternate不存在, 既是函数组件第一次执行
  if (!fiber.alternate) return true

  // 情况2: oldState !== state
  const effectHook = fiber.effectHooks![index]
  const oldEffectHook = fiber.alternate.effectHooks![index]
  // 只要有一个item满足state!==oldState, 就return true
  return effectHook.deps.some((state, i) => {
    const oldState = oldEffectHook.deps[i]
    return state !== oldState
  })
}
