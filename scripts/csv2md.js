const fs = require('fs');
const Papa = require('papaparse');
const Handlebars = require('handlebars');

// Datos CSV de origen
var filename = "test1.csv";
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
        step: function(row) {
            // console.log ( row.data ); // Mostramos los datos en bruto de la línea

            // Leemos cada línea y la convertimos de JSON a MarkDown
            var result = md_template( row.data );
            // console.log ( result ); // Mostramos la línea convertida a MarkDown

            // Creamos un archivo en destdir_mapas por cada línea convertida a MarkDown
            fs.writeFile( destdir_mapas + '/' + row.data['Nombre del mapa'] + '.md', result, err => {
                if (err) {
                  console.error(err)
                  return
                }
                //file written successfully
                console.log ( '+ Creando ' + destdir_mapas + '/' + row.data['Nombre del mapa'] + '.md' );
              });
        },
        complete: function() {
            console.log( "*** Terminando procesado de " + filename + " con destino "+ destdir_mapas + " ***" );
        }
    });
});
