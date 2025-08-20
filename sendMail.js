
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();
    const message = formData.get("message")?.trim();
    const consent = formData.get("consent");

    if (!name && !email && !message) {
        showStatus("נא למלא את הטופס", "error");
        return;
    }

    if (!name) {
        showStatus("נא למלא שם מלא", "error");
        return;
    }
    if (!/^[א-תA-Za-z\s]{2,}$/.test(name)) {
        showStatus("שם לא תקין", "error");
        return;
    }

    if (!email) {
        showStatus("נא למלא מייל", "error");
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showStatus("מייל לא תקין", "error");
        return;
    }

    if (!message) {
        showStatus("נא למלא הודעה", "error");
        return;
    }
    if (message.length < 5) {
        showStatus("ההודעה קצרה מדי", "error");
        return;
    }

    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
        formStatus.textContent = "כתובת מייל לא תקינה";
        formStatus.className = "form-status error";
        return;
    }

    if (!consent) {
        showStatus("יש לאשר את תנאי השימוש והפרטיות", "error");
        return;
    }

    try {
        const response = await fetch('sendMail.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.text();

        if (response.ok && result.includes("ההודעה נשלחה")) {
            formStatus.textContent = "ההודעה נשלחה בהצלחה";
            formStatus.className = "form-status success";
            form.reset();
        } else {
            throw new Error(result);
        }
    } catch (error) {
        formStatus.textContent = "אירעה שגיאה בשליחת ההודעה";
        formStatus.className = "form-status error";
    }

    function showStatus(message, type) {
        const statusEl = document.getElementById("formStatus");
        statusEl.textContent = message;
        statusEl.className = `form-status ${type}`;

        setTimeout(() => {
            statusEl.textContent = "";
            statusEl.className = "form-status";
        }, 10000);
    }
});