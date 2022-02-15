# ¿Pero esto qué es lo que es?

Tienes ante ti el generador del Atlas de Conocimiento Crítico, un directorio geolocalizado de mapas de conocimiento crítico, parte de una metodología enmarcada en la disciplina de Gestión del Conocimiento. Entra, mira nuestro trabajo y si tienes cualquier duda, entra en nuestra página del [Wiki de Gestión del Conocimiento].

El producto de este generador, el **Atlas de Conocimiento Crítico**, está alojado (de forma temporal) en [https://conocimientocritico.github.io/] y su código fuente está en [este repositorio].

# Generador del Atlas

Este generador es [bakeit] y usa plantillas Markdown (.md) para generar las páginas a partir de un archivo CSV (.csv) desde el que se generan otras páginas intermedias. Usa [{{ handlebars }}] / [{{ mustache }}] como lenguajes de plantilla.

# Librerías y componentes

Este generador y el Atlas generado usan las siguientes librerías y componentes:
- Framework de JavaScript Bootstrap
- Librería [Papaparse] para procesar archivos CSV.
- [Leaflet] con varios plugins:
  - [MarkerCluster]
  - Leaflet-search
  - Leaflet-easybutton
  - Nomenclator
  - [Leaflet-WFST]
  - leaflet.ContinuousZoom
  - leaflet.LimitZoom
- Framework Vue.js


# Configuración del Atlas generado

## URL de base

Para configurar la URL de base hay que cambiar en ```bakeit-config.json``` el valor de ```baseURL``` a un valor válido, p.e.:

- Desarrollo: http://localhost:8080/
- Github: https://conocimientocritico.github.io/

## Página de índice

En aquellos casos donde no queremos que el índice de los mapas sea el índice del directorio desde donde cuelgan (p.e. en una página personal), para no tener que añadir carpetas innecesarias (p.e. /atlas/mapas -> /mapas ), podemos cambiar en ```bakeit-config.json``` el valor de ```indexPage``` de ```index.html``` a otros valores, p.e. ```mapas.html```. Este cambio se reflejará en los enlaces de la barra de navegación y en las referencias a la raiz de la aplicación.

En caso de cambiar el nombre del índice en ```bakeit-config.json```, debemos cambiar también el nombre de ```\index.html``` al nombre de archivo que hemos configurado una vez que se genere.

[Wiki de Gestión del Conocimiento]: https://ws168.juntadeandalucia.es/wikigestionC/index.php?title=Mapa_de_Conocimiento_Cr%C3%ADtico
[https://conocimientocritico.github.io/]: https://conocimientocritico.github.io/
[este repositorio]: https://github.com/conocimientocritico/conocimientocritico.github.io
[bakeit]: https://github.com/lumarama/bakeit
[{{ handlebars }}]: https://handlebarsjs.com/
[{{ mustache }}]: http://mustache.github.io/
[Papaparse]: https://www.papaparse.com/
[Leaflet]: https://leafletjs.com/
[MarkerCluster]: https://github.com/Leaflet/Leaflet.markercluster
[Leaflet-search]: https://github.com/sjaakp/leaflet-search
[Leaflet-WFST]: https://github.com/Flexberry/Leaflet-WFST
