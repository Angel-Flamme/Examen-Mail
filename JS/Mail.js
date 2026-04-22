var btn = document.getElementById("toggle");
var menu = document.getElementById("hidden");

document.addEventListener('DOMContentLoaded', function() {
    const selectedId = localStorage.getItem("openedMailId");
    const allEmails = JSON.parse(localStorage.getItem("allEmails"));
    const back = document.getElementById('back');
    back.addEventListener('click', function() {
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

            const imgContainer = document.getElementById('mail-image'); 
            if (email.image) {
                imgContainer.src = email.image;
                imgContainer.style.display = "block";
            } else {
                imgContainer.style.display = "none";
            }
        } else {
            console.error("Aucun mail trouvé.");
        }
    }
});

btn.addEventListener("click", () => {
  hidden.classList.toggle("hidden");
  var icon = document.getElementById("toggle-icon");
  icon.textContent = hidden.classList.contains("hidden") ? "▼" : "▲";
});
