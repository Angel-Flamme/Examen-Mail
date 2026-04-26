var btn = document.getElementById("toggle");
var menu = document.getElementById("hidden");
var page = document.getElementsByClassName("page-info")[0];
var nbrMail = document.getElementsByClassName("nav-count")[0];
var composeBtn = document.getElementsByClassName("compose-btn")[0];
var nvMail = document.getElementById("nv-mail");
var resetBtn = document.getElementsByClassName("reset")[0];

const storedEmails = localStorage.getItem("allEmails");
var emails;

if (storedEmails) {
    emails = JSON.parse(storedEmails);
} else {
    emails = [
        {
            id: 1,
            sender: 'Google',
            subject: 'Sécurité de votre compte Google',
            snippet: 'Nous avons détecté une activité inhabituelle sur votre compte...',
            date: '14:30',
            unread: true,
            starred: false,
            clicable: false
        },
        {
            id: 2,
            sender: 'Amazon',
            subject: 'Votre commande a été expédiée',
            snippet: 'Votre commande #123456789 a été expédiée et arrivera...',
            date: 'Hier',
            unread: true,
            starred: true,
            clicable: false
        },
        {
            id: 3,
            sender: 'LinkedIn',
            subject: 'Nouvelles connexions cette semaine',
            snippet: 'Découvrez qui a consulté votre profil récemment...',
            date: 'Mar 15',
            unread: false,
            starred: false,
            clicable: false
        },
        {
            id: 4,
            sender: 'GitHub',
            subject: 'Nouveau dépôt créé',
            snippet: 'Vous avez créé un nouveau dépôt public...',
            date: 'Mar 14',
            unread: false,
            starred: false,
            clicable: false
        },
        {
            id: 5,
            sender: 'Netflix',
            subject: 'Votre facture mensuelle',
            snippet: 'Votre paiement de 15,99 € a été traité avec succès...',
            date: 'Mar 13',
            unread: true,
            starred: false,
            clicable: false
        },
        {
            id: 6,
            sender: 'Facebook',
            subject: 'Mise à jour de vos amis',
            snippet: 'Marie et 5 autres personnes ont mis à jour leur statut...',
            date: 'Mar 12',
            unread: false,
            starred: false,
            clicable: false
        },
        {
            id: 7,
            sender: 'Twitter',
            subject: 'Tendances du moment',
            snippet: 'Découvrez les sujets les plus discutés...',
            date: 'Mar 11',
            unread: false,
            starred: true,
            clicable: false
        },
        {
            id: 8,
            sender: 'YouTube',
            subject: 'Nouvelles vidéos recommandées',
            snippet: 'Basé sur ce que vous avez regardé récemment...',
            date: 'Mar 10',
            unread: true,
            starred: false,
            clicable: false
        }
    ]
    localStorage.setItem("allEmails", JSON.stringify(emails));
};


let countNonLus = emails.filter(email => email.unread).length;
var count = Object.keys(emails).length;

function renderEmails() {
    var emailList = document.querySelector('.email-list');
    emailList.innerHTML = '';

    emails.forEach(email => {
        var emailItem = document.createElement('div');
        emailItem.className = `email-item ${email.unread ? 'unread' : 'read'}`;
        emailItem.innerHTML = `
        <div class="liste ${email.clicable ? 'clicable' : ''}">
            <input type="checkbox" class="email-checkbox" data-id="${email.id}">
            <span class="email-star" data-id="${email.id}">${email.starred ? '⭐' : '☆'}</span>
            <div class="email-sender">${email.sender}</div>
            <div class="email-subject">${email.subject}</div>
            <div class="email-snippet">${email.snippet}</div>
            <div class="email-date">${email.date}</div>
        </div>
        `;
        emailList.appendChild(emailItem);
    });
}

function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', function() {
    renderEmails();

document.querySelector('.email-list').addEventListener('click', function(e) {
    var emailRow = e.target.closest('.liste');
    
    if (emailRow && !e.target.classList.contains('email-star') && !e.target.classList.contains('email-checkbox')) {
        var checkbox = emailRow.querySelector('.email-checkbox');
        var id = parseInt(checkbox.dataset.id);
        var email = emails.find(mail => mail.id === id);

        if (email && email.clicable) { 
            email.unread = false;

            localStorage.setItem("openedMailId", id);
            localStorage.setItem("allEmails", JSON.stringify(emails));
            
            window.location.href = "Mail.html";
        }            
        } else {
            alert("Ce mail n'est pas visible pour l'examen")
        }
    });

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('email-star')) {
            var id = parseInt(e.target.dataset.id);
            var email = emails.find(email => email.id === id);
            email.starred = !email.starred;
            e.target.textContent = email.starred ? '⭐' : '☆';
        }
    });

    document.getElementById('select-all').addEventListener('change', function() {
        var checkboxes = document.querySelectorAll('.email-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });
});

btn.addEventListener("click", () => {
  hidden.classList.toggle("hidden");
  var icon = document.getElementById("toggle-icon");
  icon.textContent = hidden.classList.contains("hidden") ? "▼" : "▲";
});

page.innerHTML = "1-50 sur " + count + " emails";
nbrMail.innerHTML = countNonLus;

composeBtn.addEventListener("click", () => {
    if (!nvMail.classList.contains('visible')) {
        nvMail.innerHTML = `
            <div class="compose-window">
                <div class="compose-header">Nouveau message
                    <button class="compose-close" onclick="document.getElementById('nv-mail').classList.remove('visible')">❌</button>
                </div>
                <div class="compose-body">
                    <input type="text" placeholder="A" class="compose-input" id="input-to">
                    <input type="text" placeholder="Objet" class="compose-input" id="input-subject">
                    <textarea class="compose-textarea" id="input-body"></textarea>
                    <div class="compose-buttons">
                        <button id="send-mail">Envoyer</button>
                        <input type="file" id="attach-file" style="display:none;">
                        <label for="attach-file" class="attache-file">📎</label>
                    </div>
                </div>
            </div>
        `;
        nvMail.classList.add('visible');
        addSendListener();
    } else {
        nvMail.classList.remove('visible');
    }
});

function addSendListener() {
  var sendBtn = document.getElementById("send-mail");

  sendBtn.addEventListener("click", () => {
    var to = document.getElementById("input-to").value;
    var subject = document.getElementById("input-subject").value;
    var body = document.getElementById("input-body").value;
    var fileInput = document.getElementById("attach-file");
    var date = new Date().getHours() + ":" + (new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes();

    const processMail = (imageData = null) => {
        emails.unshift({
            id: emails.length + 1,
            sender: "Vous",
            subject: subject,
            snippet: body,
            date: date,
            starred: false,
            clicable: true,
            unread: true,
            image: imageData
        });
        
        localStorage.setItem("allEmails", JSON.stringify(emails));
        renderEmails();
        nvMail.classList.remove("visible");
        document.querySelector(".nav-count").innerHTML = emails.filter(m => m.unread).length;
    };

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            processMail(e.target.result);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        processMail();
    }
  });
}

addEventListener("click", function(e) {
    if (e.target.classList.contains("reset")) {
        localStorage.removeItem("allEmails");
        localStorage.removeItem("openedMailId");
        location.reload();
    }
});