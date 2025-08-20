
const accessibilityBtn = document.getElementById("accessibilityBtn");
const accessibilityModal = document.getElementById("accessibilityModal");
const closeAccessibilityModalBtn = document.getElementById("closeAccessibilityModalBtn");

const privacyLicenseBtn = document.getElementById("privacyLicenseBtn");
const privacyLicenseFormBtn = document.getElementById("privacyLicenseFormBtn");
const privacyLicenseModal = document.getElementById("privacyLicenseModal");
const closePrivacyLicenseModalBtn = document.getElementById("closePrivacyLicenseModalBtn");

function setupModal({ modal, openButtons, closeButton }) {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            close();
        }
    });

    openButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const expanded = btn.getAttribute("aria-expanded") === "true";
            if (expanded) {
                close();
            } else {
                open();
            }
        });
    });

    closeButton.addEventListener("click", close);

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            close();
        }
    });

    function open() {
        modal.style.display = "flex";
        openButtons.forEach((btn) => btn.setAttribute("aria-expanded", "true"));
    }

    function close() {
        modal.style.display = "none";
        openButtons.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
    }
}

setupModal({
    modal: accessibilityModal,
    openButtons: [accessibilityBtn],
    closeButton: closeAccessibilityModalBtn,
});

setupModal({
    modal: privacyLicenseModal,
    openButtons: [privacyLicenseBtn, privacyLicenseFormBtn],
    closeButton: closePrivacyLicenseModalBtn,
});
