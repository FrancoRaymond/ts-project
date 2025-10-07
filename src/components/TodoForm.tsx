import { useTodoStore } from "../store/todoStore";

const TodoForm = () => {
    const {isDark, addTodo, todo, setTodo} = useTodoStore()

  return (
    <form 
        action="" 
        onSubmit={(e) => addTodo(e)} 
        className={`${isDark ? 'bg-[#25273c] text-gray-400' : 'bg-white text-gray-700'} w-full mt-8 flex items-center gap-3 py-1 px-4 rounded-md overflow-hidden `}
    >
        <div 
            className={`${isDark ? 'border-gray-600' : 'border-gray-300'} size-5 rounded-full border`}
        >
        </div>
        <input
            className='outline-0 py-2 text-sm grow'
            type="text"
            name='todo'
            id='todo'
            placeholder='Create a new todo'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
        />
    </form>
  )
}

export default TodoForm
