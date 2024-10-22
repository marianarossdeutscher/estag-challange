const urlCategories = `http://localhost/routes/category.php`;
const urlProducts = `http://localhost/routes/product.php`;

const formCategories = document.getElementById('category-form');
formCategories.addEventListener('submit', (e) => handleSubmit(e));

function handleSubmit(e) {
    e.preventDefault();
    if(validateFields()) {
        addCategory();
    }
}

async function addCategory() {
    const response = await fetch(urlCategories);
    const categoriesList = await response.json();
    let categoryName = document.getElementById('catName').value;
    let canAdd = true;

    categoriesList.forEach(category => {
        if(category.name == categoryName.toUpperCase()) {
            canAdd = false;
        }
    });

    if(canAdd) {
        const formData = new FormData(formCategories);
       
        try {
            const response = fetch(urlCategories, {
                method: "POST",
                body: formData
            })
            .then(data => {
                alert("Category added successfully!");
            })
            .then((response) => {
                window.location.reload();
            });
        } catch (error) {
            console.log(error.message);
        }
    } else {
        alert("There is already a category registered under that name.");
    }
    window.location.reload();
}

async function listTable() {
    const tbody = document.getElementById('tbody');
    const response = await fetch(urlCategories);
    const categoriesList = await response.json();
    tbody.innerHTML = '';

    categoriesList.forEach((category) => {
        const tr = document.createElement("tr");
        
        tr.innerHTML = `<tr>
        <td>${category.code}</td>
        <td>${category.name}</td>
        <td>${category.tax}%</td>
        <td><button class="button" id="button-delete" onclick=deleteCategory(${category.code})>Delete</td>
        </tr>`
        tbody.appendChild(tr);
    });
}
listTable();

async function deleteCategory(code) {
    const response = await fetch(urlProducts);
    const productsList = await response.json();
    let cantDelete = false;

    productsList.forEach(product => {
        if(product.category_code == code) {
            cantDelete = true;
        }
    })

    if(cantDelete) {
        alert("Cannot delete the category because it has a product allocated to it.");
    } else {
        if(confirm("Delete category?")) {
            try {
                const response = await fetch(`http://localhost/routes/category.php?code=${code}`, {
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

    let nameCategory = document.getElementById('catName').value;
    let taxCategory = document.getElementById('tax-categories').value;
    const nameInput = document.getElementById('catName');
    const taxInput = document.getElementById('tax-categories');
    const nameError = nameInput.nextElementSibling;
    const taxError = taxInput.nextElementSibling;

    const nameRegex = /^(?!\s*$).+[A-Za-z0-9_]+$/;

    if (!nameRegex.test(nameCategory)) {
        nameInput.classList.add('invalid');
        nameError.textContent = 'Please choose a valid name (cannot contain special characters e.g. $#@).';
        nameError.classList.remove('error-hidden');
        isValid = false;
    } else {
        nameInput.classList.remove('invalid');
        nameError.classList.add('error-hidden');
    }

    const taxRegex = /^(\d+|\d{1,3}(,\d{3})*|\d+(\.\d+)?|\d+(,\d+)?)([,.]\d+)?$/;
    const taxValue = parseFloat(taxCategory);

    if (!taxRegex.test(taxCategory) || taxValue <= 0) {
        taxInput.classList.add('invalid');
        taxError.textContent = 'The tax must be a number greater than 0 (e.g., 0.5).';
        taxError.classList.remove('error-hidden');
        isValid = false;
    } else {
        taxInput.classList.remove('invalid');
        taxError.classList.add('error-hidden');
    }

    return isValid;
}