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

// Inserer l'image d'un produit et ses details  
function afficherProduit (kanap){
  //afficherCouleurs(kanap.colors)
  const title = document.createElement('h1');
  title.textContent= kanap.name;
  document.querySelector('#title').appendChild(title);

  
  const Description = document.createElement('p');
  Description.textContent = kanap.description;
  document.querySelector('#description').appendChild(Description);

  const image = document.createElement('img');
  image.src = kanap.imageUrl;
  image.alt = kanap.altTxt;
  document.querySelector('.item__img').appendChild(image);

  const price = document.createElement('span');
  price.textContent = kanap.price;
  document.querySelector('#price').appendChild(price);
  
  for (let option of kanap.colors) {
    option = `<option value="vert">${option}</option>`;

    document.querySelector('#colors').insertAdjacentHTML('beforeend', option);
  }
  
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
  saveTocart(color, quantity, title, )
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







    
   




  


  



    
