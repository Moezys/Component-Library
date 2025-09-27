import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export const themes = ['blue', 'green', 'purple', 'red'] as const
export type Theme = typeof themes[number]