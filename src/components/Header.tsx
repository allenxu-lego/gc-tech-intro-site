import Image from 'next/image';
import { BRAND, LAYOUT } from '@/lib/constants';

export function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 bg-white z-50 border-b-4"
      style={{
        height: LAYOUT.headerHeight,
        borderColor: BRAND.colors.primary,
      }}
    >
      <div className="flex items-center gap-3 h-full px-6">
        <Image
          src={BRAND.logo.src}
          alt={BRAND.logo.alt}
          width={BRAND.logo.width}
          height={BRAND.logo.height}
          priority
          className="object-contain"
        />
        <h1 className="text-xl font-semibold text-gray-800">
          {BRAND.name}
        </h1>
      </div>
    </header>
  );
}