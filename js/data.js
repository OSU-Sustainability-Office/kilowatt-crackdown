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
      console.log(currentData[i].data)
      console.log(i)
    } else {
      i++;
    }
  }
}
// cauthorn, mcnary, sackett, west, wilson
var currentData = [
  {
    name: "McNary",
    id: "5acaea78fc6ce26d124e0ffa",
    data: [],
    hourly_baseline: [],
    hourly: [],
    weekly_baseline: [],
    weekly: []
  },
  {
    name: "Sackett",
    id: "5acaed4d604a776dbf05dbe9",
    data: [],
    hourly_baseline: [],
    hourly: [],
    weekly_baseline: [],
    weekly: []
  },
  {
    name: "West",
    id: "5acaed72604a776dbf05dbeb",
    data: [],
    hourly_baseline: [],
    hourly: [],
    weekly_baseline: [],
    weekly: []
  },
  {
    name: "Wilson",
    id: "5acaed63604a776dbf05dbea",
    data: [],
    hourly_baseline: [],
    hourly: [],
    weekly_baseline: [],
    weekly: []
  }
];
// Calculate this week's date range.
var d = new Date();
var day1 = new Date(); // Set beginning date here.
day1.setYear(2018);
day1.setMonth(3);
day1.setDate(8);

var startDate = day1.getFullYear() + "-" + ("0" + (day1.getMonth() + 1)).slice(-2) + "-" + ("0" + day1.getDate()).slice(-2);
var currentDate = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + (d.getDate() + 1)).slice(-2); // End date is not inclusive.

for (var i = 0; i < 4; i++) {

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
    CSVList[0] != "" &&
    CSVList[1] != "" &&
    CSVList[2] != "" &&
    CSVList[3] != ""
  ) {
    clearInterval(calcData); // Prevent the function from being called again.
    console.log(currentData)
    // Begin hourly calculations.
    for (var i = 0; i < 4; i++) {
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

      // Repeat similar calculation for current data.
      prevVal = currentData[i].data[0].point;

      // r begins at 4 because this data doesn't originate from a CSV file.
      // row 0 actually contains data, instead of column titles.
      for (var r = 4; r < currentData[i].data.length; r = r + 4) {
        // data[r].point[0].value Selects Acc. Real Engy. Net
        var val;
        if (currentData[i].data[r] != null)  val = currentData[i].data[r].point;
        // Removes large numbers and other "unfair" anomalies
        if (Math.abs(val - prevVal) < 100) {
          currentData[i].hourly.push(Math.abs(val - prevVal)); // Some meters erroneously read negative, so absolute value is necessary.
        } else {
          currentData[i].hourly.push(0);
        }
        prevVal = val;
      }

      // Begin daily totals/computations using hourly data.
      // Baseline
      var l = 0; // Location in array.
      while (l < currentData[i].hourly_baseline.length) {
        var sum = 0;
        var j;
        for (j = 0; j < 24 && j + l < currentData[i].hourly_baseline.length; j++) {
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
        for (j = 0; j < 24 && j + l < currentData[i].hourly.length; j++) {
          sum += currentData[i].hourly[l + j];
        }
        l += j;
        currentData[i].weekly.push(sum);
      }
    }
    // Draw Charts
    drawCharts();

    // Calculate Percentages
    leaderboard();

    // Create date selector dropdowns
    // createDateSelect();
  }
}, 100); // Function is called every 100 milliseconds until clearInterval is called.
