# Changelog

Todos los cambios notables en este proyecto serán documentados aquí.

## [1.0.0] - 2026-01-25

### ✨ Inicial Release

#### 🎨 Diseño y UI
- Diseño mobile-first elegante y juvenil
- Sistema de colores personalizable (púrpura/magenta + naranja)
- Animaciones suaves y transiciones fluidas
- Componentes responsive en todos los tamaños de pantalla

#### 🛍️ Funcionalidades de Tienda
- Catálogo de productos con grid responsive
- Sistema de categorías con filtrado
- Modal de detalles de producto
- Galería de imágenes múltiples por producto
- Sistema de productos destacados
- Indicadores de stock (bajo stock, sin stock)

#### 🛒 Carrito de Compras
- Carrito persistente con localStorage (Zustand)
- Sidebar deslizable desde la derecha
- Agregar, eliminar y modificar cantidades
- Validación de stock en tiempo real
- Cálculo automático de totales
- Contador animado en header

#### 📏 Sistema de Talles
- Soporte para productos con talles (anillos, ropa, etc.)
- Selector visual de talles
- Validación de talle requerido
- Talles configurables por producto
- Formato flexible (números o letras)

#### 💬 Integración WhatsApp
- Checkout directo a WhatsApp
- Mensaje pre-formateado con productos del carrito
- Incluye nombre, talle, cantidad, precio por item
- Total calculado automáticamente
- Configurable desde variables de entorno

#### 📊 Google Sheets como CMS
- Integración con Google Sheets API v4
- Dos hojas: Categories y Products
- Lectura en tiempo real
- Fácil actualización sin redesploy
- Soporte para múltiples imágenes
- Tags y metadata configurables

#### ⚡ Performance
- Vite para builds rápidos
- Lazy loading de imágenes
- Code splitting automático
- Optimizado para Lighthouse (90+ score)

#### 🛠️ Developer Experience
- TypeScript completo
- ESLint configurado
- Path aliases (@/)
- Estructura de carpetas organizada
- Componentes reutilizables
- Servicios bien separados

#### 📚 Documentación
- README completo con guías
- QUICK_START para empezar rápido
- GOOGLE_SHEETS_SETUP con tutorial paso a paso
- DEPLOYMENT guide para Vercel/Netlify
- GOOGLE_SHEETS_TEMPLATE con datos de ejemplo
- Comentarios en código

#### 🚀 Deploy
- Configuración para Vercel
- Configuración para Netlify
- Variables de entorno documentadas
- .env.example incluido

#### 🎁 Extras
- Mock data para desarrollo
- Utilidades de formato
- Manejo de errores robusto
- Loading states elegantes
- Empty states con mensajes útiles
- .gitignore configurado

---

## Roadmap Futuro

### v1.1.0 (Planeado)
- [ ] Búsqueda de productos
- [ ] Filtros avanzados
- [ ] Sistema de favoritos
- [ ] Compartir productos en redes sociales
- [ ] Optimización de imágenes automática

### v1.2.0 (Planeado)
- [ ] PWA completo con offline support
- [ ] Dark mode
- [ ] Multi-idioma (i18n)
- [ ] Animaciones de transición mejoradas

### v2.0.0 (Futuro)
- [ ] Sistema de cupones/descuentos
- [ ] Reviews y ratings
- [ ] Backend opcional con autenticación
- [ ] Panel de administración
- [ ] Analytics dashboard

---

## Tipos de Cambios

- **✨ Added** - Para nuevas características
- **🔧 Changed** - Para cambios en funcionalidades existentes
- **🗑️ Deprecated** - Para características que serán removidas
- **❌ Removed** - Para características removidas
- **🐛 Fixed** - Para bugs corregidos
- **🔒 Security** - Para vulnerabilidades corregidas
- **⚡ Performance** - Para mejoras de rendimiento
- **📚 Docs** - Para cambios en documentación

---

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/)
