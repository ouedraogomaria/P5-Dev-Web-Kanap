// Recuperer l' id d'un produit à afficher
const queryString_url_id = window.location.search;
const urlParams = new URLSearchParams(queryString_url_id);
const id = urlParams.get("id");

// Recuper les donnees des produits depuis l API
fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((data) =>{
       afficherProduit (data)

       
  } )

  
function afficherProduit (kanap){
  afficherImage(kanap.imageUrl, kanap.altTxt)
  afficherTitre(kanap.name)
  afficherDescription(kanap.description)
  afficherCouleurs(kanap.colors)
  afficherPrix(kanap.price)
  
}

// Inserer l'image d'un produit et ses details 
function afficherTitre(name){
  document.querySelector('#title').innerHTML = `     
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

function afficherCouleurs(colors){
  const select = document.querySelector('#colors')
  if (select != null) {
    colors.forEach( (color) => {
      const option = document.createElement('option')
      option.value = color
      option.textContent = color
      select.appendChild(option)
    })
  }
  
}

function afficherPrix(Price){
  document.querySelector('#price').innerHTML +=`
   <span>${Price}</span> `
}

// Ajoutrer des produits dans le panier
const button = document.querySelector('#addToCart')
if (button != null){button.addEventListener('click', () => {

  // Récupérer  la couleur et de la quantité sélectionnées 
  const color = document.querySelector('#colors').value;
  const quantity = document.querySelector('#quantity').value;


  if (color === '') {
    alert('Choisir une couleur');
    return;
  }
  
  if (quantity < 1 || quantity > 100) {
    alert('choisir une quantité valide');
    return;
  }

  
  window.location.href = "./cart.html"
  saveTocart(color, quantity)
});
}

//Enregistrer le produit dans le locaStorage
function saveTocart(colors, quantity){
  const addToCart = {
    id: id,
    color:  colors,
    quantity: quantity,
  };

  localStorage.setItem(id, JSON.stringify(addToCart))

}
//Recuperer le produit dans le localStorage
function getToCart(){
  const cart = localStorage.getItem('cart');
  if(cart == null) {
    return[];
  }else {
    return JSON.parse('cart');
  }
}






    
   




  


  



    
