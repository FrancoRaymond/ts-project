import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Todo = {
  id: string;
  name: string;
  completed: boolean;
};

type TodoStore = {
  size: number;
  isDark: boolean;
  todo: string;
  todos: Todo[];
  filter: string;
  filtered: Todo[];
  itemsLeft: number;

  setSize: (size: number) => void;
  setIsDark: (isDark: boolean) => void;
  setTodo: (todo: string) => void;
  setTodos: (todos: Todo[]) => void;
  setFilter: (filter: string) => void;
  setFiltered: (filtered: Todo[]) => void;
  updateItemsLeft: () => void;

  addTodo: (e: React.FormEvent) => void;
  removeTodo: (id: string) => void;
  markCompleted: (id: string) => void;
  clearCompleted: () => void;
  handleThemeToggle: () => void;
  updateFilter: () => void;
  handleResize: () => void;
};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      size: window.innerWidth,
      isDark: true,
      todo: "",
      todos: [],
      filter: "all",
      filtered: [],
      itemsLeft: 0,

      setSize: (size) => set({ size }),
      setIsDark: (isDark) => set({ isDark }),
      setTodo: (todo) => set({ todo }),
      setTodos: (todos) => {
        set({ todos });
        get().updateItemsLeft();
        get().updateFilter();
      },
      setFilter: (filter) => {
        set({ filter });
        get().updateFilter();
      },
      setFiltered: (filtered) => set({ filtered }),

      addTodo: (e) => {
        e.preventDefault();
        const { todo, todos } = get();
        if (todo.trim() !== "") {
          const newTodos = [
            ...todos,
            { id: crypto.randomUUID(), name: todo, completed: false },
          ];
          get().setTodos(newTodos);
          set({ todo: "" });
        }
      },

      removeTodo: (id) => {
        const updated = get().todos.filter((t) => t.id !== id);
        get().setTodos(updated);
      },

      markCompleted: (id) => {
        const updated = get().todos.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        );
        get().setTodos(updated);
      },

      clearCompleted: () => {
        const updated = get().todos.filter((t) => !t.completed);
        get().setTodos(updated);
      },

      handleThemeToggle: () => {
        set((state) => ({ isDark: !state.isDark }));
      },

      updateFilter: () => {
        const { filter, todos } = get();
        if (filter === "all") {
          set({ filtered: [...todos] });
        } else if (filter === "active") {
          set({ filtered: todos.filter((t) => !t.completed) });
        } else if (filter === "completed") {
          set({ filtered: todos.filter((t) => t.completed) });
        }
      },

      updateItemsLeft: () => {
        const itemsLeft = get().todos.filter((t) => !t.completed).length;
        set({ itemsLeft });
      },

      handleResize: () => {
        set({ size: window.innerWidth });
      },
    }),
    {
      name: "todo-storage", 
      partialize: (state) => ({
        todos: state.todos,
        isDark: state.isDark,
      }), 
    }
  )
);
