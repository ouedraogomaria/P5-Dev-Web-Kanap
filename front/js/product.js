// Recuperer le id et afficher une image avec son contenu
const queryString_url_id = window.location.search;
const urlParams = new URLSearchParams(queryString_url_id);
const id = urlParams.get("id");
console.log(id);

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((data) =>{
       afficherProduit (data)
       console.log(data)
       
  } )


  function afficherProduit (kanap){
  afficherImage(kanap.imageUrl, kanap.altTxt)
  afficherTitre(kanap.name)
  afficherDescription(kanap.description)
 /* afficherCouleurrs(kanap.colors)
  afficherPrix(kanap.price)*/
  console.log('la fonction afficher produits s execute');
  
}
function afficherTitre(name){
  document.querySelector('#title').innerHTML += `     
        <h1>${name}</h1>
        
      `
}
function afficherImage(imageUrl, altTxt){
  document.querySelector('.item__img').innerHTML += `
  <img src="${imageUrl}" alt="${altTxt}">
  `
}
function afficherDescription(description){
  document.querySelector('#description').innerHTML +=`
<p>${description}</p>`
}

  
 


    
   




  


  



    
