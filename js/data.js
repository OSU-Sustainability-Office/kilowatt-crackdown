// Retrieve building data from server.

var collectData = function collectData(obj) {
  console.log(obj);
  obj = obj[0];

  // Perform linear search for building in currentData array.
  var i = 0;
  var found = false;
  while (!found) {
    if (currentData[i].id == obj.id) {
      found = true;
      currentData[i].data.concat(obj.points);
    } else {
      i++;
    }
  }
  console.log(currentData[i]);
}
// cauthorn, mcnary, sackett, west, wilson
var currentData = [
  {
    name: "Cauthorn",
    id: "5aba8e95c224ce2b0eb05b1b", // Reference ObjectID
    data: [] // Empty array that will be populated with data.
  },
  {
    name: "McNary",
    id: "5aba8eb6c224ce2b0eb05b1c",
    data: []
  },
  {
    name: "Sackett",
    id: "5aba8ec7c224ce2b0eb05b1d",
    data: []
  },
  {
    name: "West",
    id: "5aba8ed4c224ce2b0eb05b1e",
    data: []
  },
  {
    name: "Wilson",
    id: "5aba8ee5c224ce2b0eb05b1f",
    data: []
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

// Calculate percentage increase/decrease based on baseline data.

// Display data on charts.
