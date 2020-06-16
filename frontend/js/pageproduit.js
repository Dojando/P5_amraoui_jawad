// async function getProduct(productId) {
//     fetch('http://localhost:3000/api/cameras/'+productId)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(json) {
//         console.log("split");
//         return json;
//     })
//     .catch(function() {
//         console.log("y'a une erreur");
//     });
// }

// let data = getProduct(urlSplit[1]).then(function(resultat) {
//     console.log(resultat);
// });

// console.log(data);


let titreProduit = document.getElementById('titreProduit');
let prixProduit = document.getElementById('prixProduit');
let descriptionProduit = document.getElementById('descriptionProduit');
let imgProduit = document.getElementById('imgProduit');
let Lentilles = document.getElementById('sel1');
let btnAjoutPanier = document.getElementById('btnAjoutPanier');

let urlSplit = location.href.split('id=');
console.log(urlSplit[1]);

// script affichage produit

fetch('http://localhost:3000/api/cameras/'+urlSplit[1])
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log(json);
        imgProduit.src = json.imageUrl;
        titreProduit.textContent = json.name;
        prixProduit.textContent = json.price / 100 + " EUR";
        descriptionProduit.textContent = json.description;
        for (let i = 0; i < json.lenses.length; i++) {
            Lentilles.innerHTML += '<option>'+json.lenses[i]+'</option>'
        }
        btnAjoutPanier.addEventListener('click', function() {
            localStorage.setItem(urlSplit[1], 
                '<div class="card article_panier">'+
                '<div class="card-body row justify-content-between">'+
                    '<img class="col-3 align-self-center" src='+json.imageUrl+' alt="">'+
                    '<p class="card-text align-self-center h5">'+json.name+'</p>'+
                    '<p class="card-text align-self-center h5 prix_article_panier">'+json.price / 100 + " EUR"+'</p>'+
                    '<a href="#" id="'+urlSplit[1]+'" class="btn btn-danger align-self-center btn_supprimer">Supprimer</a>'+
                '</div>'+
                '</div>'
            )
        })
    })
    .catch(function() {
        console.log("y'a une erreur");
    });


// script ajout au panier

