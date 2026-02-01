export const config = {
  googleSheets: {
    apiKey: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '',
    spreadsheetId: import.meta.env.VITE_GOOGLE_SPREADSHEET_ID || '',
    categoriesSheet: 'Categories',
    productsSheet: 'Products',
  },
  whatsapp: {
    number: import.meta.env.VITE_WHATSAPP_NUMBER || '',
    messagePrefix: import.meta.env.VITE_WHATSAPP_MESSAGE_PREFIX || 'Hola! Quiero comprar:',
  },
  store: {
    name: import.meta.env.VITE_STORE_NAME || 'Mabi Accessories',
    description: import.meta.env.VITE_STORE_DESCRIPTION || 'Accesorios únicos para tu estilo',
    currencySymbol: import.meta.env.VITE_CURRENCY_SYMBOL || '$',
  },
};
