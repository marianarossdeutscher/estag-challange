const urlOrderItem = `http://localhost/routes/orderItem.php`;
const urlProducts = `http://localhost/routes/product.php`;
const urlOrders = `http://localhost/routes/orders.php`; 
const urlCategories = `http://localhost/routes/category.php`;

const form = document.getElementById('index-form');
    form.addEventListener('submit', (e) => handleSubmit(e));

function handleSubmit(e) {
    e.preventDefault();
    if(validateFields()) {
        addOrder();
    }
}

async function addOrder() {
    const response = await fetch(urlProducts);
    const productsList = await response.json();
    let orderAmount = document.getElementById('amount').value;
    let productCode = document.getElementById('product').value;
    let canAdd = true;

    productsList.forEach(product => {
        if(product.code == productCode) {
            if(product.amount < orderAmount) {
                canAdd = false;
            }
        }
    });

    if(canAdd) {
        const formData = new FormData(form);
        try {
            const response = fetch(urlOrderItem, {
                method: "POST",
                body: formData
            })
            .then(data => {
                alert("Item added to cart!");
            })
            .then((response) => {
                window.location.reload();
            });
        } catch (error) {
            console.log(error.message);
        }
    } else {
        alert("The requested quantity exceeds the available stock.");
    }
}

async function listTable() {
    const tbody = document.getElementById('tbody-index');
    const response = await fetch(urlOrderItem);
    const ordersList = await response.json();
    tbody.innerHTML = '';
    let tax = 0;
    let total = 0;

    ordersList.forEach((item) => {
        const tr = document.createElement("tr");
        
        tr.innerHTML = `<tr>
        <td>${item.product_code}</td>
        <td>$${item.price}</td>
        <td>${item.amount}</td>
        <td>$${(((item.tax / 100) * (item.price * item.amount)) + (item.price * item.amount)).toFixed(2)}</td>
        <td><button class="button" id="button-delete" onclick=deleteOrder(${item.code})>Delete</td>
        </tr>`
        tbody.appendChild(tr);
    });

    ordersList.forEach((item) => {
        tax = tax + ((item.tax / 100) * (item.price * item.amount));
        total = total + (((item.tax / 100) * (item.price * item.amount)) + (item.price * item.amount));

        document.getElementById('totalTax').innerText = 'Tax: $' + tax.toFixed(2);
        document.getElementById('totalValue').innerText = 'Total: $' + total.toFixed(2);
    });
}
listTable();

async function populateSelect() {
    const response = await fetch(urlProducts);

    if(response) {
        const productsList = await response.json();
        const select = document.getElementById('product');
        productsList.forEach((product) => {
            select.innerHTML += `<option value="${product.code}">${product.name}</option>`
        });
        select.addEventListener('change', (e) => fillProductDetails(e.target.value));
    }
}
populateSelect();

async function deleteOrder(code) {
    if(confirm("Delete item?")) {
        try {
            const response = await fetch(`http://localhost/routes/orderItem.php?code=${code}`, {
                method: "DELETE"
            })
            .then((response) => {
                window.location.reload();
            });
        } catch (error) {
            console.log(error.message);
        }
    }
}

async function cancelOrder() {
    const response = await fetch(urlOrderItem);
    const orderItemList = await response.json();

    if(orderItemList == '') {
        alert("Seems like there are no items on the cart... Try adding some before.");
    } else {
        if(confirm("Cancel order?")) {
            orderItemList.forEach((item) => {
                try {
                    const response = fetch(`http://localhost/routes/orderItem.php?code=${item.code}`, {
                        method: "DELETE"
                    })
                    .then((response) => {
                        window.location.reload();
                    });
                } catch (error) {
                    console.log(error.message);
                }
            });
        }
    }
}

async function finishOrder() {
    const response = await fetch(urlOrderItem);
    const ordersList = await response.json();
    let data = new FormData();
    let tax = 0;
    let total = 0;

    ordersList.forEach((item) => {
        tax = tax + ((item.tax / 100) * (item.price * item.amount));
        total = total + (((item.tax / 100) * (item.price * item.amount)) + (item.price * item.amount));
    });
    
    data.append("total", total);
    data.append("tax", tax);
    
    console.log(ordersList);
    if(ordersList == '') {
        alert("Seems like there are no items on the cart... Try adding some before finishing.");
    } else {
        if(confirm("Finish order?")) {
            fetch(urlOrders , {
                method: "POST",
                body: data
            })
            .then(response => response.text())
            .then(alert("Order finished!"))
            .catch(error => {
                console.log('Error:', error);
            });
            window.location.reload();
        }
    }
}

async function fillProductDetails(code) {
    const response1 = await fetch(urlProducts);
    const response2 = await fetch(urlCategories);
    const products = await response1.json();
    const categories = await response2.json();

    let product = products.find(prod => prod.code == code);

    if (product) {
        document.getElementById('unit-price').value = product.price;
        let category = categories.find(cat => cat.code == product.category_code);
        if (category) {
            document.getElementById('tax').value = category.tax;
        } else {
            document.getElementById('tax').value = '';
        }
    } else {
        document.getElementById('unit-price').value = '';
        document.getElementById('tax').value = '';
    }
}

function validateFields() {
    let isValid = true;

    const nameProduct = document.getElementById('product').value;
    const amountProduct = document.getElementById('amount').value;
    const selectInput = document.getElementById('product');
    const amountInput = document.getElementById('amount');
    const amountError = amountInput.nextElementSibling;
    const selectError = selectInput.nextElementSibling;

    const selectRegex = /^.+$/;

    if(!selectRegex.test(nameProduct) || nameProduct == 'Select a product') {
        selectInput.classList.add('invalid');
        selectError.textContent = 'Select a valid product.';
        selectError.classList.remove('error-hidden');
        isValid = false;
    } else {
        selectInput.classList.remove('invalid');
        selectError.classList.add('error-hidden');
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

    return isValid;
}