const fs = require('fs');
const Papa = require('papaparse');
const Handlebars = require('handlebars');

// Datos CSV de origen
var filename = "test5.csv";
// var srcdir_mapas = "csv_src";

// Directorio destino de los archivos MarkDown
var destdir_mapas = "src/mapas";
var destdir_autores = "src/autores";

// Directorio destino de los archivos MarkDown
var destlink_mapas = "mapas";
var destlink_autores = "autores";

// Plantilla de salida de MarkDown
var md_template_filename = "src/.theme/map.md.hbs";
var md_template = '';
var md_template_autor_filename = "src/.theme/autor.md.hbs";
var md_template_autor = '';
const autores = [];

console.log( "*** Empezando procesado de " + filename + " con destino "+ destdir_mapas + " ***" );

// Leemos las plantillas de los MarkDown
// Mapas
/*
fs.readFile(md_template_filename, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log ( 'Plantilla de mapas:' );
  console.log ( data );
  md_template = Handlebars.compile(data);
});
*/
try {
  var data = fs.readFileSync(md_template_filename, 'utf8');
  console.log ( 'Plantilla de mapas:' );
  console.log ( data );
  md_template = Handlebars.compile(data);
} catch (err) {
  if (err) {
    console.error(err)
    return
  }
}


// Autores
/*
fs.readFile(md_template_autor_filename, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log ( 'Plantilla de autores:' );
  console.log ( data );
  md_template_autor = Handlebars.compile(data);
});
*/
try {
  var data = fs.readFileSync(md_template_autor_filename, 'utf8');
  console.log ( 'Plantilla de autores:' );
  console.log ( data );
  md_template_autor = Handlebars.compile(data);
} catch (err) {
  if (err) {
    console.error(err)
    return
  }
}

/*
fs.readFile(filename, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  Papa.parse(data, {
      header: true,
      skipEmptyLines: true,
      step: function(row) {
        console.group ();
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
         
        // fs.writeFile( _map_filename, result, err => {
        //     if (err) {
        //       console.error(err)
        //       return
        //     }
        //     //file written successfully
        //     // console.log ( '+ Creando ' + _map_filename + ' de ' + _autor );
        //     let mapa_actual = { 'name': row.data['Nombre del mapa'], 'filename': _map_filename }
        //     console.log ( '+ Creando ' + _map_filename + '->' + JSON.stringify(mapa_actual) );
        //     // FIXME: fallo aquí
        //     let autor_actual = autores.find( autor_actual => autor_actual.name === _autor )
        //     if ( autor_actual != null ) {
        //       autor_actual.mapas.push ( mapa_actual )
        //       console.log ( '\x1b[36m%s\x1b[0m', '+ Autor existente: ' + autor_actual.name )
        //     } else {
        //       let _autor_nuevo = {
        //         name: _autor,
        //         filename: _autor_filename,
        //         mapas: [mapa_actual]
        //       }
        //       autores.push ( _autor_nuevo );
        //       console.log ( '\x1b[36m%s\x1b[0m', '+ Autor nuevo: ' + JSON.stringify(_autor_nuevo ) );
        //     }
        //   });

          fs.writeFileSync( _map_filename, result );

          // console.log ( '+ Creando ' + _map_filename + ' de ' + _autor );
          let mapa_actual = { 'name': row.data['Nombre del mapa'], 'filename': _map_filename }
          console.log ( '+ Creando ' + _map_filename + '->' + JSON.stringify(mapa_actual) );
          // FIXME: fallo aquí
          let autor_actual = autores.find( autor_actual => autor_actual.name === _autor )
          if ( autor_actual != null ) {
            autor_actual.mapas.push ( mapa_actual )
            console.log ( '\x1b[36m%s\x1b[0m', '+ Autor existente: ' + autor_actual.name )
          } else {
            let _autor_nuevo = {
              name: _autor,
              filename: _autor_filename,
              mapas: [mapa_actual]
            }
            autores.push ( _autor_nuevo );
            console.log ( '\x1b[36m%s\x1b[0m', '+ Autor nuevo: ' + JSON.stringify(_autor_nuevo ) );
          }

        console.groupEnd ();
      },
      complete: function() {
          console.log( "*** Terminando procesado de " + filename + " con destino "+ destdir_mapas + " ***" );
          autores.forEach ( autor => {
                          
          });
          console.log ( "Autores: " + JSON.stringify ( autores ) );
        }
  });
});
*/

try {
  var data = fs.readFileSync(filename, 'utf8');
  Papa.parse(data, {
    header: true,
    skipEmptyLines: true,
    step: function(row) {
      console.group ();
      // console.log ( row.data ); // Mostramos los datos en bruto de la línea

      // Nombre del autor y nombre de su archivo
      let _autor = row.data['autor_nombre'] + ' ' + row.data['autor_apellidos'];
      let _autor_name = _autor.normalize('NFD').replace(/[\u0300-\u036f]/g,"").replace(/[\/\s\:\.\,]/g,'_');

      // Creamos un archivo en destdir_mapas por cada línea convertida a MarkDown
      console.log ( 'Nombre del mapa: ' + row.data['Nombre del mapa'] + ' / Autor/a: ' + _autor );

      // Normalizamos el nombre del mapa y quitamos los diacríticos (aunque queda la ñ)
      let _map_filename = row.data['Nombre del mapa'].normalize('NFD').replace(/[\u0300-\u036f]/g,"").replace(/[\/\s\:\.\,]/g,'_');

      // TODO: Añadir nuevo campo a la fila
      row.data['autor_enlace'] = 'autores/' + _autor_name + '/';
       
      // Leemos cada línea y la convertimos de JSON a MarkDown
      let result = md_template( row.data );
      // console.log ( result ); // Mostramos la línea convertida a MarkDown

      fs.writeFileSync( destdir_mapas + '/' + _map_filename + '.md' , result );

      // console.log ( '+ Creando ' + _map_filename + ' de ' + _autor );
      let mapa_actual = { 'name': row.data['Nombre del mapa'], 'filename': 'mapas/' + _map_filename +'/' }
      console.log ( '+ Creando ' + _map_filename + '->' + JSON.stringify(mapa_actual) );
      // FIXME: fallo aquí
      let autor_actual = autores.find( autor_actual => autor_actual.name === _autor )
      if ( autor_actual != null ) {
        autor_actual.mapas.push ( mapa_actual )
        console.log ( '\x1b[36m%s\x1b[0m', '+ Autor existente: ' + autor_actual.name )
      } else {
        let _autor_nuevo = {
          name: _autor,
          filename: _autor_name,
          mapas: [mapa_actual]
        }
        autores.push ( _autor_nuevo );
        console.log ( '\x1b[36m%s\x1b[0m', '+ Autor nuevo: ' + JSON.stringify ( _autor_nuevo ) );
      }

      console.groupEnd ();
    },
    complete: function() {
        console.log( "*** Terminando procesado de " + filename + " con destino "+ destdir_mapas + " ***" );
        console.log ( "Autores: " + JSON.stringify ( autores ) );
        autores.forEach ( autor => {
          console.log ( '\x1b[36m%s\x1b[0m', "+ Autor: " + 'autores/' + autor.filename );
          console.log ( '\x1b[36m%s\x1b[0m', "+ Mapas: " + JSON.stringify ( autor.mapas ) );
          let result = md_template_autor ( {name: autor.name, filename: 'autores/' + autor.name + '/', mapas: autor.mapas, mapas_JSON: JSON.stringify(autor.mapas) } );
          fs.writeFileSync( destdir_autores + '/' + autor.filename + '.md', result );
        });
    }
  });
} catch (err) {
  if (err) {
    console.error(err)
    return
  }
}

