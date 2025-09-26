document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("promo-banner");
    const closeBtn = banner.querySelector(".promo-close");

    const autoCloseTimer = setTimeout(() => {
        banner.style.display = "none";
    }, 8000);

    const closeBanner = () => {
        banner.style.display = "none";
        clearTimeout(autoCloseTimer);
    };

    closeBtn.addEventListener("click", closeBanner);

    banner.addEventListener("click", (e) => {
        if (e.target === banner) {
            closeBanner();
        }
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeBanner();
        }
    });
});
