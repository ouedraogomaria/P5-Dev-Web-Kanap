//Récupérer le produit dans le localStorage
const objetinlocalstorage = JSON.parse(localStorage.getItem('cart'));
//Apelle  des function d'affichage
displayItems();
displayTotalArticle()

//totalArticles();

async function getPrice(id){
 
  let result = await fetch('http://localhost:3000/api/products/'+id);
  let res = await result.json();
  let data = await res.price;
  
  return data;


}
//Utiliser la function pour afficher les produits du
async function displayItems(){
  for (const data of objetinlocalstorage) { 
    let price = await getPrice(data.id);
    const objet = `<article class="cart__item" data-id="${data.id}" data-color="${data.color}">
        <div class="cart__item__img">
        <img src="${data.src}" alt="${data.alt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${data.tilte}</h2>
            <p>${data.color}</p>
            <p>${price}€</p>
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

//Gestion de l'evenement supprimer  un produit
btnDeleteds = document.getElementsByClassName('deleteItem');
  for(let i= 0;i< btnDeleteds.length; i++){
    btnDeleteds[i].addEventListener('click', (e) => {
      e.preventDefault(); 
      //appelle à la fonction de suppression
      deleteItem(i);
    }) ;
  }
 
}

//Supprimer un produit dans la page panier
function deleteItem (itemIndex){
  objetinlocalstorage.splice(itemIndex,1)
   localStorage.setItem('cart', JSON.stringify(objetinlocalstorage));
 //Mise à jour de la page
   window.location.reload()
 }

//Calcul le total des articles du panier
 function displayTotalArticle(){
  let totalArticles = 0
  for(let item of objetinlocalstorage){ 
    totalArticles = totalArticles +parseInt(item.quantity);
  }
  document.querySelector('#totalQuantity').insertAdjacentHTML('beforeend', totalArticles)
}



