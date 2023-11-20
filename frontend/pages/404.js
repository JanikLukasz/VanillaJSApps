// home.js
function renderPage() {
  const pageContainer = document.createElement("div");
  pageContainer.className = "page-container";

  const h1 = document.createElement("h1");
  h1.style.alignSelf = "center";
  h1.textContent = "Page not found";

  pageContainer.appendChild(h1);

  return pageContainer;
}
