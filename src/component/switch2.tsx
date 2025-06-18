import React from "../core/react";

export const Switch2 = () => {
  const [show, setShow] = React.useState(true);
  const bar = <h2>点击切换: bar</h2>;

  function click() {
    setShow((show) => !show);
  }

  return <div onClick={click}>{show ? <Foo /> : bar}</div>;
};

function Foo() {
  return (
    <h2>
      点击切换: foo
      <p>Foo2</p>
    </h2>
  );
}
