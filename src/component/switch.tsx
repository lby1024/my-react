import React from "../core/react";

export const Switch = () => {
  const [show, setShow] = React.useState(true);
  const bar = <h2>点击切换bar</h2>;

  function click() {
    setShow((show) => !show);
  }

  return <div onClick={click}>{show ? <Foo /> : bar}</div>;
};

function Foo() {
  return <h3>点击切换Foo</h3>;
}
