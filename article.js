async function loadArticle() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  const res = await fetch("/data/articles.json");
  const articles = await res.json();

  const article = articles.find(a => a.id === id);
  if (!article) return;

  // HERO
  const hero = document.getElementById("articleHero");
  hero.style.backgroundImage = `url(${article.heroImage})`;

  document.getElementById("articleTitle").innerText = article.headline;
  document.getElementById("articleSub").innerText = article.subheadline;

  const label = document.getElementById("articleLabel");
  if (article.heroLabel) {
    label.innerText = article.heroLabel.toUpperCase();
  } else {
    label.style.display = "none";
  }

  // BLOCKS
  const body = document.getElementById("articleBody");

  article.blocks.forEach(block => {
    if (block.type === "paragraph") {
      const p = document.createElement("p");
      p.innerText = block.content;
      body.appendChild(p);
    }

    if (block.type === "highlight") {
      const h = document.createElement("div");
      h.className = "article-highlight";
      h.innerText = block.content;
      body.appendChild(h);
    }

    if (block.type === "image") {
      const img = document.createElement("img");
      img.src = block.src;
      img.alt = block.caption || "";
      body.appendChild(img);

      if (block.caption) {
        const cap = document.createElement("span");
        cap.className = "image-caption";
        cap.innerText = block.caption;
        body.appendChild(cap);
      }
    }
  });
}

loadArticle();