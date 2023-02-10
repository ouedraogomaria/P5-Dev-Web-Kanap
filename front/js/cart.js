//Récupérer le produit dans le localStorage
const objetinlocalstorage = JSON.parse(localStorage.getItem('cart'));
//Création des function d'affichage
displayItems();
removeObjet();
function getPrice(id){
 
  fetch('http://localhost:3000/api/products/'+id)
   
  .then((response) => response.json())
  .then((data) => {
    
    return data.price;
  
  });
  

}
//Appelle la function pour afficher les produits du
function displayItems(){

  for (let data of objetinlocalstorage) { 
    
    const objet = `<article class="cart__item" data-id="${data.id}" data-color="${data.color}">
        <div class="cart__item__img">
        <img src="${data.src}" alt="${data.alt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${data.tilte}</h2>
            <p>${data.color}</p>
            <p>${getPrice(data.price)}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${data.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;

      document.querySelector('#cart__items').insertAdjacentHTML('beforeend', objet);
}

 
  }
  
//Supprimer un produit dans la page panier
function removeObjet(){

  //Gestion de la suppression d'un produit
  const btndeleded = document.querySelector('.deleteItem');
  btndeleded.addEventListener('click', (e) => {
    e.preventDefault(); 

    //Appelle à l'id et la couleur à supprimer
    let deledeId = objetinlocalstorage.id;
  
    
    objetinlocalstorage = objetinlocalstorage.filter(
      (product) => product.id !== deledeId );

    localStorage.setItem('cart', JSON.stringify(objetinlocalstorage));
    
  }) ; 
}


