//Récupérer le produit dans le localStorage
const objetinlocalstorage = JSON.parse(localStorage.getItem('cart'));
//Appelle  les fonction d'affichage
displayItems();
displayTotalArticle();
displayTotalPrice();
//creation de variables pour mettre les valeurs et les quantités des produits dans le panier
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
 

//Recupération des elements du formulaire
const form = document.querySelector('.cart__order__form');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const address = document.querySelector('#address');
const city = document.querySelector('#city');
const email = document.querySelector('#email');
let formVerified = true;
//Gestion de l'evenement du formulaire
form.addEventListener('submit', (e) =>{
  e.preventDefault();
  
  verifyForm();
  if(formVerified === true){
    formVerified.innerText = 'du code qui s execute';
    let products = [];
    //definir les proprietes de contacts
    contact.firstName = firstName.value.trim();
    
    validateOrder(contact, products);
  }


});

 //Fonction 
function verifyForm(){
  
  //Recuperation des valeurs des inputs
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const addressValue = address.value.trim();
  const cityValue = city.value.trim();
  const emailValue = email.value.trim();

  //verification de la validité du prenom
  if(firstNameValue === ""){
    const firstMsgError = document.querySelector('#firstNameErrorMsg');
    firstMsgError.innerText = 'Ce champ ne peut pas être vide';
  
  }else if(!firstNameValue.match(/^[a-zA-Z-\s]+$/)){
    const firstMsgError = document.querySelector('#firstNameErrorMsg');
    firstMsgError.innerText = 'ce champ ne doit pas contenir des chiffres';
  }else{
    const firstMsgError = document.querySelector('#firstNameErrorMsg');
    firstMsgError.innerText = '';
  }

  //verification de la validité du nom
  if(lastNameValue === ""){
    const lastMsgError = document.querySelector('#lastNameErrorMsg');
    lastMsgError.innerText = 'Ce champ ne peut pas être vide';
  }else if(!lastNameValue.match(/^[a-zA-Z-\s]+$/)){
    const lastMsgError = document.querySelector('#lastNameErrorMsg');
    lastMsgError.innerText = 'ce champ ne doit pas contenir des chiffres';
  }else{
    const lastMsgError = document.querySelector('#lastNameErrorMsg');
    lastMsgError.innerText = '';
  }

  
    //verification de la validité de l'adresse
  if(addressValue === ""){
    const addressMsgError = document.querySelector('#addressErrorMsg');
    addressMsgError.innerText = 'Ce champ ne peut pas être vide';
  }else{
    const addressMsgError = document.querySelector('#addressErrorMsg');
    addressMsgError.innerText = '';
  }

  //verification de la validité de la ville
  if(cityValue === ""){
    const cityMsgError = document.querySelector('#cityErrorMsg');
    cityMsgError.innerText = 'Ce champ ne peut pas être vide';
  }else{
    const cityMsgError = document.querySelector('#cityErrorMsg');
    cityMsgError.innerText = '';
  }
  //verification de la validité de la ville
  if(emailValue === ""){
    const emailMsgError = document.querySelector('#emailErrorMsg');
    emailMsgError.innerText = 'Ce champ ne peut pas être vide';
    formVerified = false;
  }else if(!emailValue.match(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/)){
    const emailMsgError = document.querySelector('#emailErrorMsg');
    emailMsgError.innerText = 'ce champ doit contenir @';
    formVerified = false;
  }else{
    const emailMsgError = document.querySelector('#emailErrorMsg');
    emailMsgError.innerText = '';
    formVerified = true;
  }
 }

 
function validateOrder(contact, products){

  fetch("http://localhost:3000/api/orders",
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({contact: contact, products: products})
  })
  .then(function(res){ console.log(res) })
  .catch(function(error){ console.log(error) })
}