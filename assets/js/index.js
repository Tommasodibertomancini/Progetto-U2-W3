const articlesRow = document.getElementById('articlesRow');
const URL = 'https://striveschool-api.herokuapp.com/api/product/';
let carrello = JSON.parse(localStorage.getItem('cart'));
let cart = document.getElementById('cart');
const spinner = document.getElementById('spinner');

const createCart = function (array) {
  cart.innerHTML = '';
  for (let j = 0; j < array.length; j++) {
    const divImg = document.createElement('div');
    divImg.classList.add('col-2');
    const img = document.createElement('img');
    img.setAttribute('src', array[j].imageUrl);
    img.classList.add('w-100');
    const divText = document.createElement('div');
    divText.classList.add('col-8');
    const title = document.createElement('h6');
    title.innerText = array[j].name;
    const price = document.createElement('p');
    price.innerText = `${array[j].price} $`;
    const divButton = document.createElement('div');
    divButton.classList.add('col-2');
    const btnErase = document.createElement('button');
    btnErase.classList.add('btn', 'btn-danger');
    btnErase.innerText = 'X';
    btnErase.addEventListener('click', function () {
      array[j].count = 1;
      array.splice(j, 1);
      cart.innerHTML = '';
      createCart(array);
      localStorage.setItem('cart', JSON.stringify(array));
    });
    divButton.appendChild(btnErase);
    divText.appendChild(title);
    divText.appendChild(price);
    divImg.appendChild(img);
    cart.appendChild(divImg);
    cart.appendChild(divText);
    cart.appendChild(divButton);
  }
  let total = array.reduce(function (acc, element) {
    return acc + element.price;
  }, 0);
  const totalShow = document.createElement('h5');
  totalShow.innerText = `Your total cart is: ${total.toFixed(2)} $`;
  cart.appendChild(totalShow);
};

if (carrello) {
  createCart(carrello);
} else {
  carrello = [];
}
const retrieveArticles = function () {
  fetch(URL, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzEyNDA3ZGI3MzAwMTU0MDYzYjAiLCJpYXQiOjE3MzQwNzU5MjIsImV4cCI6MTczNTI4NTUyMn0.8rdgKxrJ4EVjgPnzdJnv0DEA72DdiXgarU0XPJu0G30',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Qualcosa è andato storto');
      }
    })
    .then((data) => {
      console.log(data);
      spinner.classList.add('d-none');
      data.forEach((element) => {
        let description = '';
        let more = '';
        if (element.description.length > 50) {
          description = element.description.slice(
            0,
            element.description.indexOf(' ', 50)
          );
          more = ' ... See more';
        } else {
          description = element.description;
          more = '';
        }
        const newProductCol = `
            <div class="col">
                <div class="card">
                    <img src="${element.imageUrl}" class="card-img-top img-fluid" alt="...">
                    <div class="card-body text-center">
                        <h5 class="card-title">${element.name}</h5>
                        <h6 class="card-title">${element.brand}</h6>
                        <p class="card-text">${description}<span class='fw-bold'>${more}</span></p>
                        <a href="details.html?productId=${element._id}" class="btn w-50 btn-details">DETAILS</a>
                        <a href="backoffice.html?productId=${element._id}" class="btn w-50 btn-reset mt-2">EDIT</a>
                    </div>
                </div>
            </div> `;
        articlesRow.innerHTML += newProductCol;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

retrieveArticles();
