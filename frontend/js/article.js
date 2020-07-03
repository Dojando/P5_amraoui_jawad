// récuperation des éléments html
const container = document.getElementById('container');


// Récuperation des informations des produits
fetch('http://localhost:3000/api/cameras')
.then(function(response){
    // formatage des infos au format json
    return response.json();
})
.then(function(json) {
    // création du code html dynamique pour tous les articles
    for (let i = 0; i < json.length; i++) {
        container.innerHTML +=
        '<div class="col-12 col-md-6">'+
        '<a href="produit.html?id='+json[i]._id+'" class="lien_article">'+
        '<article class="card">'+
            '<img class=”card-img-top” src='+json[i].imageUrl+' alt=”...”>'+
            '<div class="card-body">'+
                '<h3>'+json[i].name+'</h3>'+
            '</div>'+
        '</article>'+
        '</a>'+
        '</div>';
    }
})
.catch(function() {
    console.log("y'a une erreur");
});