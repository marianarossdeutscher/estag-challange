const urlProducts = `http://localhost/routes/product.php`;
const urlCategories = `http://localhost/routes/category.php`;
const urlOrderItem = `http://localhost/routes/orderItems.php`;

const formProducts = document.getElementById('product-form');
formProducts.addEventListener('submit', (e) => handleSubmit(e));

function handleSubmit(e) {
    e.preventDefault();
    if(validateFields()) {
        addProduct();
    }
}

async function addProduct() {
    const response = await fetch(urlProducts);
    const productsList = await response.json();
    let productName = document.getElementById('prod-name').value;
    let canAdd = true;

    productsList.forEach(product => {
        if(product.name == productName.toUpperCase()) {
            canAdd = false;
        }
    });

    if(canAdd) {
        const formData = new FormData(formProducts);
    
        try {
            const response = fetch(urlProducts, {
                method: "POST",
                body: formData
            })
            .then(data => {
                alert("Product added successfully!");
            })
            .then((response) => {
                window.location.reload();
            });
        } catch (error) {
            alert(error.message);
        }
    } else {
        alert("There is already a product registered under that name.");
    }
    window.location.reload();
}

async function listTable() {
    const tbody = document.getElementById('tbody-products');
    const response = await fetch(urlProducts);
    const productsList = await response.json();
    tbody.innerHTML = '';

    productsList.forEach((product) => {
        const tr = document.createElement("tr");
        
        tr.innerHTML = `<tr>
        <td>${product.code}</td>
        <td>${product.name}</td>
        <td>${product.amount}</td>
        <td>$${product.price}</td>
        <td>${product.category_code}</td>
        <td><button class="button" id="button-delete" onclick=deleteProduct(${product.code})>Delete</td>
        </tr>`
        tbody.appendChild(tr);
    });
}
listTable();

async function populateSelect() {
    const response = await fetch(urlCategories);

    if(response) {
        const categoriesList = await response.json();
        const select = document.getElementById('category');
        categoriesList.forEach((category) => {
            select.innerHTML += `<option value="${category.code}">${category.name}</option>`
        });
    }
}
populateSelect();

async function deleteProduct(code) {
    const response = await fetch(urlOrderItem);
    const ordersList = await response.json();
    let cantDelete = false;

    ordersList.forEach(item => {
        if(item.product_code == code) {
            cantDelete = true;
        }
    })

    if(cantDelete) {
        alert("Cannot delete the category because it has a product allocated to it.");
    } else {
        if(confirm("Delete product?")) {
            try {
                const response = await fetch(`http://localhost/routes/product.php?code=${code}`, {
                    method: "DELETE"
                }).then((response) => {
                    window.location.reload();
                })
            } catch (error) {
                console.log(error.message);
            }
        }
    }
}

function validateFields() {
    let isValid = true;

    const nameProduct = document.getElementById('prod-name').value; 
    const amountProduct = document.getElementById('prod-amount').value;
    const unitPrice = document.getElementById('unit-price-product').value;
    const category = document.getElementById('category').value;
    const nameInput = document.getElementById('prod-name');
    const amountInput = document.getElementById('prod-amount');
    const unitPriceInput = document.getElementById('unit-price-product');
    const selectInput = document.getElementById('category');
    const nameError = nameInput.nextElementSibling;
    const amountError = amountInput.nextElementSibling;
    const unitPriceError = unitPriceInput.nextElementSibling;
    const selectError = selectInput.nextElementSibling;

    const nameRegex = /^(?!\s*$).+[A-Za-z0-9_]+$/;
    if (!nameRegex.test(nameProduct)) {
        nameInput.classList.add('invalid');
        nameError.textContent = 'Please choose a valid name (cannot contain special characters e.g. $#@).';
        nameError.classList.remove('error-hidden');
        isValid = false;
    } else {
        nameInput.classList.remove('invalid');
        nameError.classList.add('error-hidden');
    }

    const priceRegex = /^(\d+|\d{1,3}(,\d{3})*|\d+(\.\d+)?|\d+(,\d+)?)([,.]\d+)?$/;
    const priceValue = parseFloat(unitPrice.replace(',', '.'));

    if (!priceRegex.test(unitPrice) || priceValue <= 0) {
        unitPriceInput.classList.add('invalid');
        unitPriceError.textContent = 'Must be greater than 0.';
        unitPriceError.classList.remove('error-hidden');
        isValid = false;
    } else {
        unitPriceInput.classList.remove('invalid');
        unitPriceError.classList.add('error-hidden');
    }

    const amountRegex = /^\d+$/;
    const amountValue = parseInt(amountProduct);

    if(!amountRegex.test(amountProduct) || amountValue < 1) {
        amountInput.classList.add('invalid');
        amountError.textContent = 'Must be an integer greater than 1.';
        amountError.classList.remove('error-hidden');
        isValid = false;
    } else {
        amountInput.classList.remove('invalid');
        amountError.classList.add('error-hidden');
    }

    const selectRegex = /^.+$/;

    if(!selectRegex.test(category) || category == 'Select a category') {
        selectInput.classList.add('invalid');
        selectError.textContent = 'Select a valid category.';
        selectError.classList.remove('error-hidden');
        isValid = false;
    } else {
        selectInput.classList.remove('invalid');
        selectError.classList.add('error-hidden');
    }

    return isValid;
}