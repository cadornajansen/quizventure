document.addEventListener("DOMContentLoaded", () => {
  const guidesBtn = document.getElementById("guidesBtn");
  const cheatsBtn = document.getElementById("cheatsBtn");
  const docsBtn = document.getElementById("docsBtn");
  const idesBtn = document.getElementById("idesBtn");

  if (guidesBtn) {
    guidesBtn.addEventListener("click", () => {
      window.location.href = "guides.pdf";
    });
  }

  if (cheatsBtn) {
    cheatsBtn.addEventListener("click", () => {
      window.location.href = "cheatsheets.pdf";
    });
  }

  if (docsBtn) {
    docsBtn.addEventListener("click", () => {
      window.location.href = "linktodocs.docx";
    });
  }

  if (idesBtn) {
    idesBtn.addEventListener("click", () => {
      window.location.href = "#";
    });
  }
});