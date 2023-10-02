function radar_mapa ( r_data, id_grafico = 'radar_mapa', titulo = 'Criticidad' ) {

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: ''
      }
    },
    elements: {
        line: {
            borderWidth: 3
        }
    },
    scales: {
        r: {
            angleLines: {
                display: true
            },
            suggestedMin: 0,
            suggestedMax: 5,
            ticks: {
                stepSize: 1
            }
        }
    }
  };
/*
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];*/

  new Chart(
//    document.getElementById('radar_mapa'),
    document.getElementById(id_grafico),
    {
      type: 'radar',
      options: options,
      data: {
        labels: r_data.map(row => row.label),
        datasets: [
          {
            label: titulo,
            data: r_data.map(row => row.count)
          }
        ]
      },
    }
  );
}