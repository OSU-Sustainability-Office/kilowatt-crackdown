var lboard = [
  {
    name: "McNary",
    change: 0,
    node: {}
  },
  {
    name: "Sackett",
    change: 0,
    node: {}
  },
  {
    name: "West",
    change: 0,
    node: {}
  },
  {
    name: "Wilson",
    change: 0,
    node: {}
  },
];

var sorter = function (a,b) {
  return a.change - b.change;
}

// Calculates the percent change from baseline and updates the leaderboard
// accordingly.
function leaderboard() {
  var loc = document.getElementById("leaderboard");
  for (var i = 0; i < currentData.length; i++) {
    // Calculate the total energy used in baseline for an equivalent period.

    // First, calculate the total energy used in baseline and current periods.
    // Baseline
    var baseline = 0;
    for (var j = 0; j < currentData[i].weekly.length - 1; j++) {
      baseline += currentData[i].weekly_baseline[j % (currentData[i].weekly_baseline.length - 1)];
    }
    console.log(i + "," + baseline)
    // Current period
    var current = 0;
    for (var j = 0; j < currentData[i].weekly.length - 1; j++) {
      current += currentData[i].weekly[j];
    }

    // Calculate difference between the two totals.
    var change = current - baseline;

    // Calculate change as a percentage of total KWh consumed.
    change = change/baseline * 100;
    var node = document.createElement("div");
    node.classList.add("alert");
    if (change > 0) {
      node.classList.add("alert-danger");
    } else if (change <= 0 && change >= -2) {
      node.classList.add("alert-warning");
    } else {
      node.classList.add("alert-success");
    }
    node.innerHTML = lboard[i].name + " (" + change.toFixed(2) + "%)";
    lboard[i].change = change;
    lboard[i].node = node;
  }
  // Sort by least to greatest (most negative change to most positive change).
  lboard.sort(sorter);

  // Add nodes to dom in order.
  for (var i = 0; i < lboard.length; i++) {
    loc.appendChild(lboard[i].node);
  }
}
