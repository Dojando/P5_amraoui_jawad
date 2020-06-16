// script ajout des articles

const container = document.getElementById('container');
let prixPanier = document.getElementsByClassName('prix_article_panier');
let prixTotal = document.getElementById('prixTotal');

for (var i = 0; i < localStorage.length; i++) {
    container.innerHTML += localStorage.getItem(localStorage.key(i));
}


// script boutton supprimer

let btnSupprimer = document.getElementsByClassName('btn_supprimer');

for (var i = 0; i < btnSupprimer.length; i++) {
    btnSupprimer[i].addEventListener('click' , function() {
        console.log(btnSupprimer.getElementById);
    }); 
}
   

// script prix total dynamique

// console.log(prixPanier);

// for (let i = 0; i == prixPanier[length]; i++) {
//     if (i == 0) {
//         prixTotal.textContent = '0 EUR';
//     }
//     else if (prixPanier[length] == 1) {
//         var stringArray = prixPanier[0].innerHTML.split(" ");
//         prixTotal.innerHTML = stringArray[0] + " EUR";
//     }
// }