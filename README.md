# GALERYART

Una galería de arte online con su tienda, hecha con React y TypeScript. No tiene backend: el carrito, los favoritos, las cuentas y los pedidos se guardan en el localStorage del navegador.

## Qué puedes hacer en la web

Hay un catálogo de obras que se puede filtrar por categoría, color, precio y formato, ordenar y buscar. También tiene una sección "Descubrir" donde marcas lo que te gusta, pones tu presupuesto y las obras se reordenan según eso.

Cada obra tiene su ficha, con una vista a escala para ver cómo quedaría sobre un sofá de 2 metros. Además hay carrito, favoritos, cuenta de usuario y una compra de prueba que termina en una página de confirmación.

Por último, están las páginas de cada artista, un formulario para quien quiera vender obras y las páginas del pie (contacto, envíos, FAQ y demás).

## Para arrancarlo

Necesitas Node 18 o 20.

```bash
npm install
npm start
```

Se abre solo en http://localhost:3000. Si quieres otras cosas:

```bash
npm test        # lanza los tests
npm run build   # genera la versión de producción en /build
```

Si lo usas en WSL, deja la carpeta del proyecto en tu home de Linux (`~`) y no en `/mnt/c`. Desde `/mnt/c` el `npm install` tarda una eternidad y a veces no recarga al guardar.

## Cómo está organizado

```
src/
  data/          obras, artistas y textos de las páginas de información
  context/       carrito y favoritos (TiendaContext), cuentas (AuthContext), avisos
  componentes/
    Navbar/  Footer/  CartDrawer/  ObraCard/
    Pages/       una carpeta por cada página
  index.css      colores y tipografías (variables CSS)
```

Si quieres cambiar las obras, edita `src/data/obras.ts`. Los artistas están en `src/data/artistas.ts` y los colores en las variables de `src/index.css`.

## Ojo con esto

- Las obras y los artistas son de ejemplo. Los nombres de los artistas me los inventé.
- El registro y el login son de mentira. Las cuentas se guardan en el navegador, así que esto no vale para producción. Cuando haya servidor, habrá que reescribir `AuthContext.tsx`.
- La compra no cobra nada ni envía correos, solo guarda el pedido en el navegador.
- Los textos de envíos, devoluciones y los legales son provisionales.
- Las tipografías (Jost y Newsreader) vienen de Google Fonts, así que sin conexión se ven con las del sistema.
