//Récupérer le produit sous forme d'objet
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


function arrayProduct (items) {
 

   const h2 = document.createElement('h2');
   h2.textContent = items.tilte;

   const colors = document.createElement('p');
   colors.textContent = items.color;

   const p = document.createElement('p');
   p.textContent = items.price;

   document.querySelector('.cart__item__content__description').appendChild(h2, colors, p);


}