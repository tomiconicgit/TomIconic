/* =========================
   EVENT VIEW
========================= */

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

/* =========================
   LOAD ARTICLES
========================= */

async function loadArticles() {
  const res = await fetch("/data/articles.json");
  const articles = await res.json();

  renderHero(articles);
  renderRail(articles);
}

/* =========================
   HERO RENDER
========================= */

function renderHero(articles) {
  const heroArticle = articles.find(a => a.showOnHero) || articles[0];
  if (!heroArticle) return;

  const hero = document.querySelector(".hero");
  hero.style.backgroundImage = `url(${heroArticle.heroImage})`;

  hero.querySelector(".hero-tag").innerText =
    heroArticle.heroLabel?.toUpperCase() || heroArticle.category.toUpperCase();

  hero.querySelector(".hero-title").innerText = heroArticle.headline;
  hero.querySelector(".hero-subtitle").innerText = heroArticle.subheadline;

  hero.onclick = () => {
    window.location.href = `/article.html?id=${heroArticle.id}`;
  };
}

/* =========================
   RAIL RENDER
========================= */

function renderRail(articles) {
  const rail = document.getElementById("current-state-rail");
  if (!rail) return;

  rail.innerHTML = "";

  articles.forEach(article => {
    const card = document.createElement("article");
    card.className = "content-card image-card";

    card.innerHTML = `
      <img src="${article.cardImage}" alt="">
      <div class="card-overlay">
        <span class="card-tag">${article.category.toUpperCase()}</span>
        <h3>${article.headline}</h3>
      </div>
    `;

    card.onclick = () => {
      window.location.href = `/article.html?id=${article.id}`;
    };

    rail.appendChild(card);
  });
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  loadArticles();
});