// récuperation des éléments html
const titreProduit = document.getElementById('titreProduit');
const prixProduit = document.getElementById('prixProduit');
const descriptionProduit = document.getElementById('descriptionProduit');
const imgProduit = document.getElementById('imgProduit');
const Lentilles = document.getElementById('sel1');
const btnAjoutPanier = document.getElementById('btnAjoutPanier');

let urlSplit = location.href.split('id=');


// script affichage produit et ajout au panier
// récuperation des infos dans l'api
fetch('http://localhost:3000/api/cameras/'+urlSplit[1])
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        // injection dynamique des infos des produits
        imgProduit.src = json.imageUrl;
        titreProduit.textContent = json.name;
        prixProduit.textContent = json.price / 100 + " EUR";
        descriptionProduit.textContent = json.description;
        for (let i = 0; i < json.lenses.length; i++) {
            Lentilles.innerHTML += '<option>'+json.lenses[i]+'</option>'
        }
        // création du bouton d'ajout au panier
        btnAjoutPanier.addEventListener('click', function() {
            if (localStorage.getItem("panier") == null) {
                localStorage.setItem("panier", "[]");
                let panier = JSON.parse(localStorage.getItem("panier"));
                panier.push(urlSplit[1]);
                localStorage.setItem("panier", JSON.stringify(panier));
            } else {
                let panier = JSON.parse(localStorage.getItem("panier"));
                panier.push(urlSplit[1]);
                localStorage.setItem("panier", JSON.stringify(panier));
            }
        })
    })
    .catch(function() {
        console.log("erreur");
    });
