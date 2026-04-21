document.addEventListener('DOMContentLoaded', function() {
    const selectedId = localStorage.getItem("openedMailId");
    const allEmails = JSON.parse(localStorage.getItem("allEmails"));
    const back = document.getElementById('back');
    back.addEventListener('click', function() {
        localStorage.setItem("openedMailId", selectedId);
        localStorage.setItem("allEmails", JSON.stringify(allEmails));
        window.location.href = 'Acceuil_Mail.html';
    });
    if (selectedId && allEmails) {
        const email = allEmails.find(m => m.id == selectedId);

        if (email) {
            document.getElementById('mail-subject').textContent = email.subject;
            document.getElementById('mail-sender').textContent = email.sender;
            document.getElementById('mail-date').textContent = email.date;
            document.getElementById('mail-body').textContent = email.snippet;
        }
    } else {
        console.error("Aucun mail trouvé.");
    }
});