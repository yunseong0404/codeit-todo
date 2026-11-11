interface MemoFieldProps {
  value: string;
  onChange: (memo: string) => void;
}

export default function MemoField({ value, onChange }: MemoFieldProps) {
  return (
    <div className="lg:flex-1 h-77.75 flex flex-col rounded-3xl bg-[url(/images/memo.png)] bg-cover px-6 py-4">
      <p className="text-center font-extrabold text-4 text-amber-800">Memo</p>
      <label className="mt-4 flex-1 min-h-0 flex items-center cursor-text">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="메모"
          rows={1}
          className="w-full max-h-full field-sizing-content resize-none bg-transparent text-center text-4 text-slate-800 outline-none scrollbar-memo"
        />
      </label>
    </div>
  );
}
