import { config } from '@/config';
import type { CartItem } from '@/types';

/**
 * Generate WhatsApp message from cart items
 */
export function generateWhatsAppMessage(items: CartItem[], total: number): string {
  const { messagePrefix } = config.whatsapp;
  const { currencySymbol } = config.store;
  
  let message = `${messagePrefix}\n\n`;
  
  items.forEach((item, index) => {
    const sizeText = item.selectedSize ? ` - Talle: ${item.selectedSize}` : '';
    message += `${index + 1}. ${item.product.name}${sizeText}\n`;
    message += `   Cantidad: ${item.quantity}\n`;
    message += `   Precio unitario: ${currencySymbol}${item.product.price.toFixed(2)}\n`;
    message += `   Subtotal: ${currencySymbol}${(item.product.price * item.quantity).toFixed(2)}\n\n`;
  });
  
  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `TOTAL: ${currencySymbol}${total.toFixed(2)}`;
  
  return message;
}

/**
 * Open WhatsApp with pre-filled message
 */
export function openWhatsApp(items: CartItem[], total: number): void {
  const { number } = config.whatsapp;
  
  if (!number) {
    console.error('WhatsApp number not configured');
    alert('Número de WhatsApp no configurado. Por favor contacta al administrador.');
    return;
  }
  
  const message = generateWhatsAppMessage(items, total);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${number}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
}
