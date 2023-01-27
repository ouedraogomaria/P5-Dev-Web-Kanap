// Faire un requette des produits a l' api etafficher les images de la page
fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => {
      for(let article of data){
        product= `     
        <a href="./product.html?id=${article._id}">
        <article>
          <img src="${article.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1${article.altTxt}">
          <h3 class="productName">Kanap name1${article.name}</h3>
          <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.${article.description}</p>
        </article>
      </a> 
      `;
      const section = document.querySelector('#items');
      section.insertAdjacentHTML('beforeend', product);
    } 
 
    })


