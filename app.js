const eventView = document.getElementById("eventView");

function openEvent(data) {
  document.getElementById("eventTag").innerText = data.tag;
  document.getElementById("eventTitle").innerText = data.title;
  document.getElementById("eventSummary").innerText = data.summary;

  document.getElementById("statToday").innerText = data.today;
  document.getElementById("statYear").innerText = data.year;
  document.getElementById("statChange").innerText = data.change;

  eventView.classList.remove("hidden");
}

function closeEvent() {
  eventView.classList.add("hidden");
}

/* Example hook for cards */
document.querySelectorAll(".content-card").forEach(card => {
  card.addEventListener("click", () => {
    openEvent({
      tag: "IMMIGRATION",
      title: "Small Boat Crossings",
      summary: "Live tracker monitoring daily Channel crossings in 2025.",
      today: "847",
      year: "29,403",
      change: "+14%"
    });
  });
});