import React from "./react.js"

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