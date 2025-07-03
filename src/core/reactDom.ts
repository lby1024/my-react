import React from "./react.js"

// ReactDOM
//   .createRoot(document.querySelector('#root'))
//   .render(<APP />)

const ReactDOM = {
  createRoot(container: any) {
    return {
      render(App: any) {

        React.render({
          type: 'div',
          dom: container,
          props: { children: [App] }
        })

      }
    }
  }
}

export default ReactDOM