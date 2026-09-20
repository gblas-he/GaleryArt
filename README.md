# GALERYART

Web de una galería de arte con tienda incluida, hecha con React y TypeScript. No tiene servidor: el carrito, los favoritos, las cuentas y los pedidos se guardan en el navegador (localStorage).

## Qué hay

- Catálogo de obras con filtros (categoría, color, precio, formato), orden y búsqueda.
- "Descubrir": eliges qué te gusta y tu presupuesto y la página reordena las obras.
- Ficha de cada obra, con una vista a escala sobre un sofá de 2 metros.
- Carrito, favoritos, cuenta de usuario y una compra de prueba con su confirmación.
- Páginas de artistas, un formulario para vender obras y las páginas del pie (contacto, envíos, FAQ...).

## Cómo arrancarlo

Hace falta Node 18 o 20.

```bash
npm install
npm start
```

Se abre en http://localhost:3000. Otros comandos:

```bash
npm test        # tests
npm run build   # versión para producción, sale en /build
```

Si lo ejecutas en WSL, mejor tener la carpeta dentro de tu home de Linux (`~`) y no en `/mnt/c`. Con `/mnt/c` `npm install` va lento y a veces no recarga al guardar.

## Estructura

```
src/
  data/          obras, artistas y textos de las páginas de información
  context/       carrito y favoritos (TiendaContext), cuentas (AuthContext), avisos
  componentes/
    Navbar/  Footer/  CartDrawer/  ObraCard/
    Pages/       una carpeta por página
  index.css      colores y tipografías (variables CSS)
```

Para cambiar las obras hay que tocar `src/data/obras.ts`. Los artistas están en `src/data/artistas.ts`, y los colores en las variables de `src/index.css`.

## Cosas a tener en cuenta

- Las obras y los artistas son de ejemplo. De las 12 imágenes de `src/assets/obras/`, 9 son de relleno generadas por código (las otras 3 son tuyas). Los nombres de los artistas son inventados.
- El registro y el inicio de sesión son de mentira. Las cuentas se guardan en el navegador, así que no sirve para producción. Cuando haya servidor habrá que cambiar `AuthContext.tsx`.
- La compra no cobra nada ni manda correos. Solo guarda el pedido en el navegador.
- Los textos de envío, devoluciones y los legales son provisionales y hay que revisarlos antes de publicar la web.
- Las tipografías (Jost y Newsreader) se cargan desde Google Fonts, así que hace falta conexión para verlas. Sin ella se ve con las del sistema.
