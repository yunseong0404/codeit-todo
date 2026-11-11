"use client";

import useTodo from "@/hooks/use-todo";
import TodoForm from "./todo-form";

export default function TodoDetail({ id }: { id: number }) {
  const { todo, isLoading, error, editTodo, removeTodo, addImage } = useTodo(id);

  if (isLoading) return <p className="mt-16 text-center text-slate-400 font-bold">할 일을 불러오는 중이에요.</p>;
  if (error || !todo) return <p className="mt-16 text-center text-slate-400 font-bold">에러가 발생했습니다.</p>;

  return (
    <TodoForm
      key={todo.id}
      todo={todo}
      editTodo={editTodo}
      removeTodo={removeTodo}
      addImage={addImage}
    />
  );
}
