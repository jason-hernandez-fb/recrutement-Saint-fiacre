const form=document.getElementById("formCandidature")

const webhook="https://discord.com/api/webhooks/1490650106582532106/GBEqDu--cO9tevE2wQOQSPNx6kVNwdrPKPxPwUv9mjq4nk9Ad94UYcD7zmXGqXm0hLCs"

form.addEventListener("submit",async function(e){

e.preventDefault()

const prenomHrp=document.getElementById("prenomHrp").value
const ageHrp=document.getElementById("ageHrp").value
const discordID=document.getElementById("discordID").value
const pseudoDiscord=document.getElementById("pseudoDiscord").value
const pseudoRp=document.getElementById("pseudoRp").value
const prenomNom=document.getElementById("prenomNom").value
const lieuxNaissance=document.getElementById("lieuxNaissance").value
const sexe=document.getElementById("sexe").value
const tel=document.getElementById("tel").value
const rib=document.getElementById("rib").value
const disponibilite=document.getElementById("disponibilite").value
const presentation=document.getElementById("presentation").value
const diplome=document.getElementById("diplome").value
const motivation=document.getElementById("motivation").value
const permis=document.getElementById("permis").value
const conclusion=document.getElementById("conclusion").value

let candidatures=JSON.parse(localStorage.getItem("candidatures"))||[]

candidatures.push({pseudoRp})

localStorage.setItem("candidatures",JSON.stringify(candidatures))

const message=
"📨 **Nouvelle candidature** \n\n"+
"👤 Pseudo RP : "+pseudoRp+"\n"+
"🧑 Prénom HRP : "+prenomHrp+"\n"+
"🎂 Age HRP : "+ageHrp+"\n"+
"💬 Discord : "+pseudoDiscord+"\n"+
"🆔 ID Discord : "+discordID+"\n"+
"📛 Nom RP : "+prenomNom+"\n"+
"📍 Lieu naissance : "+lieuxNaissance+"\n"+
"⚧ Sexe : "+sexe+"\n"+
"📞 Téléphone : "+tel+"\n"+
"🏦 RIB : "+rib+"\n"+
"⏰ Disponibilité : "+disponibilite+"\n"+
"📜 Présentation : "+presentation+"\n"+
"🎓 Diplôme : "+diplome+"\n"+
"🔥 Motivation : "+motivation+"\n"+
"🚗 Permis : "+permis+"\n"+
"📄 Conclusion : "+conclusion

await fetch(webhook,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({content:message})
})

alert("✅ Candidature envoyée avec succès")

form.reset()

})
