// Function to toggle visibility of the edit form
function editCustomerDetails() {
    document.getElementById('edit-form').classList.remove('hidden');
    document.querySelector('.container').style.opacity = '0.5';
}

// Function to save customer details
function saveCustomerDetails() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const purchases = document.getElementById('purchases').value;
    const joinDate = document.getElementById('join-date').value;

    // Update the details on the page
    document.getElementById('customer-name').textContent = name;
    document.getElementById('customer-email').textContent = email;
    document.getElementById('customer-phone').textContent = phone;
    document.getElementById('customer-address').textContent = address;
    document.getElementById('customer-purchases').textContent = purchases;
    document.getElementById('customer-join-date').textContent = joinDate;

    // Hide the edit form
    cancelEdit();
}

// Function to cancel editing
function cancelEdit() {
    document.getElementById('edit-form').classList.add('hidden');
    document.querySelector('.container').style.opacity = '1';
}

// Function to delete a customer
function deleteCustomer() {
    const confirmDelete = confirm('Are you sure you want to delete this customer?');
    if (confirmDelete) {
        alert('Customer deleted');
        // Logic to delete the customer (e.g., via an API) can be added here
    }
}



