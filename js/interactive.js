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
