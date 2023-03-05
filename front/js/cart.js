//Récupérer le produit dans le localStorage
const objetInlocalstorage = JSON.parse(localStorage.getItem('cart'));

//Appelle  les fonction d'affichage si le panier contient au moins un produit
if(objetInlocalstorage != null){
  displayItems();
  displayTotalArticle();
  displayTotalPrice();
}

//Fonction pour récuperer le prix d'un produit
async function getPrice(id){
 
  let result = await fetch('http://localhost:3000/api/products/'+id);
  let res = await result.json();
  let data = await res.price;
  return data;
}

//Fonction pour afficher les produits 
async function displayItems(){
  for (let data of objetInlocalstorage) { 
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

//Fonction Supprimer un produit dans la page panier
function deleteItem (itemIndex){
  objetInlocalstorage.splice(itemIndex,1)
  localStorage.setItem('cart', JSON.stringify(objetInlocalstorage));
 //Mise à jour de la page
   window.location.reload()
}

 //Fonction de mise à jour de la quantité des articles dans le panier
function addQuantity (itemIndex){
  const quantity = quantityBtns[itemIndex].value;
  objetInlocalstorage[itemIndex].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(objetInlocalstorage));
    window.location.href = "cart.html"
}

//Fonction de Calcul du total des articles dans le panier
 function displayTotalArticle(){
  let totalArticles = 0
  for(let item of objetInlocalstorage){ 
    totalArticles = totalArticles +parseInt(item.quantity);
  }
  document.querySelector('#totalQuantity').insertAdjacentHTML('beforeend', totalArticles)
}

//Fonction de Calcul du total du prix des articles dans le panier
async function displayTotalPrice(){
  let totalPrice = 0
  for(let item of objetInlocalstorage){
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

const btnOrder = document.getElementById('order');
let input = document.querySelector('input');
let formIsValid = true;
//Gestion de l'evenement du firstName
form.firstName.addEventListener('change', function() {
  verifyFirstName(); 
})
//verification de la validité du prenom
function verifyFirstName(){
  const firstNameValue = firstName.value.trim();
  if(firstNameValue === ""){
    const firstMsgError = document.querySelector('#firstNameErrorMsg');
    firstMsgError.innerText = 'Ce champ ne peut pas être vide';
    formIsValid = false;
    return;
  }else if(!firstNameValue.match(/^[a-zA-Z-\s]+$/)){
    const firstMsgError = document.querySelector('#firstNameErrorMsg');
    firstMsgError.innerText = 'ce champ ne doit pas contenir des chiffres';
    formIsValid = false;
    return;
  }else{
    const firstMsgError = document.querySelector('#firstNameErrorMsg');
    firstMsgError.innerText = '';
    //formIsValid = true;
  }
  
}

//Gestion de l'evenement du lastName
form.lastName.addEventListener('change',function(){
  verifyLastName();
})

//verification de la validité du nom
function verifyLastName(){
  const lastNameValue = lastName.value.trim();
  if(lastNameValue === ""){
    const lastMsgError = document.querySelector('#lastNameErrorMsg');
    lastMsgError.innerText = 'Ce champ ne peut pas être vide';
    formIsValid = false;
    return;
  }else if(!lastNameValue.match(/^[a-zA-Z-\s]+$/)){
    const lastMsgError = document.querySelector('#lastNameErrorMsg');
    lastMsgError.innerText = 'ce champ ne doit pas contenir des chiffres';
    formIsValid = false;
    return;
  }else{
    const lastMsgError = document.querySelector('#lastNameErrorMsg');
    lastMsgError.innerText = '';
   // formIsValid = true;
  }
}

//Gestion de l'evenement de l'adresse
form.address.addEventListener('change',function(){
  verifyAddress();
})
//verification de la validité de address
function verifyAddress(){
  const addressValue = address.value.trim();
    if(addressValue === ""){
      const addressMsgError = document.querySelector('#addressErrorMsg');
      addressMsgError.innerText = 'Ce champ ne peut pas être vide';
      formIsValid = false;
    return;
    }else{
      const addressMsgError = document.querySelector('#addressErrorMsg');
      addressMsgError.innerText = '';
     // formIsValid = true;

    }
}

//Gestion de l'evenement de city
form.city.addEventListener('change',function(){
  verifyCity();
})
//verification de la validité de la ville
function verifyCity(){
  const cityValue = city.value.trim();
  if(cityValue === ""){
    const cityMsgError = document.querySelector('#cityErrorMsg');
    cityMsgError.innerText = 'Ce champ ne peut pas être vide';
    formIsValid = false;
    return;
  }else{
    const cityMsgError = document.querySelector('#cityErrorMsg');
    cityMsgError.innerText = '';
   // formIsValid = true;
    
  }
  
}

//Gestion de l'evenement de email
form.email.addEventListener('change',function(){
  verifyEmail();
})

//verification de la validité de la ville
function verifyEmail() {
  const emailValue = email.value.trim();
  if(emailValue === ""){
    const emailMsgError = document.querySelector('#emailErrorMsg');
    emailMsgError.innerText = 'Ce champ ne peut pas être vide';
    formIsValid = false;
    return;
  }else if(!emailValue.match(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/)){
    const emailMsgError = document.querySelector('#emailErrorMsg');
    emailMsgError.innerText = 'ce champ doit contenir @';
    formIsValid = false;
    return;
  }else{
    const emailMsgError = document.querySelector('#emailErrorMsg');
    emailMsgError.innerText = '';
    //formIsValid = true;
  }
}

//Gestion de l'envoie de la commande
btnOrder.addEventListener('click', (e) =>{
 e.preventDefault();

  formIsValid = true;
  //Appelle la fonction de validité du formulaire
  verifyFirstName();
  verifyLastName();
  verifyAddress();
  verifyCity();
  verifyEmail();
  verifyForm();

  //Recuperation des données du formulaire de l'objet contact et product
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value
  } 

  let product = JSON.parse(localStorage.getItem('cart'));
  //Déclarer un tableau vide 
  let products = [];
  //Parcourir la liste de produits à envoyée
  for(product of objetInlocalstorage){
    products.push(product.id);
  }
//Appelle la fontion
  validateOrder(contact, products);
})

//Fonction pour verifier le formulaire avant validation de la commande
function verifyForm() {
  const inputs = form.querySelectorAll('input');
  inputs.forEach((input) =>{
    if(input.value === "" || input.value === undefined){
      formIsValid = false;
   }     
 })
 if(!formIsValid){
      alert ('Veuillez bien renseigner tous les champs');
      return;
    }
}

//Fonction de validation de la commande
function validateOrder(contact, products){
  if(formIsValid){
    fetch("http://localhost:3000/api/products/order",{ 
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      
    body: JSON.stringify({contact: contact,products: products})
  })
  .then((res) => res.json())
  .then((data) =>{
    const orderId = data.orderId;
    window.location.href = "./confirmation.html?orderId=" +orderId;
    localStorage.clear();
  })
  .catch((error) => {
    alert('votre commande est invalide', error)
  });
  }
  
}
