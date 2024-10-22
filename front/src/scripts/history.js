async function listTable() {
    const tbody = document.getElementById('tbody-history');
    const response = await fetch("http://localhost/routes/orders.php");
    const ordersList = await response.json();
    const response2 = await fetch(`http://localhost/routes/orderItems.php`);
    const orderItemList = await response2.json();
    tbody.innerHTML = '';

    ordersList.forEach((order) => {
        let tr = tbody.insertRow();
            
        let td_code = tr.insertCell();
        let td_tax = tr.insertCell();
        let td_total = tr.insertCell();
        let td_actions = tr.insertCell();
        
        td_code.innerText = order.code|| 'N/A';
        td_tax.innerText = "$" + order.tax || 'N/A';
        td_total.innerText = "$" + (order.total || '0.00');

        let buttonView = document.createElement('button');
        buttonView.className = 'button';
        buttonView.innerText = 'View';
        buttonView.onclick = () => this.toggleDetails(order.code);
        td_actions.appendChild(buttonView);

        let trDetails = tbody.insertRow();
        trDetails.classList.add('hidden');
        trDetails.id = `details-${order.code}`;

        let tdDetails = trDetails.insertCell();
        tdDetails.colSpan = 4;

        let productDetails = '';

        orderItemList.forEach(product => {
            if(order.code == product.order_code) {
                productDetails += `
                    <strong>Product:</strong> ${product.product_code || 'N/A'} <br>
                    <strong>Quantity:</strong> ${product.amount || 'N/A'} <br>
                    <strong>Unit Price:</strong> $${product.price || 'N/A'} <br>
                    -- <br>
                `;
            }
        });

        tdDetails.innerHTML = productDetails;
    });
}
listTable();

async function toggleDetails(index) {
    let detailsRow = document.getElementById(`details-${index}`);
    if (detailsRow.classList.contains('hidden')) {
        detailsRow.classList.remove('hidden');
    } else {
        detailsRow.classList.add('hidden');
    }
}