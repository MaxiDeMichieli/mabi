# 📊 Guía Completa: Configurar Google Sheets

Esta guía te llevará paso a paso para configurar Google Sheets como base de datos para tu marketplace.

## 🎯 Objetivo

Al final de esta guía tendrás:
- ✅ Google Sheets API habilitada
- ✅ API Key generada
- ✅ Spreadsheet configurado correctamente
- ✅ Productos y categorías cargados

---

## Paso 1: Obtener API Key de Google Sheets

### 1.1 Acceder a Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Inicia sesión con tu cuenta de Google

### 1.2 Crear un Proyecto

1. Click en el selector de proyectos (arriba a la izquierda)
2. Click en "New Project" (Nuevo Proyecto)
3. Nombre del proyecto: `Mabi Marketplace` (o el que prefieras)
4. Click en "Create" (Crear)
5. Espera unos segundos y selecciona el proyecto recién creado

### 1.3 Habilitar Google Sheets API

1. En el menú lateral, ve a: **APIs & Services** > **Library**
2. En el buscador, escribe: `Google Sheets API`
3. Click en **Google Sheets API**
4. Click en el botón azul **"ENABLE"** (Habilitar)

### 1.4 Crear API Key

1. Ve a: **APIs & Services** > **Credentials**
2. Click en **"+ CREATE CREDENTIALS"** (Crear credenciales)
3. Selecciona: **"API Key"**
4. Se generará una API Key - **¡CÓPIALA!**
5. (Opcional) Click en "Restrict Key" para agregar restricciones:
   - En "API restrictions", selecciona "Restrict key"
   - Marca solo "Google Sheets API"
   - (Opcional) En "Application restrictions", puedes agregar tu dominio
   - Click "Save"

### 1.5 Guardar tu API Key

```env
VITE_GOOGLE_SHEETS_API_KEY=AIzaSyB...tu_api_key_completa...
```

⚠️ **IMPORTANTE:** Esta API Key irá en el frontend, así que:
- NO uses una API Key con permisos de escritura
- Solo dará acceso de LECTURA a sheets públicos
- Es seguro exponerla si tu sheet es de solo lectura

---

## Paso 2: Crear y Configurar tu Google Spreadsheet

### 2.1 Crear el Spreadsheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Click en **"+ Blank"** (En blanco)
3. Nombra tu spreadsheet: `Mabi Store Database`

### 2.2 Obtener el Spreadsheet ID

1. Mira la URL de tu spreadsheet:
   ```
   https://docs.google.com/spreadsheets/d/1A2B3C4D5E6F7G8H9I0J/edit
                                          ^^^^^^^^^^^^^^^^^^^^
                                          Este es tu SPREADSHEET_ID
   ```
2. Copia el ID (la parte entre `/d/` y `/edit`)

### 2.3 Hacer el Spreadsheet Público

1. Click en el botón **"Share"** (Compartir) arriba a la derecha
2. Click en **"Change to anyone with the link"**
3. Asegúrate que diga: **"Anyone with the link"** y **"Viewer"**
4. Click en **"Done"**

⚠️ Esto solo permite VER el documento, nadie puede editarlo.

---

## Paso 3: Configurar las Hojas (Sheets)

### 3.1 Crear Hoja de Categorías

1. Renombra la primera hoja (abajo) a exactamente: **`Categories`**
2. Agrega estos headers en la fila 1:

```
A1: ID
B1: Name
C1: Description
D1: Icon URL
E1: Order
```

### 3.2 Ejemplo de Datos - Categories

| A (ID) | B (Name) | C (Description) | D (Icon URL) | E (Order) |
|--------|----------|-----------------|--------------|-----------|
| cat1 | Anillos | Anillos de plata y oro | | 1 |
| cat2 | Cadenitas | Cadenitas elegantes | | 2 |
| cat3 | Pulseras | Pulseras únicas | | 3 |
| cat4 | Aretes | Aretes modernos | | 4 |

**Notas:**
- `ID`: Debe ser único (ej: cat1, cat2, etc.)
- `Name`: El nombre que verán los clientes
- `Description`: Descripción opcional
- `Icon URL`: Déjalo vacío por ahora (opcional)
- `Order`: Orden de aparición (1, 2, 3...)

### 3.3 Crear Hoja de Productos

1. Click en el **"+"** abajo a la izquierda para crear nueva hoja
2. Nómbrala exactamente: **`Products`**
3. Agrega estos headers en la fila 1:

```
A1: ID
B1: Name
C1: Description
D1: Price
E1: Category
F1: Image URL
G1: Images
H1: Stock
I1: Featured
J1: Has Sizes
K1: Available Sizes
L1: Tags
```

### 3.4 Ejemplo de Datos - Products

**Ejemplo 1: Anillo con Talles**

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| prod1 | Anillo Plata 925 | Elegante anillo de plata 925 con diseño minimalista | 2500 | cat1 | https://i.imgur.com/abc123.jpg | https://i.imgur.com/abc124.jpg,https://i.imgur.com/abc125.jpg | 15 | TRUE | TRUE | 14,16,18,20,22 | plata,elegante,minimal |

**Ejemplo 2: Cadenita sin Talles**

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| prod2 | Cadenita Dorada | Cadenita bañada en oro de 45cm | 3500 | cat2 | https://i.imgur.com/xyz123.jpg | | 8 | FALSE | FALSE | | dorado,trendy |

**Ejemplo 3: Producto Destacado**

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| prod3 | Anillo Corazón | Anillo especial con forma de corazón | 4200 | cat1 | https://i.imgur.com/heart123.jpg | | 3 | TRUE | TRUE | S,M,L | especial,regalo,corazón |

### 3.5 Descripción de Columnas - Products

| Columna | Descripción | Ejemplo | Requerido |
|---------|-------------|---------|-----------|
| **ID** | Identificador único | prod1, prod2 | ✅ Sí |
| **Name** | Nombre del producto | "Anillo Plata 925" | ✅ Sí |
| **Description** | Descripción detallada | "Elegante anillo de..." | ⚠️ Recomendado |
| **Price** | Precio (solo números) | 2500 (sin $) | ✅ Sí |
| **Category** | ID de categoría | cat1 | ✅ Sí |
| **Image URL** | Imagen principal | https://... | ✅ Sí |
| **Images** | Imágenes adicionales | url1,url2,url3 | ❌ Opcional |
| **Stock** | Cantidad disponible | 10 | ✅ Sí |
| **Featured** | ¿Es destacado? | TRUE o FALSE | ✅ Sí |
| **Has Sizes** | ¿Tiene talles? | TRUE o FALSE | ✅ Sí |
| **Available Sizes** | Talles disponibles | 14,16,18,20 | ⚠️ Si Has Sizes=TRUE |
| **Tags** | Etiquetas | plata,elegante | ❌ Opcional |

### 3.6 Formatos Importantes

**Multiple Images (Columna G):**
```
https://imagen1.com/foto.jpg,https://imagen2.com/foto.jpg,https://imagen3.com/foto.jpg
```
- Separar con comas (`,`)
- Sin espacios

**Available Sizes (Columna K):**
```
Para anillos: 14,16,18,20,22
Para ropa: XS,S,M,L,XL
Para medidas: 40,42,44,46
```
- Separar con comas (`,`)
- Sin espacios

**Tags (Columna L):**
```
plata,elegante,minimalista,trending
```
- Separar con comas (`,`)
- Sin espacios

**Boolean (TRUE/FALSE):**
- Escribir exactamente: `TRUE` o `FALSE`
- También acepta: `true`, `false`, `YES`, `NO`, `1`, `0`

---

## Paso 4: Subir Imágenes de Productos

Necesitas URLs públicas para las imágenes. Opciones recomendadas:

### Opción 1: Cloudinary (Recomendado)

1. Crea cuenta en [cloudinary.com](https://cloudinary.com)
2. Ve a "Media Library"
3. Upload tus imágenes
4. Click derecho en imagen > "Copy URL"
5. Pega la URL en tu Google Sheet

**Ventajas:**
- ✅ CDN rápido
- ✅ Optimización automática
- ✅ Plan gratuito generoso (25 GB)
- ✅ Redimensionado automático

### Opción 2: ImgBB

1. Ve a [imgbb.com](https://imgbb.com)
2. Upload imagen
3. Copia "Direct link"
4. Pega en Google Sheet

**Ventajas:**
- ✅ No requiere cuenta
- ✅ Muy simple
- ✅ Gratis

### Opción 3: Google Drive

1. Sube imagen a Google Drive
2. Click derecho > "Get link"
3. Cambia a "Anyone with the link"
4. Copia el `FILE_ID` de la URL
5. Usa este formato:
   ```
   https://drive.google.com/uc?export=view&id=[FILE_ID]
   ```

---

## Paso 5: Verificar tu Configuración

### 5.1 Checklist de Categorías

- [ ] Hoja se llama exactamente "Categories"
- [ ] Headers en fila 1: ID, Name, Description, Icon URL, Order
- [ ] Cada categoría tiene un ID único
- [ ] Los números en Order son secuenciales

### 5.2 Checklist de Productos

- [ ] Hoja se llama exactamente "Products"
- [ ] Headers en fila 1 correctos (12 columnas)
- [ ] Cada producto tiene ID único
- [ ] Todos los productos tienen: Name, Price, Category, Image URL, Stock
- [ ] Los Category IDs coinciden con los de la hoja Categories
- [ ] Featured es TRUE o FALSE
- [ ] Has Sizes es TRUE o FALSE
- [ ] Si Has Sizes=TRUE, Available Sizes tiene valores
- [ ] Precios son números (sin símbolos)
- [ ] URLs de imágenes son válidas y públicas

### 5.3 Verificar Spreadsheet Público

1. Abre una ventana de incógnito
2. Pega la URL de tu spreadsheet
3. Deberías poder verlo sin iniciar sesión
4. Si pide login, vuelve al Paso 2.3

---

## Paso 6: Conectar con tu Frontend

### 6.1 Actualizar .env

Crea/edita el archivo `.env` en la raíz de tu proyecto:

```env
# Google Sheets Configuration
VITE_GOOGLE_SHEETS_API_KEY=tu_api_key_aqui
VITE_GOOGLE_SPREADSHEET_ID=tu_spreadsheet_id_aqui

# WhatsApp Configuration
VITE_WHATSAPP_NUMBER=5491123456789

# Store Configuration
VITE_STORE_NAME=Mabi Accessories
VITE_STORE_DESCRIPTION=Accesorios únicos para tu estilo
VITE_CURRENCY_SYMBOL=$
VITE_WHATSAPP_MESSAGE_PREFIX=Hola! Quiero comprar los siguientes productos:
```

### 6.2 Probar Localmente

```bash
npm run dev
```

Abre http://localhost:3000 y verifica que:
- Se muestran las categorías
- Se muestran los productos
- Las imágenes cargan correctamente

---

## 🎉 ¡Listo!

Tu Google Sheets está configurado correctamente como base de datos para tu marketplace.

## 📝 Tips para Mantener tu Sheet

1. **Backup:** Haz copias regulares de tu spreadsheet
2. **Imágenes:** Usa URLs estables (no enlaces temporales)
3. **IDs:** Nunca cambies los IDs una vez creados
4. **Stock:** Actualiza el stock regularmente
5. **Testing:** Prueba en incógnito después de cambios importantes

## ❓ Troubleshooting

**No se cargan los productos:**
- Verifica que el spreadsheet sea público
- Verifica que los nombres de hojas sean exactos: "Categories" y "Products"
- Revisa la consola del navegador para errores

**Imágenes no cargan:**
- Verifica que las URLs sean públicas
- Usa URLs directas (no enlaces de compartir)
- Intenta abrir la URL en una ventana de incógnito

**Error de API:**
- Verifica que la Google Sheets API esté habilitada
- Verifica que la API Key sea correcta
- Espera unos minutos (a veces tarda en activarse)

---

¿Necesitas ayuda? Revisa la consola del navegador (F12) para ver errores específicos.
