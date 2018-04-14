// Toggles .hidden on the current card's card-img-overlay element
var toggleCardHidden = function toggleCardHidden(e) {
  var element = e.currentTarget.getElementsByClassName("card-img-overlay")[0];
  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
};

// Add hover to every card with .card-img-overlay
var cards = document.getElementsByClassName("card text-white");
for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener("mouseover", toggleCardHidden);
  cards[i].addEventListener("mouseout", toggleCardHidden);
}

// Add date selection to graphs.
function createDateSelect() {
  var weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  // Get current date.
  var date = new Date();
  var dayOfWeek = date.getDay() + 1;
  var hour = date.getHours();

  // Iterate over every building, and add an entry in the dropdown for each day.
  var elements = document.getElementsByClassName("dropdown-menu")
  console.log(elements)
  for (var i = 0; i < 4; i ++) {
    var week = 1;
    // Add an entry into the daily dropdown menu for each day in the array.
    console.log(currentData[i].weekly.length);
    for (var j = 0; j < currentData[i].weekly.length; j++) {
      // Add header for the beginning of each week.
      if (j % 7 == 0) {
        var h = document.createElement("h6");
        h.classList.add("dropdown-header");
        h.innerHTML = "Week " + (week);
        elements[i].appendChild(h);
        week++;
      }
      // Append a day to each dropdown.
      var e = document.createElement("span");
      e.classList.add("dropdown-item");
      e.setAttribute("building", i);
      e.innerHTML = weekDays[j % weekDays.length];
      elements[i].appendChild(e);
    }
  }
}
/*          <div class="btn-group dropup">
            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropup</button>
            <div class="dropdown-menu">
              <h6 class="dropdown-header">Week 1</h6>
              <a class="dropdown-item" href="#">Action</a>
              <h6 class="dropdown-header">Week 2</h6>
              <a class="dropdown-item" href="#">Action</a>
            </div>
          </div>
 */
