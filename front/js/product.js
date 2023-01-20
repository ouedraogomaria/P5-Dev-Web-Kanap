// Recuperer le id et afficher une image avec son contenu
const queryString_url_id = window.location.search;
const urlParams = new URLSearchParams(queryString_url_id);
const id = urlParams.get("id");
console.log(id);

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((data) =>{
       afficherProduit (data)
       console.log(data)
       
  } )


  function afficherProduit  (kanap)  {
  madeImage(kanap.imageUrl, kanap.altTxt)
  madeTilte(kanap.name)
  madeDescription(kanap.description)
  madeColors(kanap.colors)
  madePrice(kanap.price)
  
}
  
 
function madeImage (kanap.altTxt,kanap.imageUrl) {
  kanap.altTxt = document.createElement("img")
  kanap.imageUrl
  const parent = document.querySelector("item__img")
  if (parent!= null) parent.appendChild(image)

}
function madeTilte(tilte) {
   const h1 = document.querySelector("#tilte")

} 

    
   




  


  



    
