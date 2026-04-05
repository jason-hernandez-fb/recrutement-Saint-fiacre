// ID UNIQUE UTILISATEUR
let userID = localStorage.getItem("userID");
if(!userID){
    userID = "ID-" + Date.now();
    localStorage.setItem("userID", userID);
}

// Vérification role au chargement
window.addEventListener("load", function() {
    const roleUser = localStorage.getItem("roleUser");

    if(roleUser === "staff") {
        document.getElementById("btnGestionCandidaturesContainer").style.display = "block";
        afficherCandidatures();
    }
});

// Bouton Staff
const btnStaff = document.getElementById("btnStaff");
btnStaff.addEventListener("click", function(){
    const mdp = prompt("Mot de passe");

    if(mdp === "Admin123"){
        localStorage.setItem("roleUser","staff");
        alert("Mode staff activé");
        location.reload();
    }
    else if(mdp === "citoyen789"){
        localStorage.setItem("roleUser","citoyen");
        alert("Mode citoyen activé");
        location.reload();
    }
    else{
        alert("Mot de passe incorrect");
    }
});

// Envoi candidature
const form = document.getElementById("formCandidature");
form.addEventListener("submit", function(e){
    e.preventDefault();

    let candidatures = JSON.parse(localStorage.getItem("candidatures")) || [];

    const candidature = {
        id: Date.now(),
        prenomHrp: document.getElementById("prenomHrp").value,
        ageHrp: document.getElementById("ageHrp").value,
        discordID: document.getElementById("discordID").value,
        pseudoDiscord: document.getElementById("pseudoDiscord").value,
        pseudoRp: document.getElementById("pseudoRp").value,
        prenomNom: document.getElementById("prenomNom").value,
        lieuxNaissance: document.getElementById("lieuxNaissance").value,
        sexe: document.getElementById("sexe").value,
        tel: document.getElementById("tel").value,
        rib: document.getElementById("rib").value,
        disponibilite: document.getElementById("disponibilite").value,
        presentation: document.getElementById("presentation").value,
        diplome: document.getElementById("diplome").value,
        motivation: document.getElementById("motivation").value,
        permis: document.getElementById("permis").value,
        conclusion: document.getElementById("conclusion").value,
        role: "candidature en attente"
    };

    candidatures.push(candidature);
    localStorage.setItem("candidatures", JSON.stringify(candidatures));

    alert("Votre candidature a bien été envoyée !");
    form.reset();

    if(localStorage.getItem("roleUser") === "staff"){
        afficherCandidatures();
    }
});

// Bouton gestion candidatures
document.getElementById("btnGestionCandidatures").addEventListener("click", afficherCandidatures);

// Afficher candidatures
function afficherCandidatures(){
    const panel = document.getElementById("gestionCandidatures");
    panel.innerHTML = "";

    let candidatures = JSON.parse(localStorage.getItem("candidatures")) || [];
    if(candidatures.length === 0){
        panel.innerHTML = "Aucune candidature";
        return;
    }

    candidatures.forEach((c,index)=>{
        let div = document.createElement("div");
        div.className = "candidature";

        div.innerHTML =
        "<h3>"+c.pseudoRp+"</h3>"+
        "<button onclick='voirDetails("+index+")'>Voir la candidature</button>"+
        " <button onclick='supprimerCandidature("+index+")' style='background:red;color:white'>Supprimer</button>"+
        "<br><br>"+
        "<select onchange='changerRole("+index+", this.value)'>"+
        "<option value='candidature en attente'>Candidature en attente</option>"+
        "<option value='candidature accepté'>Candidature acceptée</option>"+
        "<option value='candidature refusé'>Candidature refusée</option>"+
        "<option value='citoyen'>Citoyen</option>"+
        "<option value='staff'>Staff</option>"+
        "</select>"+
        "<div id='details"+index+"' style='display:none;margin-top:10px'></div>";

        panel.appendChild(div);
    });
}

// Voir détails
function voirDetails(index){
    let candidatures = JSON.parse(localStorage.getItem("candidatures"));
    let c = candidatures[index];

    let box = document.getElementById("details"+index);
    box.style.display = "block";

    box.innerHTML =
        "Prenom HRP : "+c.prenomHrp+"<br>"+
        "Age HRP : "+c.ageHrp+"<br>"+
        "Discord : "+c.pseudoDiscord+"<br>"+
        "Pseudo RP : "+c.pseudoRp+"<br>"+
        "Nom RP : "+c.prenomNom+"<br>"+
        "Lieu naissance : "+c.lieuxNaissance+"<br>"+
        "Sexe : "+c.sexe+"<br>"+
        "Tel : "+c.tel+"<br>"+
        "RIB : "+c.rib+"<br>"+
        "Disponibilité : "+c.disponibilite+"<br>"+
        "Présentation : "+c.presentation+"<br>"+
        "Diplome : "+c.diplome+"<br>"+
        "Motivation : "+c.motivation+"<br>"+
        "Permis : "+c.permis+"<br>"+
        "Conclusion : "+c.conclusion;
}

// Changer rôle
function changerRole(index, role){
    let candidatures = JSON.parse(localStorage.getItem("candidatures"));
    candidatures[index].role = role;
    localStorage.setItem("candidatures", JSON.stringify(candidatures));
    alert("Rôle modifié");
}

// Supprimer candidature
function supprimerCandidature(index){
    let candidatures = JSON.parse(localStorage.getItem("candidatures"));
    if(confirm("Voulez-vous vraiment supprimer cette candidature ?")){
        candidatures.splice(index, 1);
        localStorage.setItem("candidatures", JSON.stringify(candidatures));
        afficherCandidatures();
    }
}