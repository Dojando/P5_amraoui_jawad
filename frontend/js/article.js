// const container = document.getElementById('container');
// console.log(container,"container");

// container.innerHTML = `
// <div class="col-12 col-md-6">
// <article class="card">
//      <img class=”card-img-top” src=”” alt=”...”>
//      <div class="card-body">
//          <h2>Produit</h2>
//      </div>
// </article>
// </div>`;
// let data = [];
// let function = fetch('http://localhost:3000/api/cameras')
// .then(function(response) {
//     return response.json();
// })
// .then(function(json){
//     // console.log(json);
//     return json;
//     }
// })
// .catch(function(error) {
//     console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
// });
// console.log(data);


const container = document.getElementById('container');

fetch('http://localhost:3000/api/cameras')
.then(function(response){
    return response.json();
})
.then(function(json) {
    for (let i = 0; i < json.length; i++) {
        container.innerHTML +=
        '<div class="col-12 col-md-6">'+
        '<a href="produit.html?id='+json[i]._id+'" class="lien_article">'+
        '<article class="card">'+
            '<img class=”card-img-top” src='+json[i].imageUrl+' alt=”...”>'+
            '<div class="card-body">'+
                '<h2>'+json[i].name+'</h2>'+
            '</div>'+
        '</article>'+
        '</a>'+
        '</div>';
    }
})
.catch(function() {
    console.log("y'a une erreur");
});


// const container = document.getElementById('container');
// console.log(container,"container");

// var request = new XMLHttpRequest();

// request.onreadystatechange = function() {
//     if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//         var response = JSON.parse(this.responseText);
//         console.log(response[0].name);
//         for (let i = 0; i < response.length; i++)
//         container.innerHTML +=
//         '<div class="col-12 col-md-6">'+
//         '<article class="card">'+
//         '<img class=”card-img-top” src='+response[i].imageUrl+' alt=”...”>'+
//         '<div class="card-body">'+
//         '<h2>'+response[i].name+'</h2>'+
//         '</div>'+
//         '</article>'+
//         '</div>';
//     }
// };

// request.open("GET", "http://localhost:3000/api/cameras");
// request.send();