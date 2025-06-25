import './style.css'

import { setupTodo } from './todo.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <form>
      <input id="task-title">
      <button>Add</button>
    </form>
  </div>
`

setupTodo(document.querySelector<HTMLButtonElement>('#counter')!)
