//Récupérer le produit dans le localStorage
const objetinlocalstorage = JSON.parse(localStorage.getItem('cart'));
//Appelle  les fonction d'affichage
displayItems();
displayTotalArticle();
displayTotalPrice();
//creation d'un tableau qui va contenir les nouvelles valeurs des produits
let btnDeleteds = [];
let quantityBtns = []; 

async function getPrice(id){
 
  let result = await fetch('http://localhost:3000/api/products/'+id);
  let res = await result.json();
  let data = await res.price;
  
  return data;


}
//Utiliser la function pour afficher les produits du
async function displayItems(){
  for (let data of objetinlocalstorage) { 
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
 
 //Gestion de l'evenement de mise à jour de la quantité 
  quantityBtns = document.getElementsByClassName('itemQuantity');
  for(let i= 0; i< quantityBtns.length ;i++ ){ 
   quantityBtns[i].addEventListener('change', () => { 
  //appelle à la fonction pour mettre à jour la quantité
    addQuantity(i);
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

 //Mise à jour de la quantité des articles dans le panier
function addQuantity (itemIndex){
  const quantity = quantityBtns[itemIndex].value;
  objetinlocalstorage[itemIndex].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(objetinlocalstorage));
    window.location.href = "cart.html"
}

//Calcul le total des articles du panier
 function displayTotalArticle(){
  let totalArticles = 0
  for(let item of objetinlocalstorage){ 
    totalArticles = totalArticles +parseInt(item.quantity);
  }
  document.querySelector('#totalQuantity').insertAdjacentHTML('beforeend', totalArticles)
}

//Calculer le total du prix des articles du panier
async function displayTotalPrice(){
  let totalPrice = 0
  for(let item of objetinlocalstorage){
    //recupreration du prix d'un produit
    let price = await getPrice(item.id); 
    totalPrice = totalPrice + parseFloat(price)*parseInt(item.quantity); 
  }
  document.querySelector('#totalPrice').insertAdjacentHTML('beforeend', totalPrice);
}

//Gestion de l'evenement du formulaire de saisie
const btnOrder = document.getElementById('order');
btnOrder.addEventListener('submit', (e) => {
  e.preventDefault();
  // Apelle les fonctions de vérification du formulaire
  firstNameValid();
  lastNameValid();
  addressValid();
  cityValid();
  emailValid();
});

// Vérification de la validité du prenom dans le champ de saisie
function firstNameValid(){ 
  let  FirstNameError = document.getElementById('firstNameErrorMsg');
  let firstName = firstName.value;
  let myRegex = (/^[a-zA-Z-\s]+$/);

  if (firstName === ''){
  let  FirstNameError = document.getElementById('firstNameErrorMsg');
    FirstNameError.textContent = 'ce champ ne peut pas être vide';
  }
  else if(myRegex.test(firstName.value == false)){
    FirstNameError.textContent = 'ce champ ne peut pas contenir de chiffres';
  } 
}


