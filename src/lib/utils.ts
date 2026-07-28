import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** 외부·퍼블리싱 정적·PDF 등 앱 영역 밖 링크 */
export function isOutboundHref(href: string) {
  return (
    /^(https?:)?\/\//.test(href) ||
    href.startsWith('/publishing') ||
    href.endsWith('.pdf')
  )
}
