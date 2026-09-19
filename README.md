# GALERYART

Galería de arte online hecha con React, TypeScript, styled-components y react-router.

## Arrancar

```bash
npm install
npm start        # http://localhost:3000
npm test         # tests
npm run build    # versión de producción
```

## Dónde cambiar cosas

| Qué | Dónde |
| --- | --- |
| Obras (título, precio, medidas, imagen) | `src/data/obras.ts` |
| Artistas | `src/data/artistas.ts` |
| Textos de las páginas del pie (envío, devoluciones, FAQ...) | `src/data/info.ts` |
| Colores y tipografías | `src/index.css` (variables `--tinta`, `--oro`...) |
| Carrito, favoritos y pedidos | `src/context/TiendaContext.tsx` |
| Cuentas de usuario | `src/context/AuthContext.tsx` |

## Importante

- Los datos de obras y artistas son **de ejemplo**. Las imágenes `campo-de-umbral-*`, `horizonte-de-agosto`,
  `marea-baja`, `curvas-de-nivel`, `sierra-en-tres-capas`, `circulos-y-arcos` y `ondas-de-tinta` son piezas
  generadas por código para rellenar el catálogo.
- No hay back-end: carrito, favoritos, cuentas y pedidos se guardan en el `localStorage` del navegador.
  El registro/inicio de sesión es una simulación y **no es seguro para producción**.
- Los textos de envío, devoluciones y legales son provisionales y hay que revisarlos.
