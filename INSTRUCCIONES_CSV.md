# 📊 Instrucciones para Importar CSV a Google Sheets

Tienes dos archivos CSV listos para importar:
- `Categories.csv` - Categorías
- `Products.csv` - Productos

---

## 🚀 Cómo Importar (Opción 1 - Recomendada)

### 1. Crea un Nuevo Google Spreadsheet

1. Ve a https://sheets.google.com
2. Click en "Blank" (En blanco)
3. Nombra tu spreadsheet: "Mabi Store Database"

### 2. Importar Categorías

1. **Renombra la primera hoja a**: `Categories` (exactamente así)
2. Click en **File** (Archivo) > **Import** (Importar)
3. Click en **Upload** (Subir)
4. Arrastra el archivo `Categories.csv`
5. En "Import location" selecciona: **Replace current sheet**
6. En "Separator type" selecciona: **Comma**
7. Click en **Import data**

### 3. Importar Productos

1. Click en el **+** abajo a la izquierda para crear una nueva hoja
2. Renombra esta hoja a: `Products` (exactamente así)
3. Click en **File** > **Import**
4. Arrastra el archivo `Products.csv`
5. En "Import location" selecciona: **Replace current sheet**
6. En "Separator type" selecciona: **Comma**
7. Click en **Import data**

### 4. Hacer Público

1. Click en **Share** (Compartir) arriba a la derecha
2. Click en **Change to anyone with the link**
3. Asegúrate que diga "Viewer" (Lector)
4. Click en **Done**

### 5. Copiar ID

Copia el ID de la URL:
```
https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit
```

Pégalo en tu `.env`:
```env
VITE_GOOGLE_SPREADSHEET_ID=tu_id_aqui
```

---

## 🎯 Opción 2 - Copiar y Pegar Directamente

Si prefieres no usar archivos CSV:

### Categories (Copia todo y pega en la hoja Categories)

```
ID	Name	Description	Icon URL	Order
cat1	Anillos	Anillos de plata y oro para todo estilo		1
cat2	Cadenitas	Cadenitas elegantes y modernas		2
cat3	Pulseras	Pulseras únicas y personalizadas		3
cat4	Aretes	Aretes que realzan tu belleza		4
```

### Products (Copia todo y pega en la hoja Products)

```
ID	Name	Description	Price	Category	Image URL	Images	Stock	Featured	Has Sizes	Available Sizes	Tags
prod1	Anillo Plata 925	Elegante anillo de plata 925 con diseño minimalista perfecto para uso diario	2500	cat1	https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop	https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop,https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop	15	TRUE	TRUE	14,16,18,20,22	plata,elegante,minimal
prod2	Anillo Corazón	Anillo especial con forma de corazón ideal para regalar	4200	cat1	https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop		5	TRUE	TRUE	S,M,L	especial,regalo,corazón
prod3	Anillo Infinito	Anillo con símbolo de infinito que representa amor eterno	3800	cat1	https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&h=800&fit=crop		10	FALSE	TRUE	14,16,18,20	infinito,amor,símbolo
prod4	Anillo Solitario	Anillo solitario con circonia cúbica de alta calidad	5500	cat1	https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop		8	TRUE	TRUE	14,15,16,17,18,19,20	elegante,circonia,formal
prod5	Cadenita Dorada	Cadenita bañada en oro de 18k de 45cm de largo	3500	cat2	https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop		12	FALSE	FALSE		dorado,elegante
prod6	Cadenita Estrella	Delicada cadenita con dije de estrella brillante	3200	cat2	https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop		8	FALSE	FALSE		estrella,delicado,trendy
prod7	Cadenita Plata	Cadenita de plata 925 con cadena tipo eslabón	2800	cat2	https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop		20	TRUE	FALSE		plata,clásico
prod8	Cadenita Corazón	Cadenita con dije de corazón perfecta para regalo	3600	cat2	https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop		6	TRUE	FALSE		corazón,regalo,amor
prod9	Pulsera Cadena	Pulsera de cadena con cierre ajustable de acero inoxidable	1800	cat3	https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop		25	FALSE	FALSE		casual,acero
prod10	Pulsera Cuero	Pulsera trenzada de cuero genuino con detalles de plata	1500	cat3	https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=800&fit=crop		15	FALSE	FALSE		cuero,casual,unisex
prod11	Pulsera Dijes	Pulsera con dijes personalizables en plata 925	4500	cat3	https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop		10	TRUE	FALSE		personalizable,plata,especial
prod12	Aretes Perla	Aretes elegantes con perla cultivada y base de plata	2800	cat4	https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop		18	TRUE	FALSE		elegante,perla,formal
prod13	Aretes Argolla	Aretes tipo argolla en oro de 18k tamaño mediano	3200	cat4	https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop		12	FALSE	FALSE		dorado,clásico
prod14	Aretes Cristal	Aretes con cristales austriacos de colores vibrantes	2200	cat4	https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop		20	TRUE	FALSE		cristal,colores,trendy
```

**Nota**: Al pegar, Google Sheets automáticamente detectará las columnas separadas por tabuladores.

---

## 📸 Sobre las Imágenes

Los CSV incluyen URLs de **Unsplash** que son:
- ✅ Gratuitas y públicas
- ✅ De alta calidad
- ✅ Optimizadas (800x800px)
- ✅ Funcionan perfectamente

**Para tus fotos reales:**
1. Sube a Cloudinary (https://cloudinary.com)
2. Copia las URLs
3. Reemplaza en el Google Sheet

---

## 📊 Datos Incluidos

### Categorías (4):
- Anillos
- Cadenitas
- Pulseras
- Aretes

### Productos (14):
- **4 Anillos** (todos con talles)
- **4 Cadenitas** (sin talles)
- **3 Pulseras** (sin talles)
- **3 Aretes** (sin talles)

### Productos Destacados (7):
- Anillo Plata 925
- Anillo Corazón
- Anillo Solitario
- Cadenita Plata
- Cadenita Corazón
- Pulsera Dijes
- Aretes Perla
- Aretes Cristal

---

## ✅ Verificar que Funcione

Después de importar:

1. **Nombres de hojas correctos:**
   - `Categories` (con C mayúscula)
   - `Products` (con P mayúscula)

2. **Headers en fila 1:**
   - Categories: ID, Name, Description, Icon URL, Order
   - Products: ID, Name, Description, Price, Category, Image URL, Images, Stock, Featured, Has Sizes, Available Sizes, Tags

3. **Sheet es público:**
   - Prueba abriendo en ventana incógnita

4. **Copia el ID:**
   - Pégalo en `.env`

5. **Ejecuta:**
   ```bash
   npm run dev
   ```

6. **Deberías ver:**
   - 4 categorías
   - 14 productos con imágenes
   - Todo funcionando perfectamente

---

## 🎨 Personalizar

Una vez que funcione, puedes:
- Cambiar nombres y descripciones
- Modificar precios
- Agregar más productos
- Cambiar las imágenes por las tuyas

Solo edita el Google Sheet y los cambios aparecerán automáticamente (refresca el navegador).

---

## 🆘 Problemas Comunes

### "Las imágenes no cargan"
- Las URLs de Unsplash funcionan perfectamente
- Si no se ven, verifica tu conexión a internet
- Prueba abrir una URL directamente en el navegador

### "No aparecen los productos"
- Verifica que las hojas se llamen exactamente "Categories" y "Products"
- Verifica que el sheet sea público
- Revisa la consola del navegador (F12) para errores

### "El CSV no se importa bien"
- Asegúrate de seleccionar "Comma" como separador
- Prueba con la Opción 2 (copiar/pegar)

---

¡Listo! En minutos tendrás un catálogo completo funcionando 🚀
