import { supabase } from './supabase.js';

class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const {
            image,
            name,
            price,
            shipping,
            orders
        } = this.dataset;
        this.shadowRoot.innerHTML = `
            <style>
                .product-card-container {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    font-family: 'Roboto', sans-serif;
                }
                .product-image {
                    width: 100%;
                    height: 180px;
                    object-fit: cover;
                }
                .product-info {
                    padding: 0.75rem;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                }
                .product-name {
                    font-size: 0.9rem;
                    font-weight: 500;
                    line-height: 1.2;
                    height: 2.4em; 
                    overflow: hidden;
                }
                .product-price {
                    font-size: 1.2rem;
                    font-weight: 700;
                    margin: 0.5rem 0;
                }
                 .product-shipping, .product-orders {
                    font-size: 0.8rem;
                    color: #888;
                }
            </style>
            <div class="product-card-container">
                <img src="${image}" alt="${name}" class="product-image">
                <div class="product-info">
                    <div class="product-name">${name}</div>
                    <div class="product-price">$${price}</div>
                    <div class="product-shipping">Frete Grátis</div>
                    <div class="product-orders">${orders} pedidos</div>
                </div>
            </div>
        `;
    }
}

customElements.define('product-card', ProductCard);

const productGrid = document.getElementById('product-grid');
const searchInput = document.querySelector('.search-bar input');

async function fetchProducts(searchTerm = '') {
    let query = supabase.from('products').select('*');
    
    if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Erro ao buscar produtos:', error);
        return;
    }

    renderProducts(data);
}

function renderProducts(products) {
    if (!productGrid) return;
    productGrid.innerHTML = '';
    
    if (!products || products.length === 0) {
        productGrid.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('product-card');
        productCard.dataset.image = product.images[0]; 
        productCard.dataset.name = product.name;
        productCard.dataset.price = product.price;
        productCard.dataset.orders = product.orders;
        
        productCard.addEventListener('click', () => {
            window.location.href = `product.html?id=${product.id}`;
        });

        productGrid.appendChild(productCard);
    });
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        fetchProducts(e.target.value.toLowerCase());
    });
}

// Renderização inicial
if (productGrid) {
    fetchProducts();
}
