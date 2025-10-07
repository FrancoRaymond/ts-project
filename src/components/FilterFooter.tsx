import { useTodoStore } from "../store/todoStore";

const FilterFooter = () => {
    const {isDark, setFilter, filter, clearCompleted, itemsLeft} = useTodoStore()
  return (
    <div className='py-3 px-4 flex items-center'>
        <span className={`${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-700'} text-[12px] sm:text-sm cursor-pointer`}>{itemsLeft} items left</span>
        <div className='flex gap-2 sm:gap-5 grow items-center justify-center text-[12px] sm:text-sm'>
            <button 
                onClick={() => setFilter('all')} 
                className={`${filter === 'all' ? 'text-blue-700 font-semibold' : isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-700'} cursor-pointer`}
            >All
            </button>
            <button 
                onClick={() => setFilter('active')} 
                className={`${filter === 'active' ? 'text-blue-700 font-semibold' : isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-700'} cursor-pointer`}
            >Active
            </button>
            <button 
                onClick={() => setFilter('completed')} 
                className={`${filter === 'completed' ? 'text-blue-700 font-semibold' : isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-700'} cursor-pointer`}
            >Completed
            </button>
        </div>
        <button 
            onClick={clearCompleted} 
            className={`${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-700'} text-[12px] sm:text-sm cursor-pointer`}
        >Clear completed
        </button>
    </div>
  )
}

export default FilterFooter
