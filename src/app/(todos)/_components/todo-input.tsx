"use client";

import Image from "next/image";
import { useState } from "react";

interface TodoFormProps {
  onAdd: (name: string) => void;
}

export default function TodoInput({ onAdd }: TodoFormProps) {
  const [value, setValue] = useState("");
  const hasValue = value.trim().length > 0;

  //할 일 추가
  const handleSubmit = () => {
    if (!hasValue) return;
    onAdd(value.trim());
    setValue("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex gap-4"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="할 일을 입력해주세요"
        className="flex-1 min-w-0 h-14 px-6 rounded-3xl border-2 border-slate-900 bg-slate-100 shadow-hard outline-none placeholder:text-slate-500"
      />
      <button
        type="submit"
        disabled={!hasValue}
        aria-label="할 일 추가하기"
        className={`shrink-0 flex items-center justify-center gap-1 h-14 w-14 sm:w-[168px] rounded-3xl border-2 border-slate-900 shadow-hard font-bold whitespace-nowrap ${
          hasValue
            ? "bg-violet-600 text-white cursor-pointer"
            : "bg-slate-200 text-slate-900 cursor-not-allowed"
        }`}
      >
        <Image
          src={hasValue ? "/icons/plus2.svg" : "/icons/plus1.svg"}
          width={16}
          height={16}
          alt="add_icon"
        />
        <span className="hidden sm:inline">추가하기</span>
      </button>
    </form>
  );
}
