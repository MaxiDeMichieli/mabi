/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SHEETS_API_KEY: string
  readonly VITE_GOOGLE_SPREADSHEET_ID: string
  readonly VITE_WHATSAPP_NUMBER: string
  readonly VITE_WHATSAPP_MESSAGE_PREFIX: string
  readonly VITE_STORE_NAME: string
  readonly VITE_STORE_DESCRIPTION: string
  readonly VITE_CURRENCY_SYMBOL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
