// Recupérer l'OrderId de la commande
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("orderId");

displayResponseId(orderId);
//Fonction d'afffichage de  l'identifiant de la commande
function displayResponseId(orderId){
  const p = document.createElement('span');
  p.textContent = orderId;
  document.querySelector('#orderId').appendChild(p);
  
}
