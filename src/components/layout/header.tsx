import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto h-15 flex items-center">
        <Link href="/" aria-label="홈으로">
          <Image
            src="/images/logo_mobile.svg"
            width={71}
            height={40}
            alt="do it 로고"
            priority
            className="sm:hidden"
          />
          <Image
            src="/images/logo_desktop.svg"
            width={151}
            height={40}
            alt="do it 로고"
            priority
            className="hidden sm:block"
          />
        </Link>
      </div>
    </header>
  );
}
