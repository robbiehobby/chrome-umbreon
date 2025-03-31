const mode = window.matchMedia("(prefers-color-scheme: dark)");
const handleColor = () => {
  document.body.classList.add(mode.matches ? "dark" : "light");
  document.body.classList.remove(mode.matches ? "light" : "dark");
};
handleColor();
mode.addEventListener("change", () => handleColor());
