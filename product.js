import { supabase } from './supabase.js';
import { addToCart } from './cart.js';

document.addEventListener('DOMContentLoaded', async () => {
    const productDetailContainer = document.getElementById('product-detail-container');
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        productDetailContainer.innerHTML = '<p>ID do produto não encontrado.</p>';
        return;
    }

    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

    if (error || !product) {
        console.error('Erro ao buscar o produto:', error);
        productDetailContainer.innerHTML = '<p>Produto não encontrado.</p>';
        return;
    }

    renderProductDetails(product);
});

function renderProductDetails(product) {
    const productDetailContainer = document.getElementById('product-detail-container');
    const { name, images, price, orders, description } = product;

    const thumbnailsHTML = images.map((img, index) => 
        `<img src="${img}" alt="Miniatura ${index + 1}" class="thumbnail-image ${index === 0 ? 'active' : ''}" data-full="${img}">`
    ).join('');

    productDetailContainer.innerHTML = `
        <div class="product-detail-layout">
            <div class="product-detail-image-gallery">
                <div class="main-image-container">
                    <img id="main-product-image" src="${images[0]}" alt="${name}">
                </div>
                <div class="product-thumbnails">
                    ${thumbnailsHTML}
                </div>
            </div>
            <div class="product-detail-info">
                <h1>${name}</h1>
                <div class="product-ratings">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star-half-alt"></i>
                    <span>(${orders} pedidos)</span>
                </div>
                <div class="product-price-detail">$${price}</div>
                <div class="product-description">
                    <p>${description || `Esta é uma descrição detalhada do ${name}.`}</p>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn">Adicionar ao Carrinho</button>
                    <button class="buy-now-btn">Comprar Agora</button>
                </div>
            </div>
        </div>
    `;

    attachEventListeners(product);
}

function attachEventListeners(product) {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail-image');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', (e) => {
            mainImage.src = e.target.dataset.full;
            thumbnails.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    addToCartBtn.addEventListener('click', () => {
        const cartIcon = document.querySelector('.cart-icon-container');
        const flyingImage = mainImage.cloneNode(true);

        flyingImage.classList.add('flying-image');
        document.body.appendChild(flyingImage);

        const mainImageRect = mainImage.getBoundingClientRect();
        const cartIconRect = cartIcon.getBoundingClientRect();

        flyingImage.style.left = `${mainImageRect.left}px`;
        flyingImage.style.top = `${mainImageRect.top}px`;

        setTimeout(() => {
            flyingImage.style.left = `${cartIconRect.left + cartIconRect.width / 2}px`;
            flyingImage.style.top = `${cartIconRect.top + cartIconRect.height / 2}px`;
            flyingImage.style.transform = 'scale(0.1)';
            flyingImage.style.opacity = '0';
        }, 100);

        setTimeout(() => {
            addToCart(product);
            flyingImage.remove();
        }, 1000);
    });
}
