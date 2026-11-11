import Image from "next/image";
import type { Todo } from "@/types/todo";
import TodoItem from "./todo-item";

interface TodoListProps {
  type: "todo" | "done";
  items: Todo[];
  onToggle: (id: number) => void;
}

const BADGE = {
  todo: { src: "/icons/todo_badge.svg", alt: "TO DO", width: 101, height: 36 },
  done: { src: "/icons/done_badge.svg", alt: "DONE", width: 97, height: 36 },
};

const EMPTY_STATE = {
  todo: {
    image: "/images/todo_empty.png",
    message: ["할 일이 없어요.", "TODO를 새롭게 추가해주세요!"],
  },
  done: {
    image: "/images/done_empty.png",
    message: ["아직 다 한 일이 없어요.", "해야 할 일을 체크해보세요!"],
  },
};

export default function TodoList({ type, items, onToggle }: TodoListProps) {
  const badge = BADGE[type];
  const empty = EMPTY_STATE[type];

  return (
    <section>
      <Image
        src={badge.src}
        alt={badge.alt}
        width={badge.width}
        height={badge.height}
      />

      {items.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-4">
          {items.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
          ))}
        </ul>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-6">
          <Image
            src={empty.image}
            alt=""
            width={240}
            height={240}
            className="w-30 h-30 md:w-60 md:h-60"
          />
          <p className="text-center text-slate-400 text-4 font-bold leading-relaxed">
            {empty.message[0]}
            <br />
            {empty.message[1]}
          </p>
        </div>
      )}
    </section>
  );
}
