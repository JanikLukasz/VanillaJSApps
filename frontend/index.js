// handle routes
if (
  window.location.href.endsWith("/index.html") ||
  window.location.href.endsWith("/")
) {
  window.location.href = "/VanillaJSApps/calculator";
}

const link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";

const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

const links = ["todo", "calculator", "weather-app", "in-progress"];

const linkContainer = document.getElementById("nav-links");

links.forEach((li) => {
  const link = document.createElement("a");
  link.href = `/VanillaJSApps/${li}`;
  link.textContent = li;
  link.onclick = (event) => route(event);
  linkContainer.appendChild(link);
  window.location.href.endsWith(li) ? link.classList.add("active") : "";

  link.addEventListener("click", () => {
    const allLinks = document.querySelectorAll("a");
    allLinks.forEach((a) => {
      a.classList.remove("active");
    });
    link.classList.add("active");
  });
});

const slider = () => {
  const links = document.querySelector("#nav-links");
  const buttons = document.querySelectorAll(".navbar .button-arrow");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const scrollDirection = button.id === "button-left" ? -1 : 1;
      const scroll = links.clientWidth * scrollDirection;
      links.scrollBy({ left: scroll, behavior: "smooth" });
    });
  });
};

slider();

const routes = {
  404: "/VanillaJSApps/pages/404.js",
  "/VanillaJSApps/": "/VanillaJSApps/pages/todo.js",
  "/VanillaJSApps/todo": "/VanillaJSApps/pages/todo.js",
  "/VanillaJSApps/calculator": "/VanillaJSApps/pages/calculator.js",
  "/VanillaJSApps/weather-app": "/VanillaJSApps/pages/weather-app.js",
};

const handleLocation = async () => {
  const path = window.location.pathname;
  const route = routes[path] || routes[404];

  const pathSegments = route.split("/");
  const routeName = pathSegments[pathSegments.length - 1].replace(".js", "");

  const scriptElement = document.createElement("script");
  scriptElement.src = route;
  scriptElement.onload = () => {
    const mainPage = document.getElementById("app-container");
    mainPage.innerHTML = "";
    mainPage.appendChild(renderPage());
  };
  document.querySelectorAll("script").forEach((el) => {
    if (!el.src.endsWith("index.js")) {
      el.remove();
    }
  });

  link.href = "css/" + routeName + ".css";
  document.head.appendChild(link);

  document.body.appendChild(scriptElement);
};

window.onpopstate = handleLocation;

handleLocation();
