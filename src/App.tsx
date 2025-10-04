import { useState, useEffect } from 'react'
import { Reorder } from "framer-motion";

import mobileDark from './assets/images/bg-mobile-dark.jpg'
import mobileLight from './assets/images/bg-mobile-light.jpg'
import desktopDark from './assets/images/bg-desktop-dark.jpg'
import desktopLight from './assets/images/bg-desktop-light.jpg'

import moon from './assets/images/icon-moon.svg'
import sun from './assets/images/icon-sun.svg'

import check from './assets/images/icon-check.svg'
import cross from './assets/images/icon-cross.svg'

type todoType = {
  id: string;
  name: string;
  completed: boolean;
};

function App() {
  const [size, setSize] = useState<number>(window.innerWidth)
  const [isDark, setIsDark] = useState<boolean>(true)
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<todoType[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });  const [filter, setFilter] = useState<string>('all')
  const [filtered, setFiltered] = useState<todoType[]>([]);
  const itemsLeft = todos.filter(task => !task.completed)

  useEffect(() => {
    if (filter === 'all') {
      setFiltered([...todos]);
    } else if (filter === 'active') {
      setFiltered(todos.filter((todo) => !todo.completed));
    } else if (filter === 'completed') {
      setFiltered(todos.filter((todo) => todo.completed));
    }
  }, [filter, todos]);

  function removeTodo(id: string) {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  }

  function markCompleted(id: string){
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
 
    return () => window.removeEventListener('resize', handleResize)
  }, [size])

  const handleThemeToggle = () => {
    setIsDark(!isDark)
  }

 function addTodo(e: React.FormEvent) {
  e.preventDefault();

  if (todo.trim() !== "") {
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: todo, completed: false },
    ]);
    setTodo("");
  }
}

function clearCompleted(){
  setTodos((prev) => {
    return prev.filter(task => !task.completed)
  })
}

  return (
    <div className={`${isDark} w-full`}>
      <img src={
        size < 640 && isDark ? mobileDark :
        size < 640 && !isDark ? mobileLight :
        size > 640 && isDark ? desktopDark :
        size > 640 && !isDark ? desktopLight : ''
        } alt="" className='w-full'
      />
      <div className={`${isDark ? 'bg-[#181824]' : 'bg-[#fafafa]'} h-screen`}>
        <div className='flex flex-col w-[90%] sm:max-w-2xl mx-auto -mt-[40%] sm:-mt-28 md:-mt-36 lg:-mt-44 mb-10'>
          <header className='flex justify-between items-center w-full'>
            <h1 className='text-white font-semibold text-2xl tracking-[8px]'>TODO</h1>
            <button className='cursor-pointer'onClick={handleThemeToggle}><img src={isDark ? sun : moon} alt="" className='size-6 hover:scale-110 transition duration-300'/></button>
          </header>
          <form action="" onSubmit={(e) => addTodo(e)} className={`${isDark ? 'bg-[#25273c] text-gray-400' : 'bg-white text-gray-700'} w-full mt-8 flex items-center gap-3 py-1 px-4 rounded-md overflow-hidden `}>
            <div className={`${isDark ? 'border-gray-600' : 'border-gray-300'} size-5 rounded-full border`}></div>
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
          <div className={`${isDark ? 'bg-[#25273c] shadow-gray-950' : 'bg-white shadow-gray-300'}  shadow-2xl mt-5 rounded-md overflow-hidden`}>
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
                  <p className='font-semibold grow cursor-pointer'>{task.name}</p>
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
            <div className='py-3 px-4 flex items-center'>
              <span className={`${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-700'} text-[12px] sm:text-sm cursor-pointer`}>{itemsLeft.length} items left</span>
              <div className='flex gap-2 sm:gap-5 grow items-center justify-center text-[12px] sm:text-sm'>
                <button onClick={() => setFilter('all')} className={`${filter === 'all' ? 'text-blue-700 font-semibold' : isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-700'} cursor-pointer`}>All</button>
                <button onClick={() => setFilter('active')} className={`${filter === 'active' ? 'text-blue-700 font-semibold' : isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-700'} cursor-pointer`}>Active</button>
                <button onClick={() => setFilter('completed')} className={`${filter === 'completed' ? 'text-blue-700 font-semibold' : isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-700'} cursor-pointer`}>Completed</button>
              </div>
              <button onClick={clearCompleted} className={`${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-700'} text-[12px] sm:text-sm cursor-pointer`}>Clear completed</button>
            </div>
          </div>
        </div>
        <p className={`${isDark ? 'text-gray-500' : 'text-gray-400'} text-sm text-center`}>Drag and drop to reorder list</p>
      </div>
    </div>
  )
}

export default App
