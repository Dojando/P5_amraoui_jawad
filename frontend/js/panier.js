// récuperation des éléments html
const container = document.getElementById('container');
const prixTotal = document.getElementById('prixTotal');

// initialisation des variables
let y = 0;
let  it = 0;
const eur = " EUR";
let tabObj = [];
let panier = [];


// récuperation des infos du localstorage "panier"

if (localStorage.getItem("panier") != null) {
    panier = JSON.parse(localStorage.getItem("panier"));
}


// recupération des infos des produits du panier

data_fetch();
function data_fetch() {
    if (panier.length > 0) {
        fetch('http://localhost:3000/api/cameras/'+panier[it])
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            tabObj.push(data);
            if (tabObj.length == panier.length) {
                affichage_article();
            } 
            else {
                it++;
                data_fetch();
            }
        })
    }
}


// affichage des articles avec du code html dynamique

function affichage_article() {
    for (let i = 0; i < panier.length; i++) {
        container.innerHTML += 
        '<div class="card article_panier">'+
        '<div class="card-body row justify-content-between">'+
            '<img class="col-3 align-self-center" src='+tabObj[i].imageUrl+' alt="">'+
            '<p class="card-text align-self-center h5">'+tabObj[i].name+'</p>'+
            '<p class="card-text align-self-center h5 prix_article_panier">'+tabObj[i].price / 100 + " EUR"+'</p>'+
            '<button onclick="btnDelete(\'' + tabObj[i]._id + '\')" class="btn btn-danger align-self-center btn_supprimer">Supprimer</button>'+
        '</div>'+
        '</div>'
    }
    prixTotalDynamique();
}


// script prix total dynamique

function prixTotalDynamique() {
    // somme de tous les prix et stockage du prix total
    for (let i = 0; i < panier.length; i++) {
        y += tabObj[i].price / 100;
    }
    prixTotal.innerHTML = y + eur;
    localStorage.setItem("prixTotal", y);
}


// script boutton supprimer

function btnDelete(id) {
    panier = JSON.parse(localStorage.getItem("panier"));
    let index = panier.indexOf(id);
    if (index > -1) {
        panier.splice(index, 1);
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    location.reload();
    return false;
}


// script pour la validation du formulaire
// création des règles regex
const regex_formulaire = {
    prenom: /^[A-Z-]{1,100}$/i,
    nom: /^[A-Z-]{1,100}$/i,
    adresse: /^[A-Z-\d ]{1,100}$/i,
    ville: /^[A-Z- ]{1,100}$/i,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]+){2,4}$/i,
}
// récuperation des éléments html
const form = document.getElementsByClassName('needs-validation');
const prenom = document.getElementById('Prenom');
const nom = document.getElementById('Nom');
const adresse = document.getElementById('Adresse');
const ville = document.getElementById('Ville');
const email = document.getElementById('Email');
const input = [prenom, nom, adresse, ville, email];
// initialisation des variables
let prenomValue;
let nomValue;
let adresseValue;
let villeValue;
let emailValue;
let inputValue = [prenomValue, nomValue, adresseValue, villeValue, emailValue];
// création du bouton de validation de formulaire
form[0].addEventListener('submit', function(e) {
    let valid = true;
    inputValue[0] = regex_formulaire.prenom.test(prenom.value);
    inputValue[1] = regex_formulaire.nom.test(nom.value);
    inputValue[2] = regex_formulaire.adresse.test(adresse.value);
    inputValue[3] = regex_formulaire.ville.test(ville.value);
    inputValue[4] = regex_formulaire.email.test(email.value);
    if (panier.length == 0 || panier == null) {
        window.alert("Aucun article dans le panier, impossible de valider la commande");
    } else {
        // vérification des informations renseignées
        for (let i = 0; i < input.length; i++) {
            if (inputValue[i] == false) {
                e.preventDefault();
                valid = false;
                input[i].classList.remove('is-valid');
                input[i].classList.add('is-invalid');
            } else {
                e.preventDefault();
                input[i].classList.remove('is-invalid');
                input[i].classList.add('is-valid');
            }
        }
        // Envoie des infos au serveur
        if (valid == true) {
            let contact = {
                firstName: prenom.value,
                lastName: nom.value,
                address: adresse.value,
                city: ville.value,
                email: email.value
            };
            let products = panier;
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contact,
                    products
                })
            }
            fetch('http://localhost:3000/api/cameras/order', options)
                .then(function(response) {
                    return response.text();
                })
                // récuperation des infos du serveur
                .then(function(data) {
                    localStorage.setItem("orderId", JSON.parse(data).orderId);
                    // redirection vers la page de confirmation
                    window.location.href = "confirmation.html";
                })
        }
    }
})
