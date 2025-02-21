import React from "./core/react"
import { Counter } from "./component/counter"
import { Switch } from "./component/switch"
import { Switch2 } from "./component/switch2"
import { Show } from "./component/show"
import { TestUseEffect } from "./component/testUseEffect"

export const APP = () => {

  return (
    <div id='app'>
      <Counter name='counter-a' />
      <Counter name='counter-b' />
      <Switch />
      <Switch2 />
      <Show />
      <TestUseEffect />
    </div>
  )
}