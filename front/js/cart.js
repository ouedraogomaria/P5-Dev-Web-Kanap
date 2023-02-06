//Récupérer le produit dans le localStorage
const cart = []
Itemscach()

function Itemscach(){
    const numberofItems = localStorage.length
    for(i = 0 ; i < numberofItems; i++){
        const Item = localStorage.getItem(localStorage.key(i))
        const objetItem  = JSON.parse(Item)
        cart.push(objetItem)
    }
}
//Affichage du produit dans la page panier

  for (let data of cart) {
    const objet = `<article class="cart__item" data-id="${data.id}" data-color="${data.color}">
        <div class="cart__item__img">
        <img src="${data.src}" alt="${data.alt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${data.tilte}</h2>
            <p>${data.color}</p>
            <span>${data.price}  €</span>
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

