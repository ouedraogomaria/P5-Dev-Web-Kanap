const queryStringOrderId = window.location.search;
const urlParams = new URLSearchParams(queryStringOrderId);
const orderId = urlParams.get("orderId");

