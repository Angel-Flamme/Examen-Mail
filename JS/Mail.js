document.addEventListener('DOMContentLoaded', function() {
    // 1. Récupérer l'ID et la liste depuis le localStorage
    const selectedId = localStorage.getItem("openedMailId");
    const allEmails = JSON.parse(localStorage.getItem("allEmails"));

    // 2. Trouver le mail correspondant dans la liste
    if (selectedId && allEmails) {
        const email = allEmails.find(m => m.id == selectedId);

        if (email) {
            // 3. Injecter les données dans ton HTML
            // (Assure-toi d'avoir ces IDs dans ton fichier Mail.html)
            document.getElementById('mail-subject').textContent = email.subject;
            document.getElementById('mail-sender').textContent = email.sender;
            document.getElementById('mail-date').textContent = email.date;
            document.getElementById('mail-body').textContent = email.snippet; // ou le corps complet
        }
    } else {
        console.error("Aucun mail trouvé.");
    }
});