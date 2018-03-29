// Retrieve building data from server.

var collectData = function collectData(obj) {
  obj = obj[0];
  // Perform linear search for building in currentData array.
  var i = 0;
  var found = false;
  while (!found) {
    if (currentData[i].id == obj.id) {
      found = true;
      currentData[i].data = obj.points;
    } else {
      i++;
    }
  }
}
// cauthorn, mcnary, sackett, west, wilson
var currentData = [
  {
    name: "Cauthorn",
    id: "5aba8e95c224ce2b0eb05b1b", // Reference ObjectID
    data: [], // Empty array that will be populated with data.
    hourly_baseline: [],
    hourly: [],
    weekly_baseline: [],
    weekly: []
  },
  {
    name: "McNary",
    id: "5aba8eb6c224ce2b0eb05b1c",
    data: [],
    hourly_baseline: [],
    hourly: [],
    weekly_baseline: [],
    weekly: []
  },
  {
    name: "Sackett",
    id: "5aba8ec7c224ce2b0eb05b1d",
    data: [],
    hourly_baseline: [],
    hourly: [],
    weekly_baseline: [],
    weekly: []
  },
  {
    name: "West",
    id: "5aba8ed4c224ce2b0eb05b1e",
    data: [],
    hourly_baseline: [],
    hourly: [],
    weekly_baseline: [],
    weekly: []
  },
  {
    name: "Wilson",
    id: "5aba8ee5c224ce2b0eb05b1f",
    data: [],
    hourly_baseline: [],
    hourly: [],
    weekly_baseline: [],
    weekly: []
  }
];
// Calculate this week's date range.
var d = new Date();
var day1 = new Date(d - 1000 * 60 * 60 * 24 * (d.getDay() - 1)); // Get date for first day of the week.
/* d.getDay() - 1 returns monday as the first day of the week.
 * The baseline data starts on a Monday, so it's necessary.
 */

var startDate = day1.getFullYear() + "-" + ("0" + (day1.getMonth() + 1)).slice(-2) + "-" + ("0" + day1.getDate()).slice(-2);
var currentDate = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + (d.getDate() + 1)).slice(-2); // End date is not inclusive.

for (var i = 0; i < 5; i++) {

  var c = currentData[i];

  var url = "http://ec2-52-35-112-51.us-west-2.compute.amazonaws.com:3000/api/getBuildingData?";
  url = url + "buildings=" + c.id + "&end=" + currentDate + "&start=" + startDate + "&variable=Accumulated+Real+Energy+Net";
  url = encodeURI(url);

  // JSONP data request
  var script = document.createElement('script');
  script.src = url + "&callback=collectData";

  document.getElementsByTagName('head')[0].appendChild(script);
}

// Calculates hourly consumption in KWh using "Accumulated Real Energy Net" meter data.
// The function is called on an interval until all asynchronous data downloads are complete.
var calcData = setInterval(function() {
  // If everything is downloaded...
  if (
    currentData[0].data.length != 0 &&
    currentData[1].data.length != 0 &&
    currentData[2].data.length != 0 &&
    currentData[3].data.length != 0 &&
    currentData[4].data.length != 0 &&
    CSVList[0] != "" &&
    CSVList[1] != "" &&
    CSVList[2] != "" &&
    CSVList[3] != "" &&
    CSVList[4] != ""
  ) {
    clearInterval(calcData); // Prevent the function from being called again.

    // Begin hourly calculations.
    for (var i = 0; i < 5; i++) {
      // Begin with baseline data.
      // Iterate over every hour (4 rows = 1 hour) in CSV baseline data.
      var prevVal = CSVList[i].data[1][4]; // This is the meter reading at the
                                           // beginning of the first hour.

      // r starts at 5 because line 0 has the titles of each column in the csv
      // file, and 5 contains the reading at the end of the first hour.
      for (var r = 5; r < CSVList[i].data.length; r = r + 4) {
        // [r][4] Selects Acc. Real Engy. Net
        var val = CSVList[i].data[r][4];
        currentData[i].hourly_baseline.push(Math.abs(val - prevVal)); // Some meters erroneously read negative, so absolute value is necessary.
        prevVal = val;
      }

      console.log(currentData[i].data[0].point[0].value)
      // Repeat similar calculation for current data.
      prevVal = currentData[i].data[0].point[0].value;

      // r begins at 4 because this data doesn't originate from a CSV file.
      // row 0 actually contains data, instead of column titles.
      for (var r = 4; r < currentData[i].data.length; r = r + 4) {
        // data[r].point[0].value Selects Acc. Real Engy. Net
        var val = currentData[i].data[r].point[0].value;
        currentData[i].hourly.push(Math.abs(val - prevVal)); // Some meters erroneously read negative, so absolute value is necessary.
        prevVal = val;
      }

      // Begin daily totals/computations using hourly data.
      // Baseline
      var l = 0; // Location in array.
      while (l < currentData[i].hourly_baseline.length) {
        var sum = 0;
        var j;
        for (j = 0; j < 24 && j < currentData[i].hourly_baseline.length; j++) {
          sum += currentData[i].hourly_baseline[l + j];
        }
        l += j;
        currentData[i].weekly_baseline.push(sum);
      }

      // Current
      var l = 0; // Location in array.
      while (l < currentData[i].hourly.length) {
        var sum = 0;
        var j;
        for (j = 0; j < 24 && j < currentData[i].hourly.length; j++) {
          sum += currentData[i].hourly[l + j];
        }
        l += j;
        currentData[i].weekly.push(sum);
      }


    }
    // Draw Charts
    drawCharts();
  }
}, 100); // Function is called every 50 milliseconds until clearInterval is called.
