const URL = 'https://striveschool-api.herokuapp.com/api/product/';
const formTitle = document.getElementById('formTitle');
const btnAdd = document.getElementById('btnAdd');
const btnReset = document.getElementById('btnReset');
const btnLoad = document.getElementById('btnLoad');
const btnModify = document.getElementById('btnModify');
const btnDelete = document.getElementById('btnDelete');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const priceInput = document.getElementById('price');
const brandInput = document.getElementById('brand');
const imgUrlInput = document.getElementById('imageUrl');
const btnSelect = document.getElementById('btnSelect');
const carousel = document.getElementById('carousel');

let id;
let dataSelected;
let data = []; // Array per contenere i prodotti caricati

class myProduct {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

function setAddMode() {
  formTitle.textContent = 'Add Product';
  btnAdd.classList.remove('d-none');
  btnReset.classList.remove('d-none');
  btnLoad.classList.add('d-none');
  btnModify.classList.add('d-none');
  btnDelete.classList.add('d-none');
  resetForm();
}

function setModifyMode() {
  formTitle.textContent = 'Modify Product';
  btnAdd.classList.add('d-none');
  btnReset.classList.add('d-none');
  btnLoad.classList.remove('d-none');
  btnModify.classList.remove('d-none');
  btnDelete.classList.remove('d-none');
}

function resetForm() {
  document.getElementById('productForm').reset();
}

btnSelect.addEventListener('click', function () {
  const active = document.querySelector('div.active');
  const imgSelected = active.querySelector('img');
  const src = imgSelected.getAttribute('src');

  dataSelected = data.find((product) => product.imageUrl === src);

  if (dataSelected) {
    nameInput.value = dataSelected.name;
    descriptionInput.value = dataSelected.description;
    priceInput.value = dataSelected.price;
    brandInput.value = dataSelected.brand;
    imgUrlInput.value = dataSelected.imageUrl;
    id = dataSelected._id;
    setModifyMode();
  }
});

document.getElementById('productForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const newProduct = new myProduct(
    nameInput.value,
    descriptionInput.value,
    brandInput.value,
    imgUrlInput.value,
    priceInput.value
  );

  fetch(URL, {
    method: 'POST',
    body: JSON.stringify(newProduct),
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzEyNDA3ZGI3MzAwMTU0MDYzYjAiLCJpYXQiOjE3MzQwNzU5MjIsImV4cCI6MTczNTI4NTUyMn0.8rdgKxrJ4EVjgPnzdJnv0DEA72DdiXgarU0XPJu0G30',
    },
  })
    .then((response) => {
      if (response.ok) {
        alert('Product Added!');
        window.location.reload();
      } else {
        alert('Error adding product.');
      }
    })
    .catch((err) => console.error(err));
});

btnModify.addEventListener('click', function () {
  if (id) {
    const updatedProduct = new myProduct(
      nameInput.value,
      descriptionInput.value,
      brandInput.value,
      imgUrlInput.value,
      priceInput.value
    );

    fetch(URL + id, {
      method: 'PUT',
      body: JSON.stringify(updatedProduct),
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzEyNDA3ZGI3MzAwMTU0MDYzYjAiLCJpYXQiOjE3MzQwNzU5MjIsImV4cCI6MTczNTI4NTUyMn0.8rdgKxrJ4EVjgPnzdJnv0DEA72DdiXgarU0XPJu0G30',
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Product Modified!');
          window.location.reload();
        } else {
          alert('Error modifying product.');
        }
      })
      .catch((err) => console.error(err));
  } else {
    alert('Select a product first!');
  }
});

btnDelete.addEventListener('click', function () {
  if (id) {
    if (confirm('Are you sure you want to delete this product?')) {
      fetch(URL + id, {
        method: 'DELETE',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzEyNDA3ZGI3MzAwMTU0MDYzYjAiLCJpYXQiOjE3MzQwNzU5MjIsImV4cCI6MTczNTI4NTUyMn0.8rdgKxrJ4EVjgPnzdJnv0DEA72DdiXgarU0XPJu0G30',
        },
      })
        .then((response) => {
          if (response.ok) {
            alert('Product Deleted!');
            window.location.reload();
          } else {
            alert('Error deleting product.');
          }
        })
        .catch((err) => console.error(err));
    }
  } else {
    alert('Select a product first!');
  }
});

setAddMode();

function displayCarousel(products) {
  carousel.innerHTML = '';
  products.forEach((product, index) => {
    const activeClass = index === 0 ? 'active' : '';
    carousel.innerHTML += `
          <div class="carousel-item ${activeClass}">
            <img src="${product.imageUrl}" class="d-block w-100" height="450" alt="${product.name}">
          </div>`;
  });
}

// Load products into the carousel
fetch(URL, {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzEyNDA3ZGI3MzAwMTU0MDYzYjAiLCJpYXQiOjE3MzQwNzU5MjIsImV4cCI6MTczNTI4NTUyMn0.8rdgKxrJ4EVjgPnzdJnv0DEA72DdiXgarU0XPJu0G30',
  },
})
  .then((response) => response.json())
  .then((products) => {
    data = products;
    displayCarousel(products);
  })
  .catch((err) => console.error(err));
