import { stats } from "./data/stats.js";

/* NAVIGATION */
const navButtons = document.querySelectorAll(".nav-links button");
const pages = document.querySelectorAll(".page");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    pages.forEach(page => {
      page.classList.toggle(
        "active",
        page.id === btn.dataset.page
      );
    });
  });
});

/* RENDER DASHBOARD */
const liveCards = document.getElementById("live-cards");
const trendingCards = document.getElementById("trending-cards");
const statsGrid = document.getElementById("stats-grid");

stats.forEach(stat => {
  // Live cards
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h3>${stat.label}</h3>
    <div class="value">${stat.value}</div>
  `;
  liveCards.appendChild(card);

  // Trending
  if (stat.trending) {
    const trend = document.createElement("div");
    trend.className = "card";
    trend.innerHTML = `
      <h3>${stat.label}</h3>
      <div class="value">${stat.value}</div>
    `;
    trendingCards.appendChild(trend);
  }

  // Stats page
  const statCard = document.createElement("div");
  statCard.className = "stat-card";
  statCard.innerHTML = `
    <div class="label">${stat.label}</div>
    <div class="stat-value">${stat.value} ${stat.unit}</div>
    <div class="context">${stat.context}</div>
    <div class="timestamp">Updated: ${stat.updated}</div>
  `;
  statsGrid.appendChild(statCard);
});
