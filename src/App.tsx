import { useEffect } from "react";
import { useTodoStore } from "./store/todoStore";

import mobileDark from "./assets/images/bg-mobile-dark.jpg";
import mobileLight from "./assets/images/bg-mobile-light.jpg";
import desktopDark from "./assets/images/bg-desktop-dark.jpg";
import desktopLight from "./assets/images/bg-desktop-light.jpg";
import moon from "./assets/images/icon-moon.svg";
import sun from "./assets/images/icon-sun.svg";

import TodoForm from "./components/TodoForm";
import TaskList from "./components/TaskList";
import FilterFooter from "./components/FilterFooter";

function App() {
  const {
    size,
    isDark,
    todos,
    handleThemeToggle,
    handleResize,
  } = useTodoStore();

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <div className={`${isDark ? "dark" : ""} w-full`}>
      <img
        src={
          size < 640 && isDark ? mobileDark
          : size < 640 && !isDark ? mobileLight
          : size > 640 && isDark ? desktopDark : desktopLight
        }
        alt=""
        className="w-full"
      />
      <div className={`${isDark ? "bg-[#181824]" : "bg-[#fafafa]"} h-screen`}>
        <div className="flex flex-col w-[85%] sm:max-w-2xl mx-auto -mt-[40%] sm:-mt-28 md:-mt-36 lg:-mt-44 mb-10">
          <header className="flex justify-between items-center w-full">
            <h1 className="text-white font-semibold text-2xl tracking-[8px]">
              TODO
            </h1>
            <button className="cursor-pointer" onClick={handleThemeToggle}>
              <img
                src={isDark ? sun : moon}
                alt=""
                className="size-6 hover:scale-110 transition duration-300"
              />
            </button>
          </header>
          <TodoForm />
          <div
            className={`${
              isDark ? "bg-[#25273c] shadow-gray-950" : "bg-white shadow-gray-300"
            } shadow-2xl mt-5 rounded-md overflow-hidden`}
          >
            {todos.length !== 0 && <TaskList />}
            {todos.length !== 0 && <FilterFooter />}
          </div>
        </div>
        {todos.length !== 0 && 
        <p
          className={`${
            isDark ? "text-gray-500" : "text-gray-400"
          } text-sm text-center`}
        >
          Drag and drop to reorder list
        </p>
      }  
      </div>
    </div>
  );
}

export default App;