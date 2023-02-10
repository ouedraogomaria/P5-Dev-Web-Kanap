// Recuperer l' id d'un produit à afficher
const queryString_url_id = window.location.search;
const urlParams = new URLSearchParams(queryString_url_id);
const id = urlParams.get("id");


// Recuper les donnees des produits depuis l API
fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((data) =>{
       afficherProduit (data)

       
  })
  .catch((error) => {
    alert('alert probleme', error)
  });

// Inserer l'image d'un produit et ses details  
function afficherProduit (kanap){
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
  
  for (let value of kanap.colors) {
    value = `<option value="${value}">${value}</option>`;

    document.querySelector('#colors').insertAdjacentHTML('beforeend', value);
  }
  
}    
    

//Gestion  des produits dans le panier
const button = document.querySelector('#addToCart');
button.addEventListener('click', (e) => {
e.preventDefault();
 // Récupérer  les valeurs pour mettre dans le localStorage
  const color = document.querySelector('#colors').value;
  const quantity = document.querySelector('#quantity').value;
  const tilte = document.querySelector('#title').textContent;
  const src = document.querySelector('.item__img img').getAttribute('src');
  const alt = document.querySelector('.item__img img').getAttribute('alt');

  if (color=== '') {
    alert('Choisir une couleur');
    return;
  }
  
  if (quantity < 1 || quantity > 100) {
    alert('choisir une quantité valide');
    return;
  }
  
  //Ajout de la function AddTocart

  AddTocart(color, quantity, tilte, src, alt)
});

//Enregistrer le produit dans le locaStorage
function AddTocart(color, quantity, tilte, src, alt){
  const objetKanap = {id, color, quantity,  tilte, src, alt};
  localStorage.setItem('objetkanap', JSON.stringify(objetKanap));

  // Récupérer le panier dans le localstorage
  const cart = localStorage.getItem('cart') != undefined ? JSON.parse(localStorage.getItem('cart')): [];

  //ajout un produit
  if (cart.length >= 0) {
    cart.push(objetKanap);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('ajouté au panier');
  }
  //si le produit existe dans le panier mettre à jour la quantité
  let foundProduct = cart.find(p =>p.id === objetKanap.id);
  if(foundProduct != undefined){
    foundProduct.quantity ++;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  
    
}







    
   




  

  



