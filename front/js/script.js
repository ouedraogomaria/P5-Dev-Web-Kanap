// Faire un requette des produits à l' api et afficher les images de la page
fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => {
    for(let article of data){
      const product = `     
        <a href="./product.html?id=${article._id}">
        <article>
          <img src="${article.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1"${article.altTxt}">
          <h3 class="productName">${article.name}</h3>
          <p class="productDescription">${article.description}</p>
        </article>
      </a> 
      `;
     document.querySelector('#items').insertAdjacentHTML('beforeend', product);
    } 
 
    })
    
    .catch((error) => {
      alert('un probleme signalé', error)
    })

    
    

    
