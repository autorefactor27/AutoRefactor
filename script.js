const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const copyButton = document.getElementById("copy-citation");
const bibtex = document.getElementById("bibtex");

if (copyButton && bibtex) {
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(bibtex.textContent.trim());
      copyButton.textContent = "Copied";
      window.setTimeout(() => {
        copyButton.textContent = "Copy BibTeX";
      }, 1600);
    } catch {
      copyButton.textContent = "Copy failed";
      window.setTimeout(() => {
        copyButton.textContent = "Copy BibTeX";
      }, 1600);
    }
  });
}
