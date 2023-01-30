// Recuperer l' id d'un produit à afficher
const queryString_url_id = window.location.search;
const urlParams = new URLSearchParams(queryString_url_id);
const id = urlParams.get("id");
console.log(id)

// Recuper les donnees des produits depuis l API
fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((data) =>{
       afficherProduit (data)

       
  } )

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
    

// Ajoutrer des produits dans le panier
const button = document.querySelector('#addToCart')
if (button != null){button.addEventListener('click', () => {

  // Récupérer  la couleur et de la quantité sélectionnées 
  const color = document.querySelector('#colors').value;
  const quantity = document.querySelector('#quantity').value;
  const tilte = document.querySelector('#title').textContent;
  const image = document.querySelector('.item__img').innerHTML;


  if (color === '') {
    alert('Choisir une couleur');
    return;
  }
  
  if (quantity < 1 || quantity > 100) {
    alert('choisir une quantité valide');
    return;
  }

  saveTocart(color, quantity, tilte, image)
});
}

//Enregistrer le produit dans le locaStorage
function saveTocart(color, quantity, tilte, image){
  const addToCart = {id, color, quantity,  tilte, image};

  localStorage.setItem(id, JSON.stringify(addToCart))

}
//Recuperer le produit dans le localStorage






    
   




  


  



    
