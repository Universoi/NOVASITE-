let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

function updateMiniCart() {
    const miniCart = document.getElementById('mini-cart');
    if (!miniCart) return;

    if (cart.length === 0) {
        miniCart.innerHTML = '<p class="mini-cart-empty">Seu carrinho está vazio.</p>';
        return;
    }

    const cartItemsHTML = cart.map(item => {
        const images = item.images.split(',');
        return `
            <div class="mini-cart-item">
                <img src="${images[0]}" alt="${item.name}" class="mini-cart-item-image">
                <div class="mini-cart-item-info">
                    <div class="mini-cart-item-name">${item.name}</div>
                    <div class="mini-cart-item-price">${item.price}</div>
                    <div class="mini-cart-item-quantity">Qtd: ${item.quantity}</div>
                </div>
            </div>
        `;
    }).join('');

    miniCart.innerHTML = cartItemsHTML;
}

export function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartCount();
    updateMiniCart();
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    saveCart();
    renderCartPage(); 
    updateCartCount();
    updateMiniCart();
}

function renderCartPage() {
    const cartContainer = document.getElementById('cart-container');
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        return;
    }

    const cartItemsHTML = cart.map(item => {
        const images = item.images.split(',');
        return `
            <div class="cart-item">
                <img src="${images[0]}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price}</div>
                    <div class="cart-item-quantity">Quantidade: ${item.quantity}</div>
                </div>
                <button class="cart-item-remove" data-name="${item.name}">Remover</button>
            </div>
        `;
    }).join('');

    const totalPrice = cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        return total + (price * item.quantity);
    }, 0).toFixed(2);

    cartContainer.innerHTML = `
        ${cartItemsHTML}
        <div class="cart-summary">
            <div class="cart-total">Total: $${totalPrice}</div>
            <button class="checkout-btn">Finalizar Compra</button>
        </div>
    `;

    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            removeFromCart(e.target.dataset.name);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateMiniCart();
    if (document.getElementById('cart-container')) {
        renderCartPage();
    }
});
