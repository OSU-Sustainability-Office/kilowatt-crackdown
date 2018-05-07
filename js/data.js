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

function searchDate(d, i) {
  var closeLocs = []; // If the exact timestamp doesn't exist, the closest point will be chosen from this list.
                      // Super boring linear search.
  var j = currentData[i].data.length - 1;
  while (j >= 0) {
    if (currentData[i].data[j] != null) {
      // Get current dataPoint's date.
      var pointDate = new Date(Date.parse(currentData[i].data[j].timestamp));

      var difference = Math.round(Math.abs(pointDate.getTime() - d.getTime()) / (1000 * 60));
      if (difference < 121) { // If the times are within 2 hours
        if (difference < 16) { // If the times are within 15 minutes.
          return j;
        } else {
          closeLocs.push({
            "loc": j,
            "diff": difference
          });
        }
      }
    }
    j--;
  }

  // If this is reached, search for closest points.
  if (closeLocs.length > 0) {
    var j = 0;
    var diff = closeLocs[0].diff;
    var loc = 0;
    while (j < closeLocs.length) {
      if (closeLocs[j].diff < diff) {
        loc = j;
        diff = closeLocs[j].diff;
      }
      j++;
    }
    return closeLocs[loc].loc;
  }

  return -1; // Nothing was found.

}
// cauthorn, mcnary, sackett, west, wilson
var currentData = [{
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
    id: "5ad8cc87055feb1076e6bd7c",
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
day1.setDate(9);

var sDate = Math.round((d.getTime() - day1.getTime()) / 1000 /*Seconds*/ / 60 /*Minutes*/ / 15 /*15 minute intervals*/ );

var startDate = day1.getFullYear() + "-" + ("0" + (day1.getMonth() + 1)).slice(-2) + "-" + ("0" + day1.getDate()).slice(-2);
var currentDate = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + (d.getDate() + 1)).slice(-2); // End date is not inclusive.

// Set current date to the competition's end date if the competition has ended.
if (d.getYear() > 2018 || d.getMonth() > 4 && d.getDate() > 6) { // May 5th 2018 is the last day of the competition.
  d.setYear(2018);
  d.setMonth(4);
  d.setDate(6);
}


for (var i = 0; i < 4; i++) {

  var c = currentData[i];

  var url = "http://ec2-52-35-112-51.us-west-2.compute.amazonaws.com:3000/api/getBuildingData?";
  url = url + "building=" + c.id + "&variable=Accumulated+Real+Energy+Net";
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
      // First, we need to calculate the beginning position in the data array.
      var startPos = currentData[i].data.length - sDate; // Total number of 15 minute intervals - the required number of 15 minute intervals.

      if (startPos < 0) startPos = 0;

      prevVal = currentData[i].data[startPos].point;

      // r begins at 4 because this data doesn't originate from a CSV file.
      // row 0 actually contains data, instead of column titles.
      for (var r = startPos; r < currentData[i].data.length; r = r + 4) {
        // data[r].point[0].value Selects Acc. Real Engy. Net
        var val = 0;
        if (currentData[i].data[r] != null) val = currentData[i].data[r].point;

        // Removes large numbers and other "unfair" anomalies
        if (Math.abs(val - prevVal) < 1000) {
          currentData[i].hourly.push(Math.abs(val - prevVal)); // Some meters erroneously read negative, so absolute value is necessary.
        } else {
          currentData[i].hourly.push(0);
        }
        prevVal = val;
      }

      // Begin daily totals/computations.
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

      // Current Period
      var currentDate = new Date(); // The date starts at the beginning of the competition.
      currentDate.setMonth(day1.getMonth());
      currentDate.setDate(day1.getDate());

      // Initialize loc1 with the first day.
      var loc1 = searchDate(currentDate, i);
      // Iterate over every day elapsed during the competition & add up the totals
      // for each day. d is today's date, and currentDate is the date currently selected for
      // calculation.
      while (currentDate.getTime() < d.getTime()) {
        // Search for first/last entry for a given day, and choose closest entry.
        currentDate.setDate(currentDate.getDate() + 1); // This is also the iterator for the loop.
        var loc2 = searchDate(currentDate, i);

        var cons = 0;
        // Subtract (end of day) - (beginning of day) entries to get the total consumption for a given day.
        if (loc1 != -1 && loc2 != -1) cons = currentData[i].data[loc1].point - currentData[i].data[loc2].point;

        // Check for inaccurate data.
        while (Math.abs(cons) > 5000) {
          currentDate.setHours(currentDate.getHours() + 1);
          var loc2 = searchDate(currentDate, i);
          cons = currentData[i].data[loc1].point - currentData[i].data[loc2].point
        }


        // Push consumption to weekly_baseline.
        currentData[i].weekly.push(Math.abs(cons));

        loc1 = loc2;
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
