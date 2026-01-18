import { getCartItems, removeFromCart, updateCartIcon } from './cart.js';

document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');

    function renderCart() {
        const cartItems = getCartItems();
        
        if (cartItems.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        const cartItemsHTML = cartItems.map(item => `
            <div class="cart-item">
                <img src="${item.images.split(',')[0]}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price}</div>
                    <div class="cart-item-quantity">Quantity: ${item.quantity}</div>
                </div>
                <button class="cart-item-remove" data-name="${item.name}">Remove</button>
            </div>
        `).join('');

        const totalPrice = cartItems.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return total + (price * item.quantity);
        }, 0).toFixed(2);

        cartContainer.innerHTML = `
            <h2>Your Cart</h2>
            ${cartItemsHTML}
            <div class="cart-summary">
                <div class="cart-total">Total: $${totalPrice}</div>
                <button class="checkout-btn">Proceed to Checkout</button>
            </div>
        `;

        // Add event listeners for remove buttons
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', (e) => {
                const productName = e.target.dataset.name;
                removeFromCart(productName);
                renderCart(); // Re-render the cart
            });
        });
    }

    renderCart();
    updateCartIcon();
});
