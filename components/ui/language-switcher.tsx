"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/src/i18n/routing';
import { ChangeEvent, useTransition } from 'react';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="relative flex items-center">
      <Globe className="absolute left-2.5 h-4 w-4 pointer-events-none" style={{ color: "var(--text-muted)" }} />
      <select
        value={locale}
        onChange={onSelectChange}
        disabled={isPending}
        className="pl-8 pr-4 py-1.5 rounded-full text-sm outline-none transition-all duration-200 appearance-none cursor-pointer"
        style={{
          background: "var(--bg-hover)",
          color: "var(--text-primary)",
          border: "1px solid transparent",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--primary)";
          e.currentTarget.style.boxShadow = "0 0 0 4px var(--primary-muted)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "transparent";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <option value="en">English</option>
        <option value="hi">हिंदी (Hindi)</option>
        <option value="bn">বাংলা (Bengali)</option>
        <option value="mr">मराठी (Marathi)</option>
        <option value="te">తెలుగు (Telugu)</option>
        <option value="ta">தமிழ் (Tamil)</option>
        <option value="gu">ગુજરાતી (Gujarati)</option>
        <option value="ur">اردو (Urdu)</option>
      </select>
    </div>
  );
}
