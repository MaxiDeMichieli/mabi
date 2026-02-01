# 📋 Template de Google Sheets

Copia y pega estos datos directamente en tu Google Spreadsheet para empezar rápidamente.

## Hoja: Categories

**Nombre de la hoja:** `Categories` (exacto, con mayúscula)

### Headers (Fila 1):
```
ID | Name | Description | Icon URL | Order
```

### Datos de Ejemplo (Filas 2-5):

```
cat1 | Anillos | Anillos de plata y oro para todo estilo | | 1
cat2 | Cadenitas | Cadenitas elegantes y modernas | | 2
cat3 | Pulseras | Pulseras únicas y personalizadas | | 3
cat4 | Aretes | Aretes que realzan tu belleza | | 4
```

---

## Hoja: Products

**Nombre de la hoja:** `Products` (exacto, con mayúscula)

### Headers (Fila 1):
```
ID | Name | Description | Price | Category | Image URL | Images | Stock | Featured | Has Sizes | Available Sizes | Tags
```

### Datos de Ejemplo para Anillos (con talles):

```
prod1 | Anillo Plata 925 | Elegante anillo de plata 925 con diseño minimalista perfecto para uso diario | 2500 | cat1 | [URL_IMAGEN] | | 15 | TRUE | TRUE | 14,16,18,20,22 | plata,elegante,minimal

prod2 | Anillo Corazón | Anillo especial con forma de corazón, ideal para regalar | 4200 | cat1 | [URL_IMAGEN] | | 5 | TRUE | TRUE | S,M,L | especial,regalo,corazón

prod3 | Anillo Infinito | Anillo con símbolo de infinito que representa amor eterno | 3800 | cat1 | [URL_IMAGEN] | | 10 | FALSE | TRUE | 14,16,18,20 | infinito,amor,símbolo

prod4 | Anillo Solitario | Anillo solitario con circonia cúbica de alta calidad | 5500 | cat1 | [URL_IMAGEN] | | 8 | TRUE | TRUE | 14,15,16,17,18,19,20 | elegante,circonia,formal
```

### Datos de Ejemplo para Cadenitas (sin talles):

```
prod5 | Cadenita Dorada | Cadenita bañada en oro de 18k, 45cm de largo | 3500 | cat2 | [URL_IMAGEN] | | 12 | FALSE | FALSE | | dorado,elegante

prod6 | Cadenita Estrella | Delicada cadenita con dije de estrella brillante | 3200 | cat2 | [URL_IMAGEN] | | 8 | FALSE | FALSE | | estrella,delicado,trendy

prod7 | Cadenita Plata | Cadenita de plata 925 con cadena tipo eslabón | 2800 | cat2 | [URL_IMAGEN] | | 20 | TRUE | FALSE | | plata,clásico

prod8 | Cadenita Corazón | Cadenita con dije de corazón, perfecta para regalo | 3600 | cat2 | [URL_IMAGEN] | | 6 | TRUE | FALSE | | corazón,regalo,amor
```

### Datos de Ejemplo para Pulseras:

```
prod9 | Pulsera Cadena | Pulsera de cadena con cierre ajustable de acero inoxidable | 1800 | cat3 | [URL_IMAGEN] | | 25 | FALSE | FALSE | | casual,acero

prod10 | Pulsera Cuero | Pulsera trenzada de cuero genuino con detalles de plata | 1500 | cat3 | [URL_IMAGEN] | | 15 | FALSE | FALSE | | cuero,casual,unisex

prod11 | Pulsera Dijes | Pulsera con dijes personalizables en plata 925 | 4500 | cat3 | [URL_IMAGEN] | | 10 | TRUE | FALSE | | personalizable,plata,especial
```

### Datos de Ejemplo para Aretes:

```
prod12 | Aretes Perla | Aretes elegantes con perla cultivada y base de plata | 2800 | cat4 | [URL_IMAGEN] | | 18 | TRUE | FALSE | | elegante,perla,formal

prod13 | Aretes Argolla | Aretes tipo argolla en oro de 18k, tamaño mediano | 3200 | cat4 | [URL_IMAGEN] | | 12 | FALSE | FALSE | | dorado,clásico

prod14 | Aretes Cristal | Aretes con cristales austriacos de colores | 2200 | cat4 | [URL_IMAGEN] | | 20 | TRUE | FALSE | | cristal,colores,trendy
```

---

## 📸 Dónde Conseguir URLs de Imágenes

### Opción 1: Placeholder (Para Pruebas)

Usa estos placeholders temporales mientras consigues fotos reales:

```
https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop
https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop
https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop
https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop
```

### Opción 2: Tus Fotos en Cloudinary (Recomendado)

1. Sube tus fotos a [cloudinary.com](https://cloudinary.com)
2. Copia la URL de cada foto
3. Reemplaza `[URL_IMAGEN]` con tu URL

### Opción 3: Google Drive

1. Sube foto a Google Drive
2. Click derecho > "Get link" > "Anyone with link"
3. Copia el ID del archivo
4. Usa: `https://drive.google.com/uc?export=view&id=[FILE_ID]`

---

## 💡 Tips para Llenar el Sheet

### Precios
- Solo números, sin símbolos
- Ejemplo: `2500` (no "$2500")
- Usa decimales si necesitas: `2500.99`

### Stock
- Números enteros
- `0` = Sin stock (se mostrará como "Sin stock")
- `1-5` = Poco stock (se mostrará como "¡Últimos!")

### Featured (Destacado)
- `TRUE` o `YES` o `1` = Producto destacado
- `FALSE` o `NO` o `0` = Producto normal

### Has Sizes (Tiene Talles)
- `TRUE` = Tiene talles (como anillos)
- `FALSE` = No tiene talles (como cadenitas)

### Available Sizes (Talles Disponibles)
- Solo si Has Sizes = TRUE
- Separar con comas, sin espacios
- Ejemplos:
  - Para anillos: `14,16,18,20,22`
  - Para ropa: `XS,S,M,L,XL`
  - Letras: `S,M,L`

### Multiple Images
- Separar URLs con comas, sin espacios
- Ejemplo: `https://img1.jpg,https://img2.jpg,https://img3.jpg`

### Tags
- Separar con comas, sin espacios
- Ejemplo: `plata,elegante,minimal,trending`

---

## ✅ Checklist Final

Antes de usar tu sheet, verifica:

- [ ] Las hojas se llaman exactamente "Categories" y "Products"
- [ ] Los headers están en la fila 1
- [ ] Todos los IDs son únicos
- [ ] Los Category IDs en Products coinciden con Categories
- [ ] Los precios son números (sin $)
- [ ] Featured y Has Sizes son TRUE o FALSE
- [ ] Si Has Sizes=TRUE, hay Available Sizes
- [ ] El spreadsheet es público (Anyone with link can view)
- [ ] Las URLs de imágenes son públicas

---

## 🚀 Siguientes Pasos

1. Crea un nuevo Google Spreadsheet
2. Copia este template
3. Reemplaza las URLs de imágenes con las tuyas
4. Comparte como "Anyone with link can view"
5. Copia el Spreadsheet ID
6. Agrégalo a tu `.env`
7. ¡Listo!

---

¿Necesitas más productos de ejemplo? Simplemente copia cualquiera de las filas y cambia los valores.
