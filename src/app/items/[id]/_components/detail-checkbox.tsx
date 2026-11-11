import Image from "next/image";

interface DetailCheckboxProps {
  name: string;
  isCompleted: boolean;
  onNameChange: (name: string) => void;
  onToggle: () => void;
}

export default function DetailCheckbox({
  name,
  isCompleted,
  onNameChange,
  onToggle,
}: DetailCheckboxProps) {
  return (
    <div
      className={`flex items-center justify-center gap-4 h-16 px-4 rounded-3xl border-2 border-slate-900 ${
        isCompleted ? "bg-violet-100" : "bg-white"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
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
      <input
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        aria-label="할 일 이름"
        className="field-sizing-content min-w-8 max-w-full bg-transparent text-xl font-bold text-slate-900 underline outline-none"
      />
    </div>
  );
}
