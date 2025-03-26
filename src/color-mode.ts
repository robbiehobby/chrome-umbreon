const mode = window.matchMedia("(prefers-color-scheme: dark)");
const handleMode = () => {
  document.body.classList.add(mode.matches ? "dark" : "light");
  document.body.classList.remove(mode.matches ? "light" : "dark");
};
handleMode();
mode.addEventListener("change", () => handleMode());
