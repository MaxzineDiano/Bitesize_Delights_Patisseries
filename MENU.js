const cartIcon = document.getElementById('cart-icon');
const cart = document.getElementById('cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartClose = document.createElement('span');
cartClose.className = 'cart-close';
cartClose.innerHTML = '&times;';
cart.appendChild(cartClose);
let cartData = [];

cartIcon.addEventListener('click', () => {
    cart.style.display = cart.style.display === 'none' || cart.style.display === '' ? 'block' : 'none';
    clearCartIconNotification();
});

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const existingItem = cartData.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartData.push({ name, price, quantity: 1 });
        }
        updateCart();
        showCart();
        showNotification();
        updateCartIconNotification();
    });
});

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cartData.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('li');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span class="item-name">${item.name}</span>
            <div class="item-quantity">
                <button onclick="updateItemQuantity('${item.name}', -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateItemQuantity('${item.name}', 1)">+</button>
            </div>
            <span>₱${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.innerText = `Total: ₱${total.toFixed(2)}`;

    if (cartData.length === 0) {
        alert("You do not have any items in your cart.");
    }
}

function updateItemQuantity(name, change) {
    const item = cartData.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cartData = cartData.filter(cartItem => cartItem.name !== name);
        }
    }
    updateCart();
    updateCartIconNotification();
}

function showCart() {
    cart.style.display = 'block';
}

cartClose.addEventListener('click', () => {
    cart.style.display = 'none';
});

document.getElementById('checkout-btn').addEventListener('click', () => {
    showCheckoutForm();
});

document.getElementById('cancel-btn').addEventListener('click', () => {
    cancelOrder();
});

document.getElementById('back-btn').addEventListener('click', () => {
    hideCheckoutForm();
});

function showNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function showCheckoutForm() {
    document.getElementById('checkout-form-overlay').style.display = 'block';
}

function hideCheckoutForm() {
    document.getElementById('checkout-form-overlay').style.display = 'none';
}

function cancelOrder() {
    if (confirm("Are you sure you want to cancel your order?")) {
        cartData = [];
        updateCart();
        hideCheckoutForm();
        alert("Your order has been canceled.");
        clearCartIconNotification();
    }
}

document.getElementById('checkout-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const contact = document.getElementById('contact').value;
    const total = cartTotal.innerText.split('₱')[1];

    const confirmationMessage = `
        Thank you, ${name}! Your order has been sent.
        It will be delivered to:
        - Name: ${name}
        - Address: ${address}
        - Contact Number: ${contact}
        - Total: ₱${total}
        Your order will arrive in 30-45 minutes.
    `;

    alert(confirmationMessage);

    cartData = [];
    updateCart();

    hideCheckoutForm();

    cart.style.display = 'none';
    clearCartIconNotification();
});

function updateCartIconNotification() {
    const cartIconNotification = document.getElementById('cart-icon-notification');
    if (cartData.length > 0) {
        cartIconNotification.textContent = cartData.length;
        cartIconNotification.style.display = 'block';
    } else {
        cartIconNotification.style.display = 'none';
    }
}

function clearCartIconNotification() {
    const cartIconNotification = document.getElementById('cart-icon-notification');
    cartIconNotification.textContent = '';
    cartIconNotification.style.display = 'none';
}

document.getElementById('contact').addEventListener('input', function (e) {
    let value = e.target.value;

    value = value.replace(/\D/g, '');

    value = value.slice(0, 11);
    e.target.value = value;
});
