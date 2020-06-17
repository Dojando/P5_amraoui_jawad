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
        Storage.removeItem(btnSupprimer[i].id);
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