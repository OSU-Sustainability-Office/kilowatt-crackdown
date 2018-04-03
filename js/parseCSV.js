// Download & Parse CSV data files from server.
var buildingList = [
  "McNary",
  "Sackett",
  "West",
  "Wilson"
];
var CSVList = ["", "", "", ""]; // This will be populated with strings representing CSV files.
                                    // CSVs are stored in the same order as buildingList.

for (var i = 0; i < 4; i++) {
  var xmlhttp;
  if (window.XMLHttpRequest) {
      // code for modern browsers
      xmlhttp = new XMLHttpRequest();
   } else {
      // code for old IE browsers
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = this.responseText;
      var url = this.responseURL;
      if (url.indexOf("McNary") != -1) {
        CSVList[0] = Papa.parse(data);
      } else if (url.indexOf("Sackett") != -1) {
        CSVList[1] = Papa.parse(data);
      } else if (url.indexOf("West") != -1) {
        CSVList[2] = Papa.parse(data);
      } else {
        CSVList[3] = Papa.parse(data);
      }
    }
  };
  xmlhttp.open("GET", "../data/" + buildingList[i] + ".csv", true);
  xmlhttp.send();
}
