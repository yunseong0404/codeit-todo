"use client";

import TodoInput from "./_components/todo-input";
import TodoList from "./_components/todo-list";
import useTodos from "@/hooks/use-todos";

export default function Home() {
  const { todos, isLoading, addTodo, toggleTodo } = useTodos();

  const todoItems = todos.filter((t) => !t.isCompleted);
  const doneItems = todos.filter((t) => t.isCompleted);

  if (isLoading) return <p className="mt-10 text-center text-slate-500">불러오는 중...</p>;

  return (
    <>
      <TodoInput onAdd={addTodo} />
      <div className="mt-6 sm:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6">
        <TodoList type="todo" items={todoItems} onToggle={toggleTodo} />
        <TodoList type="done" items={doneItems} onToggle={toggleTodo} />
      </div>
    </>
  );
}
