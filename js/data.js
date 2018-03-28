// Retrieve building data from server.

// cauthorn, mcnary, sackett, west, wilson
var currentData = [
  {
    name: "Cauthorn",
    id: "5aba8e95c224ce2b0eb05b1b", // Reference ObjectID
    data: {} // Empty object that will be populated with data.
  },
  {
    name: "McNary"
    id: "5aba8eb6c224ce2b0eb05b1c",
    data: {}
  },
  {
    name: "Sackett"
    id: "5aba8ec7c224ce2b0eb05b1d",
    data: {}
  },
  {
    name: "West"
    id: "5aba8ed4c224ce2b0eb05b1e",
    data: {}
  },
  {
    name: "Wilson"
    id: "5aba8ee5c224ce2b0eb05b1f",
    data: {}
  }
];
// Calculate this week's date range.
var d = new Date();
var day1 = new Date(d - 1000 * 60 * 60 * 24 * (d.getDay() - 1)); // Get date for first day of the week.
/* d.getDay() - 1 returns monday as the first day of the week.
 * The baseline data starts on a Monday, so it's necessary.
 */
var startDate = day1.getFullYear() + "-" + day1.getMonth() + "-" + day1.getDate();
var currentDate = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();

var url = "http://ec2-52-35-112-51.us-west-2.compute.amazonaws.com:3000/api/getBuildingData?";

for (var i = 0; i < 5; i++) {
  var c = currendData[i];
  // Send JSONP request to Energy Dashboard production server.
  $.ajax({
    url: url + "buildings=" + c.id + "&end=" + currentDate + "&start=" + startDate + "&variable=Accumulated+Real+Energy+Net",
    dataType: "jsonp",
    jsonpCallback: "logResults"
  });
}

// Calculate percentage increase/decrease based on baseline data.

// Display data on charts.
