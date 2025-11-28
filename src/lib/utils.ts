import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 *
 * Combines clsx for conditional classes with tailwind-merge
 * to properly handle Tailwind class conflicts.
 *
 * @example
 * cn('px-4 py-2', isLarge && 'px-8', className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
