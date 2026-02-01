# 🎨 Guía de Personalización

Esta guía te ayudará a personalizar el marketplace para que se ajuste a tu marca.

## 🎨 Colores y Branding

### Cambiar Paleta de Colores

Edita `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#tu-color-mas-claro',
        100: '#...',
        // ... hasta
        900: '#tu-color-mas-oscuro',
      },
      accent: {
        50: '#tu-color-acento-mas-claro',
        // ...
        900: '#tu-color-acento-mas-oscuro',
      },
    },
  },
}
```

### Generador de Paleta

Usa herramientas como:
- [Coolors.co](https://coolors.co) - Generador de paletas
- [UIColors](https://uicolors.app) - Generador de Tailwind colors
- [Paletton](https://paletton.com) - Rueda de colores

### Colores Preconfigurados

**Ejemplo 1: Verde Menta (Femenino y fresco)**
```javascript
primary: {
  600: '#10b981', // Verde esmeralda
  700: '#059669',
},
accent: {
  500: '#f59e0b', // Amarillo dorado
  600: '#d97706',
}
```

**Ejemplo 2: Azul Marino (Elegante y profesional)**
```javascript
primary: {
  600: '#2563eb', // Azul
  700: '#1d4ed8',
},
accent: {
  500: '#ec4899', // Rosa
  600: '#db2777',
}
```

**Ejemplo 3: Rosa Gold (Lujo y sofisticación)**
```javascript
primary: {
  600: '#e879f9', // Rosa magenta
  700: '#d946ef',
},
accent: {
  500: '#f97316', // Naranja dorado
  600: '#ea580c',
}
```

---

## 📝 Textos y Mensajes

### Nombre y Descripción de la Tienda

Edita `.env`:

```env
VITE_STORE_NAME=Tu Nombre de Tienda
VITE_STORE_DESCRIPTION=Tu descripción única
```

### Mensaje de WhatsApp

Personaliza el mensaje que se envía:

```env
VITE_WHATSAPP_MESSAGE_PREFIX=¡Hola! Me interesan estos productos:
```

### Símbolo de Moneda

Para otros países:

```env
# Argentina
VITE_CURRENCY_SYMBOL=$

# México
VITE_CURRENCY_SYMBOL=$

# Colombia
VITE_CURRENCY_SYMBOL=$

# España
VITE_CURRENCY_SYMBOL=€

# Otra opción con texto
VITE_CURRENCY_SYMBOL=ARS $
```

---

## 🖼️ Logo y Favicon

### Cambiar el Logo

1. **Reemplazar el icono en Header:**

Edita `src/components/Header.tsx`:

```tsx
// Reemplaza el componente Sparkles con tu logo
<img 
  src="/logo.png" 
  alt="Logo" 
  className="w-8 h-8"
/>
```

2. **Agregar tu logo:**
   - Guarda tu logo en `public/logo.png`
   - Tamaño recomendado: 200x200px o mayor

### Cambiar el Favicon

1. Reemplaza `public/vite.svg` con tu favicon
2. O edita `index.html`:

```html
<link rel="icon" type="image/png" href="/tu-favicon.png" />
```

Usa [Favicon.io](https://favicon.io) para generar favicons desde tu logo.

---

## 🎭 Fuentes

### Cambiar la Fuente Principal

1. **Encuentra una fuente en Google Fonts:**
   - Ve a [Google Fonts](https://fonts.google.com)
   - Elige tu fuente (ej: Poppins, Montserrat, Raleway)

2. **Actualiza `index.html`:**

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

3. **Actualiza `tailwind.config.js`:**

```javascript
fontFamily: {
  sans: ['Poppins', 'system-ui', 'sans-serif'],
},
```

### Fuentes Recomendadas

**Modernas y Limpias:**
- Inter (actual)
- Poppins
- Montserrat
- Work Sans

**Elegantes:**
- Playfair Display
- Cormorant
- Bodoni Moda

**Juveniles:**
- Quicksand
- Nunito
- Fredoka

---

## 📱 Personalizar Componentes

### Header

Edita `src/components/Header.tsx` para:
- Cambiar logo
- Agregar enlaces adicionales
- Modificar estilo

### Footer

Edita `src/App.tsx` (sección footer) para:
- Agregar redes sociales
- Cambiar textos
- Agregar links legales

Ejemplo con redes sociales:

```tsx
<footer className="bg-white border-t border-gray-200 py-8 mt-12">
  <div className="container mx-auto px-4">
    {/* Redes Sociales */}
    <div className="flex justify-center gap-6 mb-4">
      <a href="https://instagram.com/tu_usuario" target="_blank" rel="noopener">
        <Instagram className="w-6 h-6 text-gray-600 hover:text-primary-600" />
      </a>
      <a href="https://facebook.com/tu_pagina" target="_blank" rel="noopener">
        <Facebook className="w-6 h-6 text-gray-600 hover:text-primary-600" />
      </a>
      <a href="https://tiktok.com/@tu_usuario" target="_blank" rel="noopener">
        {/* Icono de TikTok */}
      </a>
    </div>
    
    <p className="text-center text-gray-600 text-sm">
      © 2026 Tu Tienda. Todos los derechos reservados.
    </p>
  </div>
</footer>
```

### Product Cards

Edita `src/components/ProductCard.tsx` para:
- Cambiar estilo de las tarjetas
- Mostrar/ocultar información
- Cambiar animaciones

---

## 🖼️ Imágenes y Placeholders

### Placeholder Personalizado

Si no tienes fotos aún, usa placeholders personalizados:

```
https://via.placeholder.com/400x400/E879F9/FFFFFF?text=Tu+Producto
```

Parámetros:
- `400x400` - Tamaño
- `E879F9` - Color de fondo (hex sin #)
- `FFFFFF` - Color de texto (hex sin #)
- `text=` - Texto a mostrar

### Optimización de Imágenes

Para mejor rendimiento:

1. **Usa Cloudinary** (recomendado):
   - Auto-optimización
   - Redimensionado automático
   - Carga lazy automática

2. **O comprime localmente:**
   - [TinyPNG](https://tinypng.com) para PNG
   - [Squoosh](https://squoosh.app) para JPG/WebP
   - Tamaño recomendado: 800x800px

---

## 🎯 Categorías Personalizadas

### Cambiar Categorías

En tu Google Sheet (hoja Categories):

```
ID    | Name       | Description                    | Order
------|------------|--------------------------------|------
cat1  | Tu Cat 1   | Descripción de tu categoría    | 1
cat2  | Tu Cat 2   | Otra descripción               | 2
```

### Iconos en Categorías (Opcional)

Puedes agregar iconos usando URLs o emojis:

```
cat1 | Anillos 💍 | ...
cat2 | Cadenitas ⛓️ | ...
```

---

## 🛠️ Características Adicionales

### Agregar Búsqueda

En `src/App.tsx`, agrega un input de búsqueda:

```tsx
const [searchQuery, setSearchQuery] = useState('');

const filteredProducts = useMemo(() => {
  let filtered = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : products;
  
  if (searchQuery) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  return filtered;
}, [products, selectedCategory, searchQuery]);
```

### Agregar Botón de WhatsApp Flotante

En `src/App.tsx`:

```tsx
<a
  href={`https://wa.me/${config.whatsapp.number}`}
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-30"
>
  {/* Icono de WhatsApp */}
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    {/* SVG path del icono de WhatsApp */}
  </svg>
</a>
```

### Dark Mode

1. Instala el plugin de Tailwind:
```bash
npm install @tailwindcss/forms
```

2. Agrega en `tailwind.config.js`:
```javascript
darkMode: 'class',
```

3. Crea un toggle en el header
4. Agrega clases dark: a tus componentes

---

## 📊 Analytics

### Agregar Google Analytics

En `index.html`, antes de `</head>`:

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

### Agregar Facebook Pixel

Similar al GA, agrega el código de Facebook Pixel en `index.html`.

---

## 🌐 SEO

### Meta Tags Personalizados

Edita `index.html`:

```html
<meta name="description" content="Tu descripción personalizada para SEO" />
<meta name="keywords" content="accesorios, joyería, plata, anillos" />
<meta name="author" content="Tu Nombre" />

<!-- Open Graph para redes sociales -->
<meta property="og:title" content="Tu Tienda - Accesorios únicos" />
<meta property="og:description" content="Descripción para redes" />
<meta property="og:image" content="https://tu-sitio.com/og-image.jpg" />
<meta property="og:url" content="https://tu-sitio.com" />
```

---

## 🎨 Animaciones Personalizadas

### Agregar Nuevas Animaciones

En `tailwind.config.js`:

```javascript
animation: {
  'spin-slow': 'spin 3s linear infinite',
  'wiggle': 'wiggle 1s ease-in-out infinite',
},
keyframes: {
  wiggle: {
    '0%, 100%': { transform: 'rotate(-3deg)' },
    '50%': { transform: 'rotate(3deg)' },
  }
}
```

Luego usa: `className="animate-wiggle"`

---

## 💡 Tips Finales

### Testear Cambios

Siempre testea tus cambios en:
- ✅ Desktop (Chrome, Firefox, Safari)
- ✅ Mobile (tu teléfono real)
- ✅ Diferentes tamaños de pantalla
- ✅ Modo oscuro del navegador (si lo implementaste)

### Mantener Consistencia

- Usa los mismos espaciados en todos lados
- Mantén la jerarquía de textos consistente
- Usa la misma paleta de colores
- Mantén el mismo estilo de botones

### Performance

Después de personalizar, verifica:
```bash
npm run build
npm run preview
```

Y testea con Lighthouse (F12 > Lighthouse).

---

## 🆘 ¿Necesitas Ayuda?

Si algo no funciona después de personalizar:

1. Revisa la consola del navegador (F12)
2. Verifica que no haya errores de sintaxis
3. Asegúrate de haber guardado todos los archivos
4. Reinicia el servidor de desarrollo

---

¡Personaliza tu marketplace y hazlo único! 🎨✨
