import React from "../core/react"

export const Show = () => {
  const [show, setShow] = React.useState(true)
  const bar = <h2>bar</h2>


  function click() {
    setShow(show => !show)
  }

  return (
    <div >
      {show && bar}
      <button onClick={click} >{show ? 'hidden' : 'show'}</button>
    </div>
  )
}