import React from "../core/react"

export const Switch = () => {
  const [show, setShow] = React.useState(true)
  const bar = <h2>bar</h2>

  function click() {
    setShow(show => !show)
  }

  return (
    <div onClick={click} >
      {show ? <Foo /> : bar}
    </div>
  )
}

function Foo() {
  return <h3>Foo</h3>
}