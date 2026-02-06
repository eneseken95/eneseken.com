const topbarInner = document.querySelector(".topbar-inner");
const menuToggle = document.querySelector(".menu-toggle");
const menuLinks = document.querySelectorAll(".main-menu a");
const copyEmailButton = document.querySelector(".copy-email");
const emailText = document.getElementById("email-text");

if (topbarInner && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = topbarInner.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 980) {
        topbarInner.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

if (copyEmailButton && emailText) {
  copyEmailButton.addEventListener("click", async () => {
    const text = emailText.textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      const helper = document.createElement("textarea");
      helper.value = text;
      helper.style.position = "fixed";
      helper.style.opacity = "0";
      document.body.appendChild(helper);
      helper.focus();
      helper.select();
      document.execCommand("copy");
      document.body.removeChild(helper);
    }
    copyEmailButton.classList.add("copied");
    setTimeout(() => copyEmailButton.classList.remove("copied"), 220);
  });
}
