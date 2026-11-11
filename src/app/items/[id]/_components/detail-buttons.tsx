import Image from "next/image";

interface DetailButtonsProps {
  canSave: boolean;
  isDisabled: boolean;
  onSave: () => void;
  onDelete: () => void;
}


export default function DetailButtons({ canSave, onSave, onDelete, isDisabled }: DetailButtonsProps) {
  return (
    <div className="mt-6 flex gap-[7px] sm:gap-4 justify-center lg:justify-end">
      <button
        type="button"
        onClick={onSave}
        disabled={!canSave || isDisabled}
        aria-label="수정 완료"
        className={`${canSave ? "cursor-pointer" : "cursor-not-allowed"}`}
      >
        <Image
          src={canSave ? "/icons/done_after_badge.svg" : "/icons/done_before_badge.svg"}
          alt=""
          width={168}
          height={56}
          className="w-full h-auto"
        />
      </button>
      <button
        type="button"
        onClick={onDelete}
        disabled={isDisabled}
        aria-label="삭제하기"
        className='cursor-pointer'
      >
        <Image src="/icons/delete_badge.svg" alt="" width={168} height={56} className="w-full h-auto" />
      </button>
    </div>
  );
}
