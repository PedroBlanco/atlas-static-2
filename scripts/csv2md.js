const fs = require('fs');
const Papa = require('papaparse');
const Handlebars = require('handlebars');

// Datos CSV de origen
var filename = "test5.csv";
// var srcdir_mapas = "csv_src";

// Directorio destino de los archivos MarkDown
var destdir_mapas = "src/mapas";

// Plantilla de salida de MarkDown
var md_template_filename = "src/.theme/map.md.hbs";
var md_template = '';

console.log( "*** Empezando procesado de " + filename + " con destino "+ destdir_mapas + " ***" );

// Leemos la plantilla de los MarkDown
fs.readFile(md_template_filename, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log ( data );
    md_template = Handlebars.compile(data);
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
            var result = md_template( row.data );
            // console.log ( result ); // Mostramos la línea convertida a MarkDown

            // Creamos un archivo en destdir_mapas por cada línea convertida a MarkDown
            console.log ( 'Nombre del mapa: ' + row.data['Nombre del mapa'] );

            // Normalizamos el nombre del mapa y quitamos los diacríticos (aunque queda la ñ)
            var _map_filename = destdir_mapas + '/' + row.data['Nombre del mapa'].normalize('NFD').replace(/[\u0300-\u036f]/g,"").replace(/[\/\s\:\.]/g,'_') + '.md'
            
            fs.writeFile( _map_filename, result, err => {
                if (err) {
                  console.error(err)
                  return
                }
                //file written successfully
                console.log ( '+ Creando ' + _map_filename );
              });
        },
        complete: function() {
            console.log( "*** Terminando procesado de " + filename + " con destino "+ destdir_mapas + " ***" );
        }
    });
});
