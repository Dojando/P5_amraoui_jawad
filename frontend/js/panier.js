// script ajout des articles

const container = document.getElementById('container');
let prixTotal = document.getElementById('prixTotal');

let y = 0;
let eur = " EUR";
let tabObj = [];


// localstorage du panier pour stocker les articles

let panier = JSON.parse(localStorage.getItem("panier"));


// recupération des infos

infor();
async function infor() {
    tabObj = [];
    for (let i = 0; i < panier.length; i++) {
        let response = await fetch('http://localhost:3000/api/cameras/'+panier[i]);
        let json = await response.json();
        tabObj.push(json);
    }
    affichage_article();
}


// affichage des articles

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
    for (let i = 0; i < panier.length; i++) {
        y += tabObj[i].price / 100;
    }
    prixTotal.innerHTML = y + eur
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

let regex_formulaire = {
    prenom: /^[A-Z-]{1,100}$/i,
    nom: /^[A-Z-]{1,100}$/i,
    adresse: /^[A-Z-\d ]{1,100}$/i,
    ville: /^[A-Z- ]{1,100}$/i,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]+){2,4}$/i,
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
    let valid = true;
    inputValue[0] = regex_formulaire.prenom.test(prenom.value);
    inputValue[1] = regex_formulaire.nom.test(nom.value);
    inputValue[2] = regex_formulaire.adresse.test(adresse.value);
    inputValue[3] = regex_formulaire.ville.test(ville.value);
    inputValue[4] = regex_formulaire.email.test(email.value);
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
        console.log(contact);
        console.log(products);
        console.log(JSON.stringify([contact, products]));
        fetch('http://localhost:3000/api/cameras/order', options)
            .then(function(response) {
                return response.text();
            })
            .then(function(data) {
                localStorage.setItem("orderId", JSON.parse(data).orderId);
            })
            .then(function() {
                window.location.href = "confirmation.html";
            })
    }
})
