import React from "../core/react";
export const TestUseEffect = () => {
  const [count, setCount] = React.useState(3)

  React.useEffect(() => {
    console.log("init");
    return () => {
      console.log("cleanup 0");
    };
  }, []);

  React.useEffect(() => {
    console.log("after-a", count);
    // cleanup
    return () => {
      console.log("before-a", count);
    };
  }, [count]);

  React.useEffect(() => {
    console.log("after-b", count);
    // cleanup
    return () => {
      console.log("before-b", count);
    };
  }, [1]);

  const click = () => {
    setCount(n => n + 1)
  }

  return (
    <div>
      <h1>useEffect test</h1>
      <p>{count}</p>
      <button onClick={click} >click</button>
    </div>
  )
}