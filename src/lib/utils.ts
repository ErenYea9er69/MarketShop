import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, locale: string = 'en') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'TND',
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date: Date, locale: string = 'en') {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}
