// script ajout des articles

const container = document.getElementById('container');
let btnSupprimer = document.getElementsByClassName('btn_supprimer');
let prixPanier = document.getElementsByClassName('prix_article_panier');
let prixTotal = document.getElementById('prixTotal');

// localstorage du panier pour stocker les articles

let panier = JSON.parse(localStorage.getItem("panier"));
let listPrix = [];
let stringArray;
let y = 0;
let eur = " EUR";
let tabObj = [];


// recupération des infos

async function infor() {
    tabObj = [];
    console.log(panier);
    console.log(panier.length);
    for (let i = 0; i < panier.length; i++) {
        console.log("test");
        console.log("func en cours")
        let response = await fetch('http://localhost:3000/api/cameras/'+panier[i]);
        console.log("func en cours")
        let json = await response.json();
        console.log("func en cours")
        tabObj.push(json);
    }
}

async function affichage_article() {
    await infor();
    for (let i = 0; i < panier.length; i++) {
        await tabObj[i];
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
}
affichage_article();


// script prix total dynamique

async function prixTotalDynamique() {
    await affichage_article();
    for (let i = 0; i < panier.length; i++) {
        y += tabObj[i].price / 100;
    }
    prixTotal.innerHTML = y + eur;
}
prixTotalDynamique();


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


// let tabObj = [];

// async function infor() {
//     for (let i = 0; i < panier.length; i++) {
//         let response = await fetch('http://localhost:3000/api/cameras/'+panier[i]);
//         let json = await response.json();
//         tabObj.push(json);
//         console.log("func en cours")
//         // console.log(tabObj[0].price);
//     }
// }



// for (let i = 0; i < panier.length; i++) {
//     console.log(panier[i]);
//     fetch('http://localhost:3000/api/cameras/'+panier[i])
//         .then(function(response) {
//             return response.json();
//         })
//         .then(function(json) {
//             console.log(json.name);
//             container.innerHTML += 
//             '<div class="card article_panier">'+
//             '<div class="card-body row justify-content-between">'+
//                 '<img class="col-3 align-self-center" src='+json.imageUrl+' alt="">'+
//                 '<p class="card-text align-self-center h5">'+json.name+'</p>'+
//                 '<p class="card-text align-self-center h5 prix_article_panier">'+json.price / 100 + " EUR"+'</p>'+
//                 '<button onclick="btnDelete(\'' + panier[i] + '\')" class="btn btn-danger align-self-center btn_supprimer '+panier[i]+'">Supprimer</button>'+
//             '</div>'+
//             '</div>'
//         })
//         // script prix total dynamique
//         .then(function() {
//             stringArray = prixPanier[i].innerHTML.split(" ").map(Number);
//             y += stringArray[0];
//             prixTotal.innerHTML = y + eur;
//         })
//         // script boutton supprimer
//         .catch(function() {
//             console.log("! erreur de promesse !");
//         });
// }


// function btnDelete(id) {
//     console.log(id);
// }

// script prix total dynamique

// console.log(prixTotal.innerHTML);

// console.log(prixPanier.length);



// for (let i = 0; i < prixPanier.length; i++) {
//     stringArray = prixPanier[i].innerHTML.split(" ").map(Number);
//     listPrix.push(stringArray[0]);
// }

// console.log(listPrix);



// for (let z = 0; z < listPrix.length; z++) {
    
//     y = y + listPrix[z];
//     prixTotal.innerHTML = y + ' EUR';
// }


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
