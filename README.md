# Mabi Accessories - Marketplace Frontend

Un marketplace moderno y elegante para accesorios, construido con React + TypeScript + Vite. Perfectamente optimizado para mobile con integración de WhatsApp para checkout y Google Sheets como base de datos.

## ✨ Características

- 🎨 **Diseño moderno y juvenil** con animaciones suaves
- 📱 **Mobile-first** - Optimizado para dispositivos móviles
- 🛍️ **Carrito de compras** persistente con Zustand
- 📊 **Google Sheets como CMS** - Fácil de administrar
- 💬 **Checkout por WhatsApp** - Sin pasarela de pagos
- 🏷️ **Sistema de categorías** y filtros
- 📏 **Soporte para talles** (ideal para anillos)
- ⚡ **Super rápido** - Vite + React
- 🎯 **TypeScript** para mayor seguridad
- 🎨 **Tailwind CSS** para estilos

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ instalado
- Una cuenta de Google
- Un número de WhatsApp Business (o personal)

### Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

3. **Editar `.env` con tus configuraciones:**
```env
# Google Sheets API
VITE_GOOGLE_SHEETS_API_KEY=tu_api_key_aqui
VITE_GOOGLE_SPREADSHEET_ID=tu_spreadsheet_id_aqui

# WhatsApp (formato: código país + número sin +)
VITE_WHATSAPP_NUMBER=5491123456789

# Configuración de la tienda
VITE_STORE_NAME=Mabi Accessories
VITE_WHATSAPP_MESSAGE_PREFIX=Hola! Quiero comprar los siguientes productos:
VITE_CURRENCY_SYMBOL=$
```

4. **Iniciar el servidor de desarrollo:**
```bash
npm run dev
```

5. **Abrir en el navegador:**
```
http://localhost:3000
```

## 📊 Configuración de Google Sheets

### Paso 1: Crear Google Sheets API Key

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto (o selecciona uno existente)
3. Ve a "APIs & Services" > "Library"
4. Busca "Google Sheets API" y habilítala
5. Ve a "APIs & Services" > "Credentials"
6. Clic en "Create Credentials" > "API Key"
7. Copia la API Key generada

### Paso 2: Crear tu Spreadsheet

1. Crea un nuevo Google Spreadsheet
2. Obtén el ID del spreadsheet desde la URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```
3. Comparte el spreadsheet como "Anyone with the link can view"

### Paso 3: Estructura de las Hojas

#### Hoja "Categories" (Categorías)

Crea una hoja llamada exactamente **"Categories"** con las siguientes columnas:

| ID | Name | Description | Icon URL | Order |
|----|------|-------------|----------|-------|
| cat1 | Anillos | Anillos únicos | | 1 |
| cat2 | Cadenitas | Cadenitas de plata | | 2 |
| cat3 | Pulseras | Pulseras elegantes | | 3 |

**Columnas:**
- `ID`: Identificador único (ej: cat1, cat2)
- `Name`: Nombre de la categoría
- `Description`: Descripción opcional
- `Icon URL`: URL de un icono (opcional)
- `Order`: Orden de aparición (números)

#### Hoja "Products" (Productos)

Crea una hoja llamada exactamente **"Products"** con las siguientes columnas:

| ID | Name | Description | Price | Category | Image URL | Images | Stock | Featured | Has Sizes | Available Sizes | Tags |
|----|------|-------------|-------|----------|-----------|--------|-------|----------|-----------|----------------|------|
| prod1 | Anillo Plata | Anillo de plata 925 | 2500 | cat1 | https://... | https://...,https://... | 10 | TRUE | TRUE | 14,16,18,20 | plata,elegante |
| prod2 | Cadenita Gold | Cadenita dorada | 3500 | cat2 | https://... | | 5 | FALSE | FALSE | | dorado,trendy |

**Columnas:**
- `ID`: Identificador único del producto
- `Name`: Nombre del producto
- `Description`: Descripción del producto
- `Price`: Precio (solo números, sin símbolos)
- `Category`: ID de la categoría (debe coincidir con Categories)
- `Image URL`: URL principal de la imagen
- `Images`: URLs adicionales separadas por comas (opcional)
- `Stock`: Cantidad disponible
- `Featured`: TRUE/FALSE - Si es producto destacado
- `Has Sizes`: TRUE/FALSE - Si tiene talles
- `Available Sizes`: Talles separados por comas (ej: S,M,L o 14,16,18)
- `Tags`: Etiquetas separadas por comas (opcional)

### Ejemplo de Google Sheet

Puedes ver un ejemplo completo aquí: [Ver template](https://docs.google.com/spreadsheets/d/EXAMPLE)

### Dónde Subir las Imágenes

Las imágenes de productos puedes subirlas a:

1. **Cloudinary** (Recomendado) - [cloudinary.com](https://cloudinary.com)
   - Plan gratuito generoso
   - CDN rápido
   - Optimización automática

2. **ImgBB** - [imgbb.com](https://imgbb.com)
   - Gratuito y simple
   - No requiere cuenta

3. **Google Drive**
   - Sube la imagen
   - Click derecho > Obtener enlace > Cambiar a "Cualquiera con el enlace"
   - Usa este formato: `https://drive.google.com/uc?export=view&id=[FILE_ID]`

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye para producción
npm run preview      # Preview del build de producción

# Linting
npm run lint         # Ejecuta ESLint
```

## 📦 Deployment

### Vercel (Recomendado - Gratis)

1. **Sube tu código a GitHub**

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Clic en "Import Project"
   - Selecciona tu repositorio
   - Agrega las variables de entorno desde tu `.env`
   - Deploy!

3. **Variables de entorno en Vercel:**
   - Ve a Project Settings > Environment Variables
   - Agrega todas las variables de tu `.env`

### Netlify (Alternativa)

1. Sube tu código a GitHub
2. Ve a [netlify.com](https://netlify.com)
3. "New site from Git"
4. Configura:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Agrega variables de entorno
6. Deploy!

## 🎨 Personalización

### Colores

Edita `tailwind.config.js` para cambiar los colores principales:

```js
colors: {
  primary: {
    // Tu paleta de color primario
  },
  accent: {
    // Tu paleta de color de acento
  },
}
```

### Textos

Edita `.env` para cambiar:
- Nombre de la tienda
- Descripción
- Mensaje de WhatsApp
- Símbolo de moneda

## 📱 Características Mobile

- **Responsive design**: Se adapta a cualquier tamaño de pantalla
- **Touch-friendly**: Botones y áreas táctiles optimizadas (mínimo 44x44px)
- **Swipe gestures**: Galería de imágenes con gestos
- **Fast loading**: Imágenes lazy-loaded
- **PWA-ready**: Puede convertirse fácilmente en PWA

## 🔒 Seguridad

- La API Key de Google Sheets está en el frontend (es seguro si tu sheet es de solo lectura)
- No hay datos sensibles de usuarios
- No hay autenticación ni pagos en el frontend
- WhatsApp maneja la comunicación de forma segura

## 🤝 Soporte

Si tienes problemas:

1. Verifica que tu `.env` esté configurado correctamente
2. Asegúrate de que el Google Sheet sea público (view only)
3. Revisa que los nombres de las hojas sean exactamente "Categories" y "Products"
4. Verifica la consola del navegador para errores

## 📄 Licencia

Este proyecto es de código abierto. Úsalo como quieras!

## 🎉 ¡Listo!

Tu marketplace está listo para vender. Solo necesitas:

1. ✅ Configurar Google Sheets con tus productos
2. ✅ Subir imágenes a Cloudinary/ImgBB
3. ✅ Configurar variables de entorno
4. ✅ Deploy a Vercel/Netlify
5. ✅ ¡Compartir el link y vender!

---

Hecho con ❤️ para emprendedores que quieren vender online sin complicaciones.
