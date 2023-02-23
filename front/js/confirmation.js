const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("orderId");
//Appelle la fonction
displayResponseId();
//Afficher l'identifiant de la commande
function displayResponseId(){
    const displayOrderId = document.getElementById('orderId');
    displayOrderId.textContent = orderId;
    
}
