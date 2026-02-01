import { config } from '@/config';

/**
 * Format price with currency symbol
 */
export function formatPrice(price: number): string {
  const { currencySymbol } = config.store;
  return `${currencySymbol}${price.toFixed(2)}`;
}

/**
 * Format price in a compact way (for mobile)
 */
export function formatPriceCompact(price: number): string {
  const { currencySymbol } = config.store;
  return `${currencySymbol}${price}`;
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
