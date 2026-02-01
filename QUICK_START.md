# ⚡ Guía Rápida de Inicio

¿Quieres probar el marketplace rápidamente? Sigue estos 3 pasos:

## 1️⃣ Instalar (2 minutos)

```bash
# Instalar dependencias
npm install
```

## 2️⃣ Configurar (5 minutos)

### Opción A: Usar datos de prueba

Para probar sin configurar nada, puedes comentar temporalmente la carga desde Google Sheets.

1. Copia `.env.example` a `.env`
2. Deja las variables de Google Sheets vacías por ahora
3. El frontend mostrará un mensaje de error, pero puedes ver el diseño

### Opción B: Configurar Google Sheets (Recomendado)

Sigue estos pasos simples:

**1. Obtener API Key:**
- Ve a [Google Cloud Console](https://console.cloud.google.com/)
- Crea proyecto nuevo
- Habilita "Google Sheets API"
- Crea credencial tipo "API Key"
- Cópiala

**2. Crear Spreadsheet:**
- Ve a [Google Sheets](https://sheets.google.com)
- Crea nuevo spreadsheet
- Crea dos hojas: "Categories" y "Products"
- Compártelo como "Anyone with link can view"
- Copia el ID de la URL

**3. Agregar datos de ejemplo:**

**Hoja "Categories":**
```
ID      | Name      | Description              | Icon URL | Order
--------|-----------|--------------------------|----------|------
cat1    | Anillos   | Anillos de plata y oro   |          | 1
cat2    | Cadenitas | Cadenitas elegantes      |          | 2
```

**Hoja "Products":**
```
ID    | Name           | Description              | Price | Category | Image URL                              | Images | Stock | Featured | Has Sizes | Available Sizes | Tags
------|----------------|--------------------------|-------|----------|----------------------------------------|--------|-------|----------|-----------|-----------------|------------
prod1 | Anillo Plata   | Anillo de plata 925      | 2500  | cat1     | https://via.placeholder.com/400        |        | 10    | TRUE     | TRUE      | 14,16,18,20     | plata
prod2 | Cadenita Gold  | Cadenita dorada elegante | 3500  | cat2     | https://via.placeholder.com/400        |        | 5     | FALSE    | FALSE     |                 | dorado
```

**4. Configurar .env:**
```env
VITE_GOOGLE_SHEETS_API_KEY=tu_api_key_aqui
VITE_GOOGLE_SPREADSHEET_ID=tu_spreadsheet_id_aqui
VITE_WHATSAPP_NUMBER=5491123456789
```

## 3️⃣ Ejecutar (1 minuto)

```bash
npm run dev
```

Abre http://localhost:3000 🎉

---

## 📸 Para Producción

### Subir Imágenes Reales

Usa **Cloudinary** (gratis y fácil):

1. Crea cuenta en [cloudinary.com](https://cloudinary.com)
2. Sube tus fotos de productos
3. Copia las URLs
4. Pégalas en tu Google Sheet

### Deploy a Internet

```bash
# Build
npm run build

# Deploy a Vercel (gratis)
npm install -g vercel
vercel
```

O conecta tu repo de GitHub con Vercel/Netlify para deploy automático.

---

## 🆘 Troubleshooting Rápido

**No carga productos:**
- ✅ Verifica que el Google Sheet sea público
- ✅ Verifica que las hojas se llamen "Categories" y "Products"
- ✅ Abre la consola del navegador (F12) y busca errores

**Imágenes no se ven:**
- ✅ Usa URLs públicas
- ✅ Prueba abrir la URL en una ventana de incógnito
- ✅ Usa placeholders mientras tanto: `https://via.placeholder.com/400`

**WhatsApp no funciona:**
- ✅ Verifica que el número tenga formato: código país + número (sin +)
- ✅ Ejemplo: `5491123456789` (Argentina)

---

## 📚 Documentación Completa

- [README.md](./README.md) - Documentación completa
- [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) - Guía detallada de Google Sheets

---

¡Listo! En menos de 10 minutos tienes un marketplace funcionando 🚀
