const orderId = JSON.parse(localStorage.getItem('orderId'));
//Afficher l'identifiant de la commande

const displayOrderId = document.getElementById('orderId');
displayOrderId.textContent = orderId;
