let confirmationPrix = document.getElementById('confirmation_prix');
let confirmationId = document.getElementById('confirmation_id');

let prix = localStorage.getItem("prixTotal");
let id = localStorage.getItem("orderId");

confirmationPrix.innerHTML = 'Prix total :</br><span class="infos_confirmation">'+prix+' EUR</span>';

confirmationId.innerHTML = 'Identifiant de commande :<br><span class="infos_confirmation">'+id+'</span>';

localStorage.clear();