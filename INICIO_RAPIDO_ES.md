# ⚡ Inicio Rápido - Español

## 🎯 Lo que vas a lograr

En 30 minutos tendrás un marketplace funcionando y listo para vender.

---

## ✅ Paso 1: Instalar (2 minutos)

Abre la terminal en esta carpeta y ejecuta:

```bash
npm install
```

Espera a que se instalen todas las dependencias.

---

## ✅ Paso 2: Configurar Google Sheets (10 minutos)

### 2.1 Obtener API Key

1. Ve a https://console.cloud.google.com/
2. Crea un nuevo proyecto
3. Ve a "APIs y servicios" → "Biblioteca"
4. Busca "Google Sheets API" y actívala
5. Ve a "Credenciales" → "Crear credenciales" → "Clave de API"
6. Copia la API Key que se genera

### 2.2 Crear tu Spreadsheet

1. Ve a https://sheets.google.com
2. Crea un nuevo spreadsheet
3. Crea dos hojas:
   - Una llamada exactamente **`Categories`**
   - Otra llamada exactamente **`Products`**

### 2.3 Llenar con datos

**Hoja "Categories"** (Fila 1 = Headers):
```
ID    | Name      | Description              | Icon URL | Order
------|-----------|--------------------------|----------|------
cat1  | Anillos   | Anillos de plata y oro   |          | 1
cat2  | Cadenitas | Cadenitas elegantes      |          | 2
```

**Hoja "Products"** (Fila 1 = Headers):
```
ID    | Name          | Description              | Price | Category | Image URL                              | Images | Stock | Featured | Has Sizes | Available Sizes | Tags
------|---------------|--------------------------|-------|----------|----------------------------------------|--------|-------|----------|-----------|-----------------|------
prod1 | Anillo Plata  | Anillo de plata 925      | 2500  | cat1     | https://via.placeholder.com/400        |        | 10    | TRUE     | TRUE      | 14,16,18,20     | plata
prod2 | Cadenita Gold | Cadenita dorada elegante | 3500  | cat2     | https://via.placeholder.com/400        |        | 5     | FALSE    | FALSE     |                 | dorado
```

> 💡 **Tip**: Usa `https://via.placeholder.com/400` como imagen temporal

### 2.4 Hacer público el Spreadsheet

1. Click en "Compartir" (arriba derecha)
2. Click en "Cambiar a cualquier persona con el enlace"
3. Asegúrate que diga "Lector"
4. Copia el ID del spreadsheet desde la URL:
   ```
   https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit
   ```

---

## ✅ Paso 3: Configurar Variables de Entorno (3 minutos)

1. En la carpeta del proyecto, edita el archivo **`.env`**

2. Completa con tus datos:

```env
# Google Sheets
VITE_GOOGLE_SHEETS_API_KEY=tu_api_key_aqui
VITE_GOOGLE_SPREADSHEET_ID=tu_spreadsheet_id_aqui

# WhatsApp (sin +, sin espacios, sin guiones)
# Ejemplo Argentina: 5491123456789
VITE_WHATSAPP_NUMBER=5491123456789

# Nombre de tu tienda
VITE_STORE_NAME=Mabi Accessories
VITE_STORE_DESCRIPTION=Accesorios únicos para tu estilo
VITE_CURRENCY_SYMBOL=$
VITE_WHATSAPP_MESSAGE_PREFIX=Hola! Quiero comprar:
```

---

## ✅ Paso 4: Ejecutar (1 minuto)

```bash
npm run dev
```

Abre tu navegador en: **http://localhost:3000**

🎉 **¡Debería estar funcionando!**

---

## ✅ Paso 5: Verificar que Todo Funciona

### Checklist:

- [ ] Se ven las categorías (Anillos, Cadenitas)
- [ ] Se ven los productos con imágenes
- [ ] Puedes hacer click en un producto y ver detalles
- [ ] Puedes agregar productos al carrito
- [ ] El carrito muestra los productos agregados
- [ ] El botón de WhatsApp funciona

Si algo no funciona:
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Verifica tu `.env`
4. Asegúrate que el Google Sheet sea público

---

## ✅ Paso 6: Personalizar (5 minutos)

### Cambiar colores

Edita `tailwind.config.js` y cambia los colores en la sección `colors`.

### Cambiar nombre de la tienda

Ya lo configuraste en el `.env` 😊

### Agregar tus fotos

1. Sube tus fotos a [Cloudinary](https://cloudinary.com) (gratis)
2. Copia las URLs
3. Pégalas en tu Google Sheet (columna "Image URL")
4. Refresca tu navegador

---

## ✅ Paso 7: Deploy a Internet (10 minutos)

### Opción A: Vercel (Recomendado)

1. Sube tu código a GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

2. Ve a https://vercel.com
3. Login con GitHub
4. "New Project" → Importa tu repositorio
5. En "Environment Variables", agrega todas las de tu `.env`
6. Click "Deploy"
7. ¡Listo! Tu sitio estará en: `https://tu-proyecto.vercel.app`

### Opción B: Netlify

Similar a Vercel:
1. Ve a https://netlify.com
2. "New site from Git"
3. Conecta tu repo de GitHub
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Agrega variables de entorno
7. Deploy

---

## 🎉 ¡LISTO!

Tu marketplace está online y funcionando.

### Ahora puedes:

1. ✅ **Compartir el link** con tus clientes
2. ✅ **Agregar más productos** editando el Google Sheet
3. ✅ **Actualizar precios** cuando quieras
4. ✅ **Controlar el stock** desde el sheet
5. ✅ **Recibir pedidos** por WhatsApp

---

## 📚 Siguiente Lectura

- **README.md** - Documentación completa
- **CUSTOMIZATION.md** - Cómo personalizar colores, fuentes, etc.
- **DEPLOYMENT.md** - Más opciones de deployment
- **FEATURES.md** - Lista completa de características

---

## 🆘 ¿Problemas?

### No se ven los productos
- ✅ Verifica que el Google Sheet sea público
- ✅ Verifica que las hojas se llamen "Categories" y "Products"
- ✅ Abre la consola del navegador (F12) y busca errores

### Las imágenes no cargan
- ✅ Verifica que las URLs sean públicas
- ✅ Prueba abrir la URL en una ventana de incógnito
- ✅ Usa https:// (no http://)

### WhatsApp no funciona
- ✅ Formato del número: `5491123456789` (sin +, sin espacios)
- ✅ Prueba en un teléfono real (no solo en desktop)

### Otros problemas
- Abre la consola del navegador (F12)
- Lee el error
- Busca en Google: "vite react [tu error]"

---

## 💡 Tips Finales

### Para vender más:
1. Saca fotos de buena calidad (luz natural)
2. Escribe descripciones atractivas
3. Usa productos destacados (Featured=TRUE) para tus bestsellers
4. Mantén el stock actualizado
5. Responde rápido por WhatsApp

### Para actualizar productos:
1. Edita tu Google Sheet
2. Guarda
3. Espera 5-10 segundos
4. Refresca tu sitio
5. Los cambios deberían aparecer

---

## 🚀 Recursos Útiles

- **Fotos gratis**: [Unsplash](https://unsplash.com), [Pexels](https://pexels.com)
- **Subir fotos**: [Cloudinary](https://cloudinary.com), [ImgBB](https://imgbb.com)
- **Iconos**: [Lucide](https://lucide.dev) (ya incluidos)
- **Colores**: [Coolors](https://coolors.co)
- **Fuentes**: [Google Fonts](https://fonts.google.com)

---

## ✅ Checklist Final

Antes de compartir tu sitio:

- [ ] Todos los productos tienen fotos reales
- [ ] Los precios están correctos
- [ ] El stock está actualizado
- [ ] El número de WhatsApp funciona
- [ ] Probaste hacer una compra de prueba
- [ ] Se ve bien en tu celular
- [ ] Se ve bien en desktop
- [ ] No hay errores en la consola

---

## 🎉 ¡Felicitaciones!

Tienes un marketplace profesional funcionando.

**Tiempo total**: ~30 minutos  
**Costo**: $0  
**Potencial de ventas**: Ilimitado 🚀

---

**¿Preguntas?** Revisa README.md o los otros archivos de documentación.

**¡Éxito con tu tienda!** 💪✨
