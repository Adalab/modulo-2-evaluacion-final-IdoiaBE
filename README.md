
# Anime series finder

Bienvenido/a a Anime Series Finder, una aplicación web para buscar y marcar tus series de anime favoritas. Este proyecto combina **JavaScript, HTML y Sass** para ofrecer una **experiencia interactiva y funcional**.

## Funcionalidades principales

1. **Búsqueda de animes**: Introduce el título de la serie en el campo de búsqueda para obtener una lista de resultados con sus carteles y nombres.
2. **Gestión de favoritos**: Añade tus series favoritas con un solo clic y consérvalas incluso tras recargar la página.
3. **Maquetación responsiva**: Diseñada con Sass, permite un diseño adaptado a diferentes dispositivos.

## Tecnologías utilizadas

- **HTML5**: Estructura del proyecto.
- **SASS**: Estilización avanzada.
- **JavaScript (ES6)**: Interactividad y lógica del proyecto.
- **Fetch API**: Consumo de datos desde [API de Jikan](https://jikan.moe/).
- **Local Storage**: Persistencia de datos del usuario.
- **Starter Kit de Adalab**: Base para el desarrollo del proyecto.

## Guía de inicio rápido

### Requisitos previos
- Node.js (versión 14 o superior): [Descargar Node.js.](https://nodejs.org/)
- Un editor de código, como [VS Code](https://code.visualstudio.com/).

### Pasos para arrancar el proyecto:

1. **Clona el repositorio.**

```bash
git clone <URL-del-repositorio>
cd <nombre-del-repositorio>
```

2. **Instala las dependencias.**

```bash
npm install
```

3. **Arranca el servidor local.**

```bash
npm run dev
```

Esto abrirá tu navegador predeterminado y cargará la aplicación.

### Publicación del proyecto:

1. Genera la versión de producción con:

```bash
npm run build
```
2. Publica la carpeta `docs/` en GitHub Pages:

- Ve a la pestaña "Settings" de tu repositorio.
- Activa **GitHub Pages** seleccionando la opción **master branch /docs folder**.

También puedes usar el atajo:

```bash
npm run deploy
```
Esto genera y sube automáticamente la carpeta `docs/` a GitHub Pages.

## Estructura del proyecto

La estructura de carpetas tiene esta pinta:

```
Anime Finder
├── src
│   ├── api
│   ├── images
│   ├── js
│   ├── scss
│   └── html
├── public
└── docs
```
- `src/`: Archivos fuente del proyecto.

- `public/`: Archivos estáticos.

- `docs/`: Generado automáticamente para despliegue.

## Notas adicionales

- La aplicación utiliza una imagen placeholder para las series sin cartel disponible.