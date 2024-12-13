const URL = 'https://striveschool-api.herokuapp.com/api/product/';
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const priceInput = document.getElementById('price');
const brandInput = document.getElementById('brand');
const imgUrlInput = document.getElementById('imageUrl');
const btnAdd = document.getElementById('btnAdd');
const btnReset = document.getElementById('btnReset');
const btnLoad = document.getElementById('btnLoad');
const btnModify = document.getElementById('btnModify');
const btnDelete = document.getElementById('btnDelete');
const formTitle = document.getElementById('formTitle');
const carouselInner = document.getElementById('carousel');
const btnSelect = document.getElementById('btnSelect');
let id;

// Funzione per ottenere l'ID del prodotto dalla query string dell'URL
function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('productId');
}

// Funzione per resettare il modulo
function resetForm() {
  nameInput.value = '';
  descriptionInput.value = '';
  priceInput.value = '';
  brandInput.value = '';
  imgUrlInput.value = '';
}

// Funzione per passare alla modalità di aggiunta
function setAddMode() {
  formTitle.textContent = 'Add Product';
  btnAdd.classList.remove('d-none');
  btnReset.classList.remove('d-none');
  btnLoad.classList.add('d-none');
  btnModify.classList.add('d-none');
  btnDelete.classList.add('d-none');
}

// Funzione per passare alla modalità di modifica
function setModifyMode() {
  formTitle.textContent = 'Modify Product';
  btnAdd.classList.add('d-none');
  btnReset.classList.add('d-none');
  btnLoad.classList.remove('d-none');
  btnModify.classList.remove('d-none');
  btnDelete.classList.remove('d-none');
}

// Controlla se esiste un prodotto da modificare tramite la query string
const productId = getProductIdFromUrl();
if (productId) {
  // Carica i dati del prodotto e imposta la modalità modifica
  fetch(`${URL}${productId}`, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzEyNDA3ZGI3MzAwMTU0MDYzYjAiLCJpYXQiOjE3MzQwNzU5MjIsImV4cCI6MTczNTI4NTUyMn0.8rdgKxrJ4EVjgPnzdJnv0DEA72DdiXgarU0XPJu0G30', // sostituisci con la tua chiave API
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Errore nel recupero del prodotto.');
      }
    })
    .then((product) => {
      nameInput.value = product.name;
      descriptionInput.value = product.description;
      priceInput.value = product.price;
      brandInput.value = product.brand;
      imgUrlInput.value = product.imageUrl;
      id = product._id;
      setModifyMode(); // Passa alla modalità di modifica
    })
    .catch((err) => {
      console.error(err);
      alert('Errore nel caricamento del prodotto.');
    });
} else {
  // Passa in modalità aggiunta
  setAddMode();
}

// Aggiungi un nuovo prodotto
btnAdd.addEventListener('click', function (e) {
  e.preventDefault();
  const newProduct = {
    name: nameInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
    brand: brandInput.value,
    imageUrl: imgUrlInput.value,
  };

  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzEyNDA3ZGI3MzAwMTU0MDYzYjAiLCJpYXQiOjE3MzQwNzU5MjIsImV4cCI6MTczNTI4NTUyMn0.8rdgKxrJ4EVjgPnzdJnv0DEA72DdiXgarU0XPJu0G30', // sostituisci con la tua chiave API
    },
    body: JSON.stringify(newProduct),
  })
    .then((response) => {
      if (response.ok) {
        alert('Prodotto aggiunto con successo!');
        window.location.href = 'index.html';
      } else {
        throw new Error("Errore durante l'aggiunta del prodotto.");
      }
    })
    .catch((err) => console.error(err));
});

// Modifica un prodotto esistente
btnModify.addEventListener('click', function (e) {
  e.preventDefault();
  const updatedProduct = {
    name: nameInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
    brand: brandInput.value,
    imageUrl: imgUrlInput.value,
  };

  fetch(`${URL}${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzEyNDA3ZGI3MzAwMTU0MDYzYjAiLCJpYXQiOjE3MzQwNzU5MjIsImV4cCI6MTczNTI4NTUyMn0.8rdgKxrJ4EVjgPnzdJnv0DEA72DdiXgarU0XPJu0G30', // sostituisci con la tua chiave API
    },
    body: JSON.stringify(updatedProduct),
  })
    .then((response) => {
      if (response.ok) {
        alert('Prodotto modificato con successo!');
        window.location.href = 'index.html'; // Reindirizza alla pagina principale dopo la modifica
      } else {
        throw new Error('Errore nella modifica del prodotto.');
      }
    })
    .catch((err) => console.error(err));
});

// Elimina un prodotto
btnDelete.addEventListener('click', function (e) {
  e.preventDefault();
  if (confirm('Sei sicuro di voler eliminare questo prodotto?')) {
    fetch(`${URL}${id}`, {
      method: 'DELETE',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzEyNDA3ZGI3MzAwMTU0MDYzYjAiLCJpYXQiOjE3MzQwNzU5MjIsImV4cCI6MTczNTI4NTUyMn0.8rdgKxrJ4EVjgPnzdJnv0DEA72DdiXgarU0XPJu0G30', // sostituisci con la tua chiave API
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Prodotto eliminato con successo!');
          window.location.href = 'index.html';
        } else {
          throw new Error("Errore nell'eliminazione del prodotto.");
        }
      })
      .catch((err) => console.error(err));
  }
});

// Ricarica i prodotti e visualizzali nel carosello
btnLoad.addEventListener('click', function () {
  fetch(URL, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzEyNDA3ZGI3MzAwMTU0MDYzYjAiLCJpYXQiOjE3MzQwNzU5MjIsImV4cCI6MTczNTI4NTUyMn0.8rdgKxrJ4EVjgPnzdJnv0DEA72DdiXgarU0XPJu0G30', // sostituisci con la tua chiave API
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Errore nel recupero dei prodotti.');
      }
    })
    .then((products) => {
      console.log(products);
      if (products.length === 0) {
        alert('Nessun prodotto disponibile!');
        return;
      }

      // Pulisce il carosello prima di aggiungere nuovi prodotti
      carouselInner.innerHTML = '';

      // Aggiungi le immagini al carosello
      products.forEach((product, index) => {
        const isActive = index === 0 ? 'active' : ''; // Imposta la classe 'active' sulla prima immagine

        const carouselItem = document.createElement('div');

        // Aggiungi la classe 'carousel-item' e solo se isActive non è vuoto, aggiungi 'active'
        carouselItem.classList.add('carousel-item');
        if (isActive) {
          carouselItem.classList.add(isActive);
        }

        const img = document.createElement('img');
        img.src = product.imageUrl;
        img.classList.add('d-block', 'w-100');
        img.alt = product.name;

        // Aggiungi un event listener per il click sull'immagine
        img.addEventListener('click', function () {
          // Reindirizza alla pagina backoffice.html con l'ID del prodotto
          window.location.href = `backoffice.html?productId=${product._id}`;
        });

        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
      });

      // Mostra la modale con il carosello
      const modal = new bootstrap.Modal(
        document.getElementById('staticBackdrop')
      );
      modal.show();
    })
    .catch((err) => {
      console.error(err);
      alert('Errore nel caricamento dei prodotti.');
    });
});

// Resetta il modulo
btnReset.addEventListener('click', function () {
  resetForm();
});
