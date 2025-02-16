// This file will contain shared functions used in the entire site
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

let total = 0;

let currentSlide = 0;
const slides = document.querySelectorAll(".carousel .slide");

function showSlide(index) {
    slides[currentSlide].classList.remove("active");
    slides[currentSlide].classList.add("exiting");

    setTimeout(() => {
        slides[currentSlide].classList.remove("exiting");
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add("active");
    }, 1000);
}

setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Add a new item to the bill
function addItem(itemName = '', price = 0, quantity = 1) {
    const billItems = document.getElementById('billItems');
    const newItem = document.createElement('div');
    newItem.classList.add('bill-item');
    newItem.innerHTML = `
        <input type="text" placeholder="Item Name" class="item-name" value="${itemName}" required />
        <input type="number" placeholder="Price" class="item-price" oninput="updateTotal(this)" value="${price}" min="0" step="0.01" required />
        <input type="number" placeholder="Quantity" class="item-quantity" oninput="updateTotal(this)" value="${quantity}" min="1" required />
        <span>₹${(price * quantity).toFixed(2)}</span>
    `;
    billItems.appendChild(newItem);
    calculateGrandTotal();
}

// Update the total price for each item and calculate the grand total
function updateTotal(input) {
    const billItem = input.parentElement;
    const price = parseFloat(billItem.querySelector('.item-price').value) || 0;
    const quantity = parseFloat(billItem.querySelector('.item-quantity').value) || 0;
    const totalItem = price * quantity;

    // Update the item's total display
    const totalElement = billItem.querySelector('span');
    totalElement.textContent = `₹${totalItem.toFixed(2)}`;
    calculateGrandTotal();
}

// Calculate the grand total of all items
function calculateGrandTotal() {
    const billItems = document.querySelectorAll('.bill-item');
    total = Array.from(billItems).reduce((acc, item) => {
        const itemTotal = parseFloat(item.querySelector('span').textContent.replace('₹', '')) || 0;
        return acc + itemTotal;
    }, 0);

    document.getElementById('grandTotal').textContent = `Grand Total: ₹${total.toFixed(2)}`;
}

// Generate bill with enhanced validation
function generateBill() {
    const customerName = document.getElementById('customerName').value.trim();
    const customerMobile = document.getElementById('customerMobile').value.trim();
    const paymentMode = document.querySelector('input[name="paymentMode"]:checked');
    const message = document.getElementById('message');

    // Validation for name and mobile number
    if (!customerName || !customerMobile || !paymentMode || total === 0) {
        message.textContent = 'Please fill in all fields and add items to the bill.';
        message.style.color = 'red';
        return;
    }

    if (/\d/.test(customerName)) {
        message.textContent = 'Customer name cannot contain numbers.';
        message.style.color = 'red';
        return;
    }

    if (customerMobile.length !== 10 || !/^[0-9]+$/.test(customerMobile)) {
        message.textContent = 'Mobile number must be exactly 10 digits.';
        message.style.color = 'red';
        return;
    }

    message.textContent = `Bill generated successfully for ${customerName} (Mobile: ${customerMobile}). Payment mode: ${paymentMode.value}, Total: ₹${total.toFixed(2)}`;
    message.style.color = 'green';
}

// Print the bill with enhanced validation
function printBill() {
    const customerName = document.getElementById('customerName').value.trim();
    const customerMobile = document.getElementById('customerMobile').value.trim();
    const paymentMode = document.querySelector('input[name="paymentMode"]:checked');

    // Validation for name and mobile number
    if (!customerName || !customerMobile || !paymentMode || total === 0) {
        alert("Please ensure all details are filled before printing.");
        return;
    }

    if (/\d/.test(customerName)) {
        alert("Customer name cannot contain numbers.");
        return;
    }

    if (customerMobile.length !== 10 || !/^[0-9]+$/.test(customerMobile)) {
        alert("Mobile number must be exactly 10 digits.");
        return;
    }

    // Open a new print window
    const billWindow = window.open('', 'PRINT', 'height=600,width=800');
    billWindow.document.write('<html><head><title>Bill</title><style>');
    billWindow.document.write('table { width: 100%; border-collapse: collapse; }');
    billWindow.document.write('th, td { border: 1px solid black; padding: 8px; text-align: left; }');
    billWindow.document.write('</style></head><body>');

    // Add customer details
    billWindow.document.write('<h1>Supermarket</h1>');
    billWindow.document.write(`<p><strong>Customer Name:</strong> ${customerName}</p>`);
    billWindow.document.write(`<p><strong>Mobile Number:</strong> ${customerMobile}</p>`);

    // Build the table header
    billWindow.document.write('<table>');
    billWindow.document.write('<tr><th>Item Name</th><th>Price</th><th>Quantity</th><th>Total</th></tr>');

    // Fetch all bill items and build the table rows
    const billItems = Array.from(document.querySelectorAll('.bill-item'));
    if (billItems.length === 0) {
        billWindow.document.write('<tr><td colspan="4">No items added</td></tr>');
    } else {
        billItems.forEach((item) => {
            const itemName = item.querySelector('.item-name')?.value.trim() || 'Unnamed Item';
            const price = item.querySelector('.item-price')?.value.trim() || '0';
            const quantity = item.querySelector('.item-quantity')?.value.trim() || '0';
            const itemTotal = item.querySelector('span')?.textContent.trim() || '₹0.00';

            // Check if item name, price, and quantity are not empty before adding to the table
            if (itemName !== '' && price !== '0' && quantity !== '0') {
                billWindow.document.write(`
                    <tr>
                        <td>${itemName}</td>
                        <td>₹${price}</td>
                        <td>${quantity}</td>
                        <td>${itemTotal}</td>
                    </tr>
                `);
            }
        });
    }

    // Close the table and add the grand total
    billWindow.document.write('</table>');
    billWindow.document.write(`<p><strong>Grand Total:</strong> ₹${total.toFixed(2)}</p>`);
    billWindow.document.write(`<p><strong>Payment Mode:</strong> ${paymentMode.value}</p>`);
    billWindow.document.write('</body></html>');

    // Finalize and print
    billWindow.document.close();
    billWindow.focus();
    billWindow.print();
    billWindow.close();
}

