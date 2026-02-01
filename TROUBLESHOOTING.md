# 🔧 Guía de Solución de Problemas

Esta guía te ayudará a resolver los problemas más comunes.

---

## 🚫 Problemas de Instalación

### Error: "npm: command not found"

**Problema**: Node.js no está instalado.

**Solución**:
1. Descarga Node.js desde https://nodejs.org
2. Instala la versión LTS (recomendada)
3. Reinicia tu terminal
4. Verifica con: `node --version`

### Error: "EACCES permission denied"

**Problema**: Permisos de npm.

**Solución en Mac/Linux**:
```bash
sudo chown -R $(whoami) ~/.npm
```

**Solución en Windows**:
- Ejecuta CMD como Administrador
- O usa: `npm install --no-optional`

---

## 📊 Problemas con Google Sheets

### "No se cargan los productos"

**Diagnóstico**:
1. Abre DevTools (F12)
2. Ve a la pestaña "Console"
3. ¿Ves errores rojos?

**Posibles causas y soluciones**:

#### Causa 1: API Key inválida
```
Error: API key not valid
```

**Solución**:
- Verifica que copiaste la API Key completa
- Asegúrate que esté en `.env` como `VITE_GOOGLE_SHEETS_API_KEY=...`
- NO debe tener espacios ni comillas
- Reinicia el servidor: `Ctrl+C` y luego `npm run dev`

#### Causa 2: Spreadsheet no es público
```
Error: The caller does not have permission
```

**Solución**:
1. Abre tu Google Sheet
2. Click en "Compartir"
3. Cambia a "Anyone with the link can view"
4. Guarda

#### Causa 3: Spreadsheet ID incorrecto
```
Error: Unable to parse range
```

**Solución**:
- Copia el ID de la URL correctamente:
  ```
  https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit
  ```
- Verifica en `.env`: `VITE_GOOGLE_SPREADSHEET_ID=...`

#### Causa 4: Nombres de hojas incorrectos
```
Error: Unable to parse range: Categories!
```

**Solución**:
- Las hojas DEBEN llamarse exactamente:
  - `Categories` (con mayúscula C)
  - `Products` (con mayúscula P)
- Sin espacios, sin caracteres especiales
- Renombra las hojas si es necesario

#### Causa 5: Google Sheets API no habilitada
```
Error: API has not been used in project
```

**Solución**:
1. Ve a https://console.cloud.google.com/apis/library
2. Busca "Google Sheets API"
3. Click en "ENABLE"
4. Espera 1-2 minutos para que se active

---

## 🖼️ Problemas con Imágenes

### "Las imágenes no se ven"

**Diagnóstico**:
- Click derecho en el espacio de la imagen
- "Inspect" o "Inspeccionar"
- ¿Cuál es la URL de la imagen?

**Posibles causas**:

#### Causa 1: URL no pública
**Solución**:
- Si usas Google Drive:
  ```
  ✅ Correcto: https://drive.google.com/uc?export=view&id=FILE_ID
  ❌ Incorrecto: https://drive.google.com/file/d/FILE_ID/view
  ```
- La imagen debe ser accesible sin login

#### Causa 2: HTTP en vez de HTTPS
**Solución**:
- Cambia `http://` por `https://`
- Los navegadores modernos bloquean HTTP en sitios HTTPS

#### Causa 3: CORS
**Solución**:
- Usa servicios que permiten CORS:
  - ✅ Cloudinary
  - ✅ ImgBB
  - ✅ Unsplash
  - ❌ Algunos servidores personales

#### Causa 4: URL con espacios o caracteres especiales
**Solución**:
```
❌ https://ejemplo.com/mi foto.jpg
✅ https://ejemplo.com/mi-foto.jpg
```

### "Las imágenes cargan muy lento"

**Solución**:
1. Usa Cloudinary (optimización automática)
2. O comprime tus imágenes:
   - https://tinypng.com
   - https://squoosh.app
3. Tamaño recomendado: 800x800px, <200KB

---

## 💬 Problemas con WhatsApp

### "El botón no hace nada"

**Diagnóstico**:
1. Abre DevTools (F12) → Console
2. Haz click en el botón
3. ¿Hay errores?

**Posibles causas**:

#### Causa 1: Número incorrecto
```env
❌ VITE_WHATSAPP_NUMBER=+54 9 11 2345 6789
❌ VITE_WHATSAPP_NUMBER=+5491123456789
✅ VITE_WHATSAPP_NUMBER=5491123456789
```

**Formato correcto**:
- Sin `+`
- Sin espacios
- Sin guiones
- Código de país + número

**Ejemplos**:
- Argentina: `5491123456789`
- México: `5215512345678`
- Colombia: `573001234567`
- España: `34612345678`

#### Causa 2: Popup bloqueado
**Solución**:
- Permite popups para tu sitio
- O usa el botón derecho → "Abrir en nueva pestaña"

### "Se abre WhatsApp pero el mensaje está vacío"

**Diagnóstico**:
- El mensaje es muy largo (>2000 caracteres)

**Solución**:
- WhatsApp tiene límite de ~2000 caracteres en URLs
- Reduce el mensaje de prefijo en `.env`
- O limita cantidad de productos en el carrito

---

## 🛒 Problemas con el Carrito

### "El carrito no guarda los productos"

**Causa**: localStorage deshabilitado o bloqueado

**Solución**:
1. Verifica que no estés en modo incógnito
2. Habilita cookies de terceros si es necesario
3. Limpia caché del navegador:
   - Chrome: `Ctrl+Shift+Del`
   - Firefox: `Ctrl+Shift+Del`
   - Safari: `Cmd+Option+E`

### "No puedo agregar más productos"

**Causa**: Stock insuficiente

**Solución**:
- Verifica el stock en Google Sheets (columna "Stock")
- Aumenta el stock si es necesario
- El sistema previene agregar más del stock disponible

### "El total no se calcula bien"

**Diagnóstico**:
- Abre DevTools (F12)
- Ve a "Application" → "Local Storage"
- Busca `mabi-cart-storage`
- Revisa los precios

**Solución**:
1. Limpia el carrito: "Vaciar carrito"
2. Si persiste, limpia localStorage:
   ```javascript
   // En la consola del navegador:
   localStorage.clear();
   location.reload();
   ```

---

## 🎨 Problemas de Estilo

### "Los estilos no se aplican"

**Posibles causas**:

#### Causa 1: Tailwind no configurado
**Solución**:
```bash
npm install -D tailwindcss postcss autoprefixer
```

#### Causa 2: Cache del navegador
**Solución**:
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) o `Cmd+Shift+R` (Mac)
- O abre DevTools → Settings → "Disable cache" (mientras DevTools abierto)

#### Causa 3: Error en tailwind.config.js
**Solución**:
- Verifica que no haya errores de sintaxis
- Verifica las comas y llaves
- Reinicia el servidor

### "Colores no cambian"

**Solución**:
1. Verifica `tailwind.config.js`
2. Reinicia el servidor: `Ctrl+C` y `npm run dev`
3. Hard refresh en el navegador

---

## ⚡ Problemas de Performance

### "El sitio carga lento"

**Diagnóstico**:
1. Abre DevTools (F12)
2. Ve a "Network"
3. Refresca la página
4. ¿Qué archivo tarda más?

**Soluciones**:

#### Si son las imágenes:
- Comprime las imágenes
- Usa Cloudinary con auto-optimización
- Reduce tamaño a 800x800px

#### Si es el bundle JS:
```bash
# Analiza el bundle
npm run build
npx vite-bundle-visualizer
```

#### Si es Google Sheets API:
- Implementa caché (avanzado)
- Por ahora, los datos se cargan solo una vez al abrir la página

### "Lighthouse score bajo"

**Soluciones comunes**:

1. **Performance**:
   - Optimiza imágenes
   - Usa lazy loading (ya incluido)

2. **Accessibility**:
   - Agrega `alt` text a todas las imágenes
   - Verifica contraste de colores

3. **Best Practices**:
   - Usa HTTPS en producción
   - Actualiza dependencias: `npm update`

4. **SEO**:
   - Agrega meta description en `index.html`
   - Usa semantic HTML

---

## 🚀 Problemas de Deploy

### Vercel: "Build failed"

**Posibles causas**:

#### Causa 1: Variables de entorno no configuradas
**Solución**:
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega TODAS las variables de tu `.env`
4. Redesploy

#### Causa 2: Node version
**Solución**:
1. Agrega `engines` en `package.json`:
```json
"engines": {
  "node": "18.x"
}
```

#### Causa 3: TypeScript errors
**Solución**:
```bash
# Local, verifica errores:
npm run build

# Si hay errores de tipos, corrígelos
```

### Netlify: "Deploy failed"

**Solución**:
1. Verifica que el build command sea: `npm run build`
2. Verifica que publish directory sea: `dist`
3. Agrega variables de entorno
4. Reinicia deploy

### "Variables de entorno no funcionan en producción"

**Causa**: Las variables DEBEN tener prefijo `VITE_`

**Solución**:
```env
✅ VITE_GOOGLE_SHEETS_API_KEY=...
❌ GOOGLE_SHEETS_API_KEY=...
```

---

## 🔄 Problemas de Actualización

### "Cambié el Google Sheet pero no se actualiza"

**Solución**:
1. Espera 5-10 segundos
2. Hard refresh: `Ctrl+Shift+R`
3. Verifica que guardaste el Google Sheet
4. Abre el sheet en incógnito para verificar que sea público

### "Hice cambios en el código pero no se ven"

**Solución**:
1. Verifica que guardaste el archivo
2. El servidor de desarrollo debería auto-reload
3. Si no: `Ctrl+C` y luego `npm run dev`
4. Hard refresh en el navegador

---

## 🐛 Errores Específicos

### "Cannot read property 'map' of undefined"

**Causa**: `products` o `categories` es undefined

**Solución**:
- Verifica que el Google Sheet tenga datos
- Verifica que las hojas se llamen correctamente
- Revisa la consola para ver si hay error al cargar datos

### "Failed to fetch"

**Causa**: Problema de red o CORS

**Solución**:
1. Verifica tu conexión a internet
2. Verifica que la API Key sea válida
3. Verifica que Google Sheets API esté habilitada

### "Hydration mismatch"

**Causa**: Problema de React (raro en este proyecto)

**Solución**:
```bash
# Limpia cache y reinstala:
rm -rf node_modules .vite dist
npm install
npm run dev
```

---

## 🛠️ Herramientas de Diagnóstico

### Verificar Todo Rápidamente

```javascript
// Pega esto en la consola del navegador:

console.log('Env Variables:', {
  apiKey: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY ? '✅ Configurado' : '❌ Falta',
  spreadsheetId: import.meta.env.VITE_GOOGLE_SPREADSHEET_ID ? '✅ Configurado' : '❌ Falta',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER ? '✅ Configurado' : '❌ Falta',
});

// Verifica localStorage
console.log('Cart:', localStorage.getItem('mabi-cart-storage'));
```

### Limpiar Todo y Empezar de Cero

```bash
# Limpia todo:
rm -rf node_modules .vite dist
rm package-lock.json

# Reinstala:
npm install

# Ejecuta:
npm run dev
```

---

## 📞 Últimos Recursos

Si ninguna solución funciona:

1. **Busca el error en Google**:
   - Copia el error exacto
   - Busca: "vite react [tu error]"

2. **Revisa la documentación oficial**:
   - [Vite Docs](https://vitejs.dev)
   - [React Docs](https://react.dev)
   - [Tailwind Docs](https://tailwindcss.com)

3. **Verifica versiones**:
   ```bash
   node --version  # Debería ser 18+
   npm --version   # Debería ser 9+
   ```

4. **Último recurso**:
   - Clona el proyecto de nuevo
   - Sigue QUICK_START.md paso a paso
   - No saltees pasos

---

## ✅ Checklist de Diagnóstico

Cuando algo no funciona, verifica en orden:

- [ ] Node.js instalado (v18+)
- [ ] Dependencias instaladas (`node_modules` existe)
- [ ] `.env` configurado correctamente
- [ ] Variables tienen prefijo `VITE_`
- [ ] Google Sheet es público
- [ ] Hojas se llaman "Categories" y "Products"
- [ ] Google Sheets API habilitada
- [ ] Servidor corriendo (`npm run dev`)
- [ ] No hay errores en la consola (F12)
- [ ] Puerto 3000 no está ocupado

---

**¿Sigue sin funcionar?** 

Revisa la consola del navegador (F12) y busca el mensaje de error exacto en Google. 

9 de cada 10 veces la solución está en Stack Overflow 😉
