const socket = io();

function $(selector) {
    return document.querySelector(selector);
}

socket.on('statusError', data => {
    console.log(data);
    alert(data);
});

socket.on('publishProducts', data => {
    $('.products-box').innerHTML = '';

    let html = '';
    data.forEach(product => {
        html += `<div class="product-card">
                    <h3>${product.title}</h3>
                    <hr>
                    <p>Descripción: ${product.description}</p>
                    <p>Precio: $ ${product.price}</p>
                    <p>Stock: $ ${product.stock}</p>
                    <button id="button-delete" onclick="deleteProduct(${product.id})">Eliminar</button>
                </div>`;
    });

    $('.products-box').innerHTML = html;
});

function createProduct(event) {
    event.preventDefault();
    const newProduct = {
        title: $('#title').value,
        description: $('#description').value,
        price: $('#price').value,
        stock: $('#stock').value,
    }

    cleanForm();

    socket.emit('createProduct', newProduct);
}

function deleteProduct(pid) {
    socket.emit('deleteProduct', { pid });
}

function cleanForm() {
    $('#title').value = '';
    $('#description').value = '';
    $('#price').value = '';
    $('#stock').value = '';
}

function addProductToCart(pid) {
    socket.emit("addProductCart", {pid})
}