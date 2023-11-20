// home.js
function renderPage() {
  const pageTitle = document.createElement("h1");
  pageTitle.textContent = "Calculator";
  pageTitle.className = "title";
  const appContainer = document.getElementById("app-container");
  appContainer.appendChild(pageTitle);

  const pageContainer = document.createElement("div");
  pageContainer.className = "calculator-app";

  //screen

  let valueA = 0;
  let valueB = 0;
  let valueC = 0;
  let operation = "";
  let readyForInput = false;

  const screen = document.createElement("div");
  screen.className = "screen";

  const screenTop = document.createElement("p");
  screenTop.className = "screen-top";

  const screenBottom = document.createElement("p");
  screenBottom.className = "screen-bottom";
  screenBottom.textContent = valueA;

  screen.appendChild(screenTop);
  screen.appendChild(screenBottom);

  // buttons

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "buttons-container";

  const buttons = [
    "C",
    "DEL",
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "x",
    "1",
    "2",
    "3",
    "-",
    ".",
    "0",
    "=",
    "+",
  ];

  buttons.forEach((btn) => {
    const button = document.createElement("button");
    button.textContent = btn;
    button.className = btn;
    buttonsContainer.appendChild(button);
  });

  buttonsContainer.addEventListener("click", (e) => {
    const clickedButton = e.target.textContent;

    switch (clickedButton) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        if (screenTop.textContent.includes("=") || screenBottom.textContent.includes("i")) {
          screenTop.textContent = "";
          screenBottom.textContent = "0";
          valueA = 0;
          valueB = 0;
          valueC = 0;
          operation = "";
        }
        if (readyForInput) {
          screenBottom.textContent = 0;
          readyForInput = false;
        }

        screenBottom.textContent.charAt(0) === "0" &&
        screenBottom.textContent.charAt(1) !== "."
          ? (screenBottom.textContent = clickedButton)
          : (screenBottom.textContent += clickedButton);

        valueA = Number(screenBottom.textContent);
        break;
      case "C":
        screenTop.textContent = "";
        screenBottom.textContent = "0";
        valueA = 0;
        valueB = 0;
        valueC = 0;
        operation = "";
        readyForInput = false;
        break;
      case "DEL":
        if (screenTop.textContent.includes("=")) {
          screenTop.textContent = "";
          valueB = 0;
          valueC = 0;
          operation = "";
        }
        screenBottom.textContent = screenBottom.textContent.slice(0, -1);
        screenBottom.textContent.length < 1
          ? (screenBottom.textContent = 0)
          : "";
        valueA = Number(screenBottom.textContent);
        readyForInput = false;
        break;
      case "/":
        if (screenTop.textContent.includes("=")) {
          screenTop.textContent = "";
          valueB = 0;
          valueC = 0;
          operation = "";
        }
        if (operation !== "/" && operation.length < 1) {
          operation = "/";
          valueB = valueA;
        } else if (operation !== "/" && operation.length === 1) {
          operation = "/";
        } else {
          valueC = valueA;
          valueA = valueB / valueC;
          valueB = valueA;
        }
        screenTop.textContent = `${valueB} ${operation}`;
        screenBottom.textContent = valueA;
        readyForInput = true;
        break;
      case "x":
        if (screenTop.textContent.includes("=")) {
          screenTop.textContent = "";
          valueB = 0;
          valueC = 0;
          operation = "";
        }
        if (operation !== "x" && operation.length < 1) {
          operation = "x";
          valueB = valueA;
        } else if (operation !== "x" && operation.length === 1) {
          operation = "x";
        } else {
          valueC = valueA;
          valueA = valueB * valueC;
          valueB = valueA;
        }
        screenTop.textContent = `${valueB} ${operation}`;
        screenBottom.textContent = valueA;
        readyForInput = true;
        break;
      case "-":
        if (screenTop.textContent.includes("=")) {
          screenTop.textContent = "";
          valueB = 0;
          valueC = 0;
          operation = "";
        }
        if (operation !== "-" && operation.length < 1) {
          operation = "-";
          valueB = valueA;
        } else if (operation !== "-" && operation.length === 1) {
          operation = "-";
        } else {
          valueC = valueA;
          valueA = valueB - valueC;
          valueB = valueA;
        }
        screenTop.textContent = `${valueB} ${operation}`;
        screenBottom.textContent = valueA;
        readyForInput = true;
        break;
      case "+":
        if (screenTop.textContent.includes("=")) {
          screenTop.textContent = "";
          valueB = 0;
          valueC = 0;
          operation = "";
        }
        if (operation !== "+" && operation.length < 1) {
          operation = "+";
          valueB = valueA;
        } else if (operation !== "+" && operation.length === 1) {
          operation = "+";
        } else {
          valueC = valueA;
          valueA = valueB + valueC;
          valueB = valueA;
        }
        screenTop.textContent = `${valueB} ${operation}`;
        screenBottom.textContent = valueA;
        readyForInput = true;
        break;
      case "=":
        if (screenTop.textContent.includes("=") || operation.length < 1) {
          break;
        } else if (operation === "+") {
          valueC = valueA;
          valueA = valueB + valueA;
        } else if (operation === "-") {
          valueC = valueA;
          valueA = valueB - valueA;
        } else if (operation === "x") {
          valueC = valueA;
          valueA = valueB * valueA;
        } else if (operation === "/") {
          valueC = valueA;
          valueA = valueB / valueA;
        }
        valueC < 0
          ? (screenTop.textContent = `${valueB} ${operation} (${valueC}) =`)
          : (screenTop.textContent = `${valueB} ${operation} ${valueC} =`);

        screenBottom.textContent = valueA;
        valueC = 0;
        readyForInput = true;
        break;
      case ".":
        screenBottom.textContent.includes(".")
          ? ""
          : (screenBottom.textContent += clickedButton);
        break;
      default:
    }
  });

  pageContainer.appendChild(screen);
  pageContainer.appendChild(buttonsContainer);

  return pageContainer;
}
