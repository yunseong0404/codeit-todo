import Image from "next/image";
import Link from "next/link";
import type { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
}

export default function TodoItem({ todo, onToggle }: TodoItemProps) {
  const { id, name, isCompleted } = todo;

  return (
    <li
      className={`flex items-center gap-4 h-12.5 px-2.25 rounded-[27px] border-2 border-slate-900 ${
        isCompleted ? "bg-violet-100" : "bg-white"
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-label={isCompleted ? "완료 취소" : "완료로 표시"}
        className="shrink-0 cursor-pointer"
      >
        <Image
          src={isCompleted ? "/icons/checkbox_fill.svg" : "/icons/checkbox_empt.svg"}
          width={32}
          height={32}
          alt="check_box"
        />
      </button>
      <Link
        href={`/items/${id}`}
        className={`flex-1 truncate text-slate-800 text-4  ${isCompleted ? "line-through" : ""}`}
      >
        {name}
      </Link>
    </li>
  );
}
