// script ajout des articles

const container = document.getElementById('container');
let prixPanier = document.getElementsByClassName('prix_article_panier');
let prixTotal = document.getElementById('prixTotal');

for (var i = 0; i < localStorage.length; i++) {
    container.innerHTML += localStorage.getItem(localStorage.key(i));
}


// script boutton supprimer

let btnSupprimer = document.getElementsByClassName('btn_supprimer');

console.log(btnSupprimer[0].id);
console.log(btnSupprimer.length);

for (var i = 0; i < btnSupprimer.length; i++) {
    btnSupprimer[i].addEventListener('click' , function() {
        console.log(btnSupprimer[0].id);
        localStorage.removeItem(btnSupprimer[i].id);
    });
}


// script prix total dynamique

console.log(prixTotal.innerHTML);

console.log(prixPanier[0].innerHTML);

let listPrix = [];
var stringArray;

for (let i = 0; i < prixPanier.length; i++) {
    stringArray = prixPanier[i].innerHTML.split(" ").map(Number);
    listPrix.push(stringArray[0]);
}

console.log(listPrix);

let y = 0;

for (let z = 0; z < listPrix.length; z++) {
    
    y = y + listPrix[z];
    prixTotal.innerHTML = y + ' EUR';
}


// script pour la validation du formulaire

let regex_formulaire = {
    prenom: /^[A-Z-]{1,100}$/i,
    nom: /^[A-Z-]{1,100}$/i,
    adresse: /^[A-Z-\d ]{1,100}$/i,
    ville: /^[A-Z- ]{1,100}$/i,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]+)$/i,
}

let form = document.getElementsByClassName('needs-validation');
let prenom = document.getElementById('Prenom');
let nom = document.getElementById('Nom');
let adresse = document.getElementById('Adresse');
let ville = document.getElementById('Ville');
let email = document.getElementById('Email');
let input = [prenom, nom, adresse, ville, email];

let prenomValue;
let nomValue;
let adresseValue;
let villeValue;
let emailValue;
let inputValue = [prenomValue, nomValue, adresseValue, villeValue, emailValue];

form[0].addEventListener('submit', function(e) {
    inputValue[0] = regex_formulaire.prenom.test(prenom.value);
    inputValue[1] = regex_formulaire.nom.test(nom.value);
    inputValue[2] = regex_formulaire.adresse.test(adresse.value);
    inputValue[3] = regex_formulaire.ville.test(ville.value);
    inputValue[4] = regex_formulaire.email.test(email.value);
    for (let i = 0; i < input.length; i++) {
        if (inputValue[i] == false) {
            e.preventDefault();
            input[i].classList.remove('is-valid');
            input[i].classList.add('is-invalid');
        } else {
            input[i].classList.remove('is-invalid');
            input[i].classList.add('is-valid');
        }
    }
})




// function ajouterPanier() {
 
//     // Récupération des informations du panier
//     let panier = JSON.parse(localStorage.getItem("panier")) || [];
 
//     // La variable contenant les informations
//     var informationsObjet = {
//         "_id": url
//     };
 
//     // Si le panier est vide on stocke simplement les informations du produit dedans
//     if (!panier) {
//         localStorage.setItem("panier", [JSON.stringify(informationsObjet)]);
//     }
 
//     // Sinon on ajoute les informations du produit à celles déjà stockées
//     else {
//         panier.push(informationsObjet);
//         localStorage.setItem("panier", [JSON.stringify(panier)]);
//     }
 
// }
