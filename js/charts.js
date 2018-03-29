function drawCharts() {

  // Daily Charts
  var cdaily = c3.generate({
      bindto: '#cdaily',
      data: {
        columns: [
          ["Baseline"].concat(currentData[0].hourly_baseline.slice(currentData[0].hourly_baseline.length - 25, currentData[0].hourly_baseline.length)),
          ["Current Period"].concat(currentData[0].hourly.slice(currentData[0].hourly.length - currentData[0].hourly.length % 24, currentData[0].hourly.length))
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
          ["Current Period"].concat(currentData[1].hourly.slice(currentData[1].hourly.length - currentData[1].hourly.length % 24, currentData[1].hourly.length))
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
          ["Current Period"].concat(currentData[2].hourly.slice(currentData[2].hourly.length - currentData[2].hourly.length % 24, currentData[2].hourly.length))
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
          ["Current Period"].concat(currentData[3].hourly.slice(currentData[3].hourly.length - currentData[3].hourly.length % 24, currentData[3].hourly.length))
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
          ["Current Period"].concat(currentData[4].hourly.slice(currentData[4].hourly.length - currentData[4].hourly.length % 24, currentData[4].hourly.length))
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

  // Weekly Charts
  var cweekly = c3.generate({
      bindto: '#cweekly',
      data: {
        columns: [
          ["Baseline"].concat(currentData[0].weekly_baseline.slice(currentData[0].weekly_baseline.length - 8, currentData[0].weekly_baseline.length)),
          ["Current Period"].concat(currentData[0].weekly.slice(0, currentData[0].weekly.length))
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
  var mweekly = c3.generate({
      bindto: '#mweekly',
      data: {
        columns: [
          ["Baseline"].concat(currentData[1].weekly_baseline.slice(currentData[1].weekly_baseline.length - 8, currentData[1].weekly_baseline.length)),
          ["Current Period"].concat(currentData[1].weekly.slice(0, currentData[1].weekly.length))
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
  var sweekly = c3.generate({
      bindto: '#sweekly',
      data: {
        columns: [
          ["Baseline"].concat(currentData[2].weekly_baseline.slice(currentData[2].weekly_baseline.length - 8, currentData[2].weekly_baseline.length)),
          ["Current Period"].concat(currentData[2].weekly.slice(0, currentData[2].weekly.length))
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
  var wweekly = c3.generate({
      bindto: '#wweekly',
      data: {
        columns: [
          ["Baseline"].concat(currentData[3].weekly_baseline.slice(currentData[3].weekly_baseline.length - 8, currentData[3].weekly_baseline.length)),
          ["Current Period"].concat(currentData[3].weekly.slice(0, currentData[3].weekly.length))
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
  var wiweekly = c3.generate({
      bindto: '#wiweekly',
      data: {
        columns: [
          ["Baseline"].concat(currentData[4].weekly_baseline.slice(currentData[4].weekly_baseline.length - 8, currentData[4].weekly_baseline.length)),
          ["Current Period"].concat(currentData[4].weekly.slice(0, currentData[4].weekly.length))
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
