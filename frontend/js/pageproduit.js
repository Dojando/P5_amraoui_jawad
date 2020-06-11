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

let urlSplit = location.href.split('id=');
console.log(urlSplit[1]);

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
    })
    .catch(function() {
        console.log("y'a une erreur");
    });