import React from "../core/react"

let p = { name: '1111111' }

export const Counter = (props: any) => {
  console.log('render', props.name);

  const [n, setN] = React.useState(11)

  function click() {
    p = { name: '2' }
    setN(n => n + 1)
  }
  return <div {...p}>
    <h1>{props.name}: {n}</h1>
    <button onClick={click} >click</button>
  </div>
}