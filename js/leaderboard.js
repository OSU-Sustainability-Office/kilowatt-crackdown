var lboard = [
  {
    name: "Cauthorn",
    change: 0,
    node: {}
  },
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

// Toggles .hidden on the current card's card-img-overlay element
var toggleCardHidden = function toggleCardHidden(e) {
  var element = e.currentTarget.getElementsByClassName("card-img-overlay")[0];
  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
};

// Calculates the percent change from baseline and updates the leaderboard
// accordingly.
function leaderboard() {
  var loc = document.getElementById("leaderboard");
  for (var i = 0; i < currentData.length; i++) {
    // First, calculate the total energy used in baseline and current periods.
    // Baseline
    console.log(currentData[i].weekly_baseline)
    var baseline = 0;
    for (var j = 0; j < currentData[i].weekly.length; j++) {
      baseline += currentData[i].weekly_baseline[j];
    }
    console.log(baseline)
    // Current period
    var current = 0;
    for (var j = 0; j < currentData[i].weekly.length; j++) {
      current += currentData[i].weekly[j];
    }

    // Calculate difference between the two totals.
    var change = current - baseline;

    // Calculate change as a percentage of total KWh consumed.
    change = change/current;
    var node = document.createElement("div");
    node.classList.add("alert");
    if (change > .5) {
      node.classList.add("alert-danger");
    } else if (change <= .5 && change >= -.5) {
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
