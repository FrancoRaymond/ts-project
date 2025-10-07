import { Reorder } from "framer-motion";
import { useTodoStore } from "../store/todoStore";
import cross from '../assets/images/icon-cross.svg'
import check from '../assets/images/icon-check.svg'

const TaskList = () => {
    const {todos, setTodos, filtered, isDark, markCompleted, removeTodo, } = useTodoStore()
  return (
    <Reorder.Group
        axis="y"
        values={todos}
        onReorder={setTodos}
        className="space-y-2"
    >
        {
            filtered.map(task => (
            <Reorder.Item 
                key={task.id} 
                value={task}
                whileDrag={{ scale: 1.05 }} 
                className={`${isDark ? 'bg-[#25273c] text-gray-400 border-gray-700' : 'bg-white text-gray-700 border-gray-300'} py-3 px-4 flex items-center gap-5 border-b `}
            >
                <button 
                onClick={() => markCompleted(task.id)} 
                className={`${task.completed ? 'bg-gradient-to-b from-blue-400 to-purple-500' : ''} ${isDark ? 'border-gray-600' : 'border-gray-300'} cursor-pointer flex items-center justify-center size-5 rounded-full border`}
                >
                {task.completed ? <img src={check} alt="" /> : ''}
                </button>
                <p className={`${task.completed ? (isDark ? "line-through text-gray-600" : "line-through text-gray-400") : "" } font-semibold grow cursor-pointer`}>{task.name}</p>
                <button 
                className='cursor-pointer' 
                onClick={() => removeTodo(task.id)}
                >
                <img src={cross} alt="" />
                </button>
            </Reorder.Item>
            ))
        }
    </Reorder.Group >
  )
}

export default TaskList
