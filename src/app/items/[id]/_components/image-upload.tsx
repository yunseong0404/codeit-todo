"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

// 업로드 전에 "image-타임스탬프.확장자"로 이름 변경
const toSafeFileName = (file: File) => {
  const extFromName = file.name.match(/\.([a-zA-Z0-9]+)$/)?.[1];
  const extFromType = file.type.split("/")[1]?.replace(/[^a-zA-Z0-9]/g, "");
  const ext = (extFromName ?? extFromType ?? "png").toLowerCase();

  return new File([file], `image-${Date.now()}.${ext}`, { type: file.type });
};

interface ImageUploadProps {
  imageUrl?: string;
  onChange: (imageUrl: string) => void;
  onUpload: (file: File) => Promise<string | null>;
}

export default function ImageUpload({ imageUrl, onChange, onUpload }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  //이미지 파일 업로드
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > MAX_IMAGE_SIZE) {
      alert("이미지는 5MB 이하만 업로드할 수 있어요.");
      return;
    }

    setIsUploading(true);
    const url = await onUpload(toSafeFileName(file));
    setIsUploading(false);
    if (url) onChange(url);
  };

  return (
    <div className="relative h-[311px] lg:w-96 shrink-0 rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 overflow-hidden flex items-center justify-center">
      {imageUrl ? (
        <Image src={imageUrl} alt="첨부 이미지" fill unoptimized className="object-cover" />
      ) : (
        <Image src="/icons/img_icon.svg" alt="" width={64} height={64} />
      )}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        aria-label={imageUrl ? "이미지 변경" : "이미지 추가"}
        className="absolute right-4 bottom-4 cursor-pointer disabled:cursor-wait disabled:opacity-50"
      >
        <Image
          src={imageUrl ? "/icons/img_modify_btn.svg" : "/icons/img_add_btn.svg"}
          alt=""
          width={64}
          height={64}
        />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
