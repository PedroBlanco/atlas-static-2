const fs = require('fs');
const Papa = require('papaparse');
var filename = "test1.csv";

console.log( "*** Empezando procesado de " + filename + " ***" );

fs.readFile(filename, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    Papa.parse(data, {
        step: function(row) {
            console.log ( row.data );
        },
        complete: function() {
            console.log( "*** Terminando procesado de " + filename + " ***" );
        }
    });
  });


