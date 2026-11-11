import { notFound } from "next/navigation";
import TodoDetail from "./_components/todo-detail";

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const todoId = Number(id);

  //id가 양의 정수가 아닌 경우 notFound로 이동
  if (!Number.isInteger(todoId) || todoId <= 0) {
    notFound();
  }

  return <TodoDetail id={Number(id)} />;
}
