const fs = require('fs');
const Papa = require('papaparse');
const Handlebars = require('handlebars');

// Datos CSV de origen
var filename = "test5.csv";
// var srcdir_mapas = "csv_src";

// Directorio destino de los archivos MarkDown
var destdir_mapas = "src/mapas";
var destdir_autores = "src/autores";

// Plantilla de salida de MarkDown
var md_template_filename = "src/.theme/map.md.hbs";
var md_template = '';
var md_template_autor_filename = "src/.theme/author.md.hbs";
var md_template_autor = '';
const autores = [];

console.log( "*** Empezando procesado de " + filename + " con destino "+ destdir_mapas + " ***" );

// Leemos las plantillas de los MarkDown
// Mapas
fs.readFile(md_template_filename, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log ( 'Plantilla de mapas:' );
  console.log ( data );
  md_template = Handlebars.compile(data);
});

// Autores
fs.readFile(md_template_autor_filename, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log ( 'Plantilla de autores:' );
  console.log ( data );
  md_template_autor = Handlebars.compile(data);
});

fs.readFile(filename, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    Papa.parse(data, {
        header: true,
        skipEmptyLines: true,
        step: function(row) {
            // console.log ( row.data ); // Mostramos los datos en bruto de la línea

            // Leemos cada línea y la convertimos de JSON a MarkDown
            let result = md_template( row.data );
            // console.log ( result ); // Mostramos la línea convertida a MarkDown

            // Nombre del autor y nombre de su archivo
            let _autor = row.data['autor_nombre'] + ' ' + row.data['autor_apellidos'];
            let _autor_filename = destdir_autores + '/' + _autor.normalize('NFD').replace(/[\u0300-\u036f]/g,"").replace(/[\/\s\:\.\,]/g,'_') + '.md';

            // Creamos un archivo en destdir_mapas por cada línea convertida a MarkDown
            console.log ( 'Nombre del mapa: ' + row.data['Nombre del mapa'] + ' / Autor/a: ' + _autor );

            // Normalizamos el nombre del mapa y quitamos los diacríticos (aunque queda la ñ)
            let _map_filename = destdir_mapas + '/' + row.data['Nombre del mapa'].normalize('NFD').replace(/[\u0300-\u036f]/g,"").replace(/[\/\s\:\.\,]/g,'_') + '.md';
            
            fs.writeFile( _map_filename, result, err => {
                if (err) {
                  console.error(err)
                  return
                }
                //file written successfully
                console.log ( '+ Creando ' + _map_filename );
                let mapa_actual = { 'name': row.data['Nombre del mapa'], 'filename': _map_filename }
                let autor_actual = autores.find( autor_actual => autor_actual.name === _autor )
                if ( autor_actual != null ) {
                  autor_actual.mapas.push ( mapa_actual )
                } else {
                  autores.push ({
                    name: _autor,
                    filename: _autor_filename,
                    mapas: [mapa_actual]
                  })
                }
              });
        },
        complete: function() {
            console.log( "*** Terminando procesado de " + filename + " con destino "+ destdir_mapas + " ***" );
        }
    });
    console.log('***************');
    console.log(autores);
});
