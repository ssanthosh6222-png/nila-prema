const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();

const portfolioGrid = document.querySelector("#portfolio-grid");
const portfolioPrompt = document.querySelector("#portfolio-prompt");
const portfolioDisclaimer = document.querySelector("#portfolio-disclaimer");

function revealPortfolio() {
  portfolioGrid.hidden = false;
  portfolioPrompt.hidden = true;
  portfolioDisclaimer.hidden = false;
}

document.querySelectorAll('a[href="#portfolio"]').forEach((link) => {
  link.addEventListener("click", revealPortfolio);
});

if (window.location.hash === "#portfolio") revealPortfolio();

const portfolioViewer = document.querySelector("#portfolio-viewer");
const portfolioButtons = [...document.querySelectorAll(".portfolio-open")];
const viewerImage = portfolioViewer.querySelector(".viewer-image");
const viewerTitle = portfolioViewer.querySelector(".viewer-title");
const viewerCount = portfolioViewer.querySelector(".viewer-count");
let activePortfolioIndex = 0;

function showPortfolioImage(index) {
  activePortfolioIndex = (index + portfolioButtons.length) % portfolioButtons.length;

  const button = portfolioButtons[activePortfolioIndex];
  const image = button.querySelector("img");
  const title = button.closest(".portfolio-item").querySelector("figcaption span").textContent;

  viewerImage.src = image.src;
  viewerImage.alt = image.alt;
  viewerTitle.textContent = title;
  viewerCount.textContent = `${String(activePortfolioIndex + 1).padStart(2, "0")} / ${String(portfolioButtons.length).padStart(2, "0")}`;
}

portfolioButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    showPortfolioImage(index);
    portfolioViewer.showModal();
  });
});

portfolioViewer.querySelector(".viewer-close").addEventListener("click", () => portfolioViewer.close());
portfolioViewer.querySelector(".viewer-previous").addEventListener("click", () => showPortfolioImage(activePortfolioIndex - 1));
portfolioViewer.querySelector(".viewer-next").addEventListener("click", () => showPortfolioImage(activePortfolioIndex + 1));

portfolioViewer.addEventListener("click", (event) => {
  if (event.target === portfolioViewer) portfolioViewer.close();
});

document.addEventListener("keydown", (event) => {
  if (!portfolioViewer.open) return;
  if (event.key === "ArrowLeft") showPortfolioImage(activePortfolioIndex - 1);
  if (event.key === "ArrowRight") showPortfolioImage(activePortfolioIndex + 1);
});

document.querySelector("#booking-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const data = new FormData(form);
  const subject = `Makeup inquiry — ${data.get("occasion")}`;
  const body = [
    `Name: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
    `Occasion: ${data.get("occasion")}`,
    "",
    data.get("message") || "No additional details yet.",
  ].join("\n");
  const inbox = "your@email.com";

  if (inbox === "your@email.com") {
    document.querySelector("#form-hint").textContent =
      "This form isn't connected to a booking inbox yet. Please message @nila_glamart_29 on Instagram to book.";
    return;
  }

  window.location.href = `mailto:${inbox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
