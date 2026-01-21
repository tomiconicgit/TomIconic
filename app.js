import { stats } from "./data/stats.js";

const pages = document.querySelectorAll(".page");
const buttons = document.querySelectorAll("nav button");

buttons.forEach(btn => {
  btn.onclick = () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    pages.forEach(p =>
      p.classList.toggle("active", p.id === btn.dataset.page)
    );
  };
});

const liveRail = document.getElementById("live-rail");
const trendingRail = document.getElementById("trending-rail");
const statsGrid = document.getElementById("stats-grid");

stats.forEach(stat => {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.innerHTML = `
    <div class="label">${stat.label}</div>
    <div class="value">${stat.value}</div>
  `;
  liveRail.appendChild(tile);

  if (stat.trending) {
    trendingRail.appendChild(tile.cloneNode(true));
  }

  const card = document.createElement("div");
  card.className = "stat-card";
  card.innerHTML = `
    <div class="label">${stat.label}</div>
    <div class="value">${stat.value} ${stat.unit}</div>
    <div class="muted">${stat.context}</div>
  `;
  statsGrid.appendChild(card);
});
