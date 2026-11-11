"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Todo } from "@/types/todo";
import DetailButtons from "./detail-buttons";
import DetailCheckbox from "./detail-checkbox";
import ImageUpload from "./image-upload";
import MemoField from "./memo-field";

interface TodoFormProps {
  todo: Todo;
  editTodo: (item: Partial<Todo>) => Promise<boolean>;
  removeTodo: () => Promise<boolean>;
  addImage: (file: File) => Promise<string | null>;
}

export default function TodoForm({ todo, editTodo, removeTodo, addImage }: TodoFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<Todo>(() => ({ ...todo, memo: todo.memo ?? "" }));

  //수정된 파라미터를 덮어씌워 form 업데이트
  const updateForm = (element: Partial<Todo>) => setForm((prev) => ({ ...prev, ...element }));

  //서버에서 받아온 todo와 현재 작성중인 form을 비교
  //다르다면 현재 수정 가능한 상태
  const isChanged =
    form.name !== todo.name ||
    form.isCompleted !== todo.isCompleted ||
    form.memo !== (todo.memo ?? "") ||
    form.imageUrl !== todo.imageUrl;
  const canSave = isChanged && form.name.trim().length > 0;

  //수정할 데이터가 있다면, 데이터 수정 요청 후 홈으로 이동
  const handleSave = async () => {
    if (!canSave) return;
    setIsSubmitting(true);
    const ok = await editTodo({
      name: form.name.trim(),
      isCompleted: form.isCompleted,
      memo: form.memo,
      imageUrl: form.imageUrl,
    });
    if (ok) router.push("/");
    else setIsSubmitting(false);
  }

  //아이템 삭제 후 홈으로 이동
  const handleDelete = async () => {
    setIsSubmitting(true);
    const ok = await removeTodo();
    if (ok) router.replace("/");
    else setIsSubmitting(false);
  };

  return (
    <div className="lg:px-25">
      <DetailCheckbox
        name={form.name}
        isCompleted={form.isCompleted}
        onNameChange={(name) => updateForm({ name })}
        onToggle={() => updateForm({ isCompleted: !form.isCompleted })}
      />

      <div className="mt-4 sm:mt-6 flex flex-col lg:flex-row gap-4 sm:gap-6">
        <ImageUpload
          imageUrl={form.imageUrl}
          onChange={(imageUrl) => updateForm({ imageUrl })}
          onUpload={addImage}
        />
        <MemoField value={form.memo ?? ""} onChange={(memo) => updateForm({ memo })} />
      </div>

      <DetailButtons canSave={canSave} onSave={handleSave} onDelete={handleDelete} isDisabled={isSubmitting}/>
    </div>
  );
}
