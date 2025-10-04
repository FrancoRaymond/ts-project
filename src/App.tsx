import { useState, useEffect } from 'react'

import mobileDark from './assets/images/bg-mobile-dark.jpg'
import mobileLight from './assets/images/bg-mobile-light.jpg'
import desktopDark from './assets/images/bg-desktop-dark.jpg'
import desktopLight from './assets/images/bg-desktop-light.jpg'

import moon from './assets/images/icon-moon.svg'
import sun from './assets/images/icon-sun.svg'

type todoType = {
  id: string;
  name: string;
  completed: boolean;
};

function App() {
  const [size, setSize] = useState<number>(window.innerWidth)
  const [isDark, setIsDark] = useState<boolean>(true)
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<todoType[]>([]);


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
    console.log(isDark ? "Dark" : "Light")
  }

 function addTodo(e: React.FormEvent) {
  e.preventDefault();

  if (todo.trim() !== "") {
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: todo, completed: false },
    ]);
    console.log(todos);
    setTodo("");
  }
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
      <div className='flex flex-col w-[90%] mx-auto -mt-[40%] sm:-mt-28 border'>
        <header className='flex justify-between items-center w-full'>
          <h1 className='text-white font-semibold text-2xl tracking-[8px]'>TODO</h1>
          <button className='cursor-pointer'onClick={handleThemeToggle}><img src={isDark ? sun : moon} alt="" className='size-6 hover:scale-110 transition duration-300'/></button>
        </header>
        <form action="" onSubmit={(e) => addTodo(e)} className='w-full mt-8 flex items-center gap-3 bg-[#25273c] py-1 px-4 rounded-md overflow-hidden text-gray-400'>
          <div className='size-5 rounded-full border border-gray-600'></div>
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
      </div>
    </div>
  )
}

export default App
