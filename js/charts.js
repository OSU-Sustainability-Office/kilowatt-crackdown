function drawCharts() {

  // Daily Charts
  var cdaily = c3.generate({
      bindto: '#cdaily',
      data: {
        columns: [
          ["Baseline"].concat(currentData[0].hourly_baseline.slice(currentData[0].hourly_baseline.length - 25, currentData[0].hourly_baseline.length)),
          ["Current Period"].concat(currentData[0].hourly.slice(currentData[0].hourly.length - 25, currentData[0].hourly.length))
        ],
        axes: {
          data2: 'y2'
        }
      },
      axis: {
        y: {
          label: { // ADD
            text: 'Kilowatt Hours',
            position: 'outer-middle'
          }
        }
      }
  });
  var mdaily = c3.generate({
      bindto: '#mdaily',
      data: {
        columns: [
          ["Baseline"].concat(currentData[1].hourly_baseline.slice(currentData[1].hourly_baseline.length - 25, currentData[1].hourly_baseline.length)),
          ["Current Period"].concat(currentData[1].hourly.slice(currentData[1].hourly.length - 25, currentData[1].hourly.length))
        ],
        axes: {
          data2: 'y2'
        }
      },
      axis: {
        y: {
          label: { // ADD
            text: 'Kilowatt Hours',
            position: 'outer-middle'
          }
        }
      }
  });
  var sdaily = c3.generate({
      bindto: '#sdaily',
      data: {
        columns: [
          ["Baseline"].concat(currentData[2].hourly_baseline.slice(currentData[2].hourly_baseline.length - 25, currentData[2].hourly_baseline.length)),
          ["Current Period"].concat(currentData[2].hourly.slice(currentData[2].hourly.length - 25, currentData[2].hourly.length))
        ],
        axes: {
          data2: 'y2'
        }
      },
      axis: {
        y: {
          label: { // ADD
            text: 'Kilowatt Hours',
            position: 'outer-middle'
          }
        }
      }
  });
  var wdaily = c3.generate({
      bindto: '#wdaily',
      data: {
        columns: [
          ["Baseline"].concat(currentData[3].hourly_baseline.slice(currentData[3].hourly_baseline.length - 25, currentData[3].hourly_baseline.length)),
          ["Current Period"].concat(currentData[3].hourly.slice(currentData[3].hourly.length - 25, currentData[3].hourly.length))
        ],
        axes: {
          data2: 'y2'
        }
      },
      axis: {
        y: {
          label: { // ADD
            text: 'Kilowatt Hours',
            position: 'outer-middle'
          }
        }
      }
  });
  var widaily = c3.generate({
      bindto: '#widaily',
      data: {
        columns: [
          ["Baseline"].concat(currentData[4].hourly_baseline.slice(currentData[4].hourly_baseline.length - 25, currentData[4].hourly_baseline.length)),
          ["Current Period"].concat(currentData[4].hourly.slice(currentData[4].hourly.length - 25, currentData[4].hourly.length))
        ],
        axes: {
          data2: 'y2'
        }
      },
      axis: {
        y: {
          label: { // ADD
            text: 'Kilowatt Hours',
            position: 'outer-middle'
          }
        }
      }
  });
}
