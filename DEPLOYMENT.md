# 🚀 Guía de Deployment

Esta guía te ayudará a deployar tu marketplace a producción de forma gratuita.

## Opciones de Hosting Gratuito

1. **Vercel** ⭐ (Recomendado)
2. **Netlify**
3. **GitHub Pages**
4. **Cloudflare Pages**

---

## 1. Deployment con Vercel (Recomendado)

### Por qué Vercel:
- ✅ Completamente gratis para proyectos personales
- ✅ Deploy automático desde GitHub
- ✅ SSL gratis
- ✅ CDN global ultra rápido
- ✅ Variables de entorno fáciles de configurar
- ✅ Preview deployments automáticos

### Paso a Paso:

#### 1.1 Preparar el Código

```bash
# Asegúrate que todo funciona localmente
npm run build
npm run preview
```

#### 1.2 Subir a GitHub

```bash
# Inicializar git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "Initial commit"

# Crear repo en GitHub y conectar
git remote add origin https://github.com/tu-usuario/mabi-marketplace.git
git branch -M main
git push -u origin main
```

#### 1.3 Deploy en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz login con tu cuenta de GitHub
3. Click en **"New Project"**
4. Importa tu repositorio de GitHub
5. Vercel detectará automáticamente que es un proyecto Vite
6. **No hagas deploy todavía** - primero configura las variables de entorno

#### 1.4 Configurar Variables de Entorno

Antes de hacer deploy, agrega tus variables:

1. En Vercel, ve a: **Settings** > **Environment Variables**
2. Agrega cada variable de tu archivo `.env`:

```
VITE_GOOGLE_SHEETS_API_KEY = tu_api_key
VITE_GOOGLE_SPREADSHEET_ID = tu_spreadsheet_id
VITE_WHATSAPP_NUMBER = 5491123456789
VITE_STORE_NAME = Mabi Accessories
VITE_STORE_DESCRIPTION = Accesorios únicos para tu estilo
VITE_CURRENCY_SYMBOL = $
VITE_WHATSAPP_MESSAGE_PREFIX = Hola! Quiero comprar:
```

**Importante:** Marca las variables como disponibles para:
- [x] Production
- [x] Preview
- [x] Development

#### 1.5 Deploy!

1. Click en **"Deploy"**
2. Espera 1-2 minutos
3. ¡Listo! Tu sitio estará en: `https://tu-proyecto.vercel.app`

#### 1.6 Dominio Custom (Opcional)

Si tienes un dominio:

1. Ve a: **Settings** > **Domains**
2. Agrega tu dominio
3. Configura los DNS según las instrucciones
4. ¡Listo en minutos!

### Deploy Automático

Ahora, cada vez que hagas push a GitHub, Vercel automáticamente:
- Detectará los cambios
- Hará un nuevo build
- Deployará la nueva versión
- Te enviará un email de confirmación

```bash
# Para actualizar tu sitio:
git add .
git commit -m "Descripción de cambios"
git push
# ¡Vercel hace el resto automáticamente!
```

---

## 2. Deployment con Netlify

### Paso a Paso:

#### 2.1 Subir a GitHub

(Igual que Vercel - sección 1.2)

#### 2.2 Deploy en Netlify

1. Ve a [netlify.com](https://netlify.com)
2. Login con GitHub
3. Click en **"Add new site"** > **"Import an existing project"**
4. Selecciona tu repo de GitHub
5. Configura:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click en **"Show advanced"** para agregar variables de entorno

#### 2.3 Variables de Entorno

Agrega las mismas variables que en Vercel (sección 1.4)

#### 2.4 Deploy

Click en **"Deploy site"** y espera 1-2 minutos.

Tu sitio estará en: `https://random-name-123.netlify.app`

Puedes cambiar el nombre en: **Site settings** > **Change site name**

---

## 3. Deployment Manual (Sin Git)

Si no quieres usar Git/GitHub:

### Con Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Build
npm run build

# Deploy
vercel

# Seguir las instrucciones en terminal
```

### Con Netlify CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy

# Para producción
netlify deploy --prod
```

---

## 4. Verificación Post-Deploy

### Checklist:

- [ ] El sitio carga correctamente
- [ ] Las categorías aparecen
- [ ] Los productos aparecen con imágenes
- [ ] Las imágenes cargan rápido
- [ ] El carrito funciona
- [ ] El botón de WhatsApp funciona y abre la app
- [ ] Funciona en móvil
- [ ] Las animaciones son suaves
- [ ] No hay errores en la consola

### Probar en Móvil:

1. Abre el sitio en tu teléfono
2. Prueba agregar productos al carrito
3. Prueba el checkout de WhatsApp
4. Verifica que las imágenes carguen rápido

---

## 5. Optimizaciones Post-Deploy

### 5.1 Lighthouse Score

Verifica el rendimiento:

1. Abre Chrome DevTools (F12)
2. Ve a la pestaña **Lighthouse**
3. Click en **"Generate report"**
4. Objetivo: >90 en todas las categorías

### 5.2 Optimizar Imágenes

Si las imágenes cargan lento:

1. Usa Cloudinary (ya incluido en las instrucciones)
2. O comprime tus imágenes con [TinyPNG](https://tinypng.com)
3. Usa formato WebP cuando sea posible

### 5.3 Caché de Google Sheets

Para evitar límites de API:

En un futuro, puedes agregar caché. Por ahora, con el tráfico inicial, no es necesario.

---

## 6. Monitoreo y Analytics

### Agregar Google Analytics (Opcional)

1. Crea una cuenta en [Google Analytics](https://analytics.google.com)
2. Obtén tu ID de medición (G-XXXXXXXXXX)
3. Agrega al `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Vercel Analytics

Vercel ofrece analytics gratis:
1. Ve a tu proyecto en Vercel
2. Click en **Analytics**
3. Click en **Enable**

---

## 7. Actualizar el Sitio

### Cambiar Productos:

1. Edita tu Google Sheet
2. Los cambios aparecerán automáticamente (puede tardar unos segundos por caché del navegador)
3. No necesitas redesployar

### Cambiar Código:

```bash
# Hacer cambios en el código
git add .
git commit -m "Descripción del cambio"
git push

# Vercel/Netlify deployarán automáticamente
```

---

## 8. Troubleshooting

### Problema: Variables de entorno no funcionan

**Solución:**
- En Vercel/Netlify, asegúrate que todas las variables tengan el prefijo `VITE_`
- Redesploya después de agregar variables
- Limpia caché del navegador

### Problema: Imágenes no cargan en producción

**Solución:**
- Verifica que las URLs sean HTTPS (no HTTP)
- Verifica que las URLs sean públicas
- Usa un servicio de CDN como Cloudinary

### Problema: WhatsApp no funciona

**Solución:**
- Verifica el formato del número: `5491123456789` (sin +, espacios ni guiones)
- Prueba en un teléfono real (no solo en desktop)

---

## 9. Costos

**Todo es GRATIS** para un marketplace pequeño/mediano:

- ✅ Vercel/Netlify: Gratis (100GB bandwidth/mes)
- ✅ Google Sheets API: Gratis (muchas requests)
- ✅ Cloudinary: Gratis (25GB)
- ✅ WhatsApp: Gratis (es solo un link)
- ✅ SSL/HTTPS: Gratis (incluido)

**Límites generosos:**
- Vercel: 100GB bandwidth/mes
- Netlify: 100GB bandwidth/mes
- Google Sheets API: 500 requests/100 segundos

Para un marketplace pequeño, esto es MÁS que suficiente. Cuando crezcas, los planes pagos son muy accesibles.

---

## 🎉 ¡Listo!

Tu marketplace está online y listo para vender. Solo necesitas:

1. ✅ Compartir el link con tus clientes
2. ✅ Actualizar productos en Google Sheets cuando sea necesario
3. ✅ Responder los mensajes de WhatsApp

**No hay backend que mantener, no hay servidores que pagar, no hay base de datos compleja. Solo tu sitio, tus productos y tus ventas.**

---

## 📱 Siguiente Paso: Marketing

Comparte tu link en:
- Instagram Stories
- Instagram Bio
- WhatsApp Status
- Facebook
- TikTok Bio

¡A vender! 🚀
