// récuperation des éléments html
const confirmationPrix = document.getElementById('confirmation_prix');
const confirmationId = document.getElementById('confirmation_id');

// récuperation des clés localstorage
let prix = localStorage.getItem("prixTotal");
let id = localStorage.getItem("orderId");

// injection dynamique des informations dans le code html
confirmationPrix.innerHTML = 'Prix total :</br><span class="infos_confirmation">'+prix+' EUR</span>';
confirmationId.innerHTML = 'Identifiant de commande :<br><span class="infos_confirmation">'+id+'</span>';

// suppressions de toutes les clés localstorage
localStorage.clear();