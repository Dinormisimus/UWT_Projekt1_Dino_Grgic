import { state, toggleFavorit, dodajUInicijalnuKosaricu, ukloniIzKosarice } from './state.js';

export function renderUsluge(renderContainer, onStateChangeCallback) {
    const loadingEl = document.getElementById('loading-state');
    const emptyEl = document.getElementById('empty-state');
    
    const filtriraneUsluge = state.usluge.filter(u => {
        const matchesSearch = u.naziv.toLowerCase().includes(state.searchQuery.toLowerCase());
        
        let matchesCategory = false;
        if (state.odabranaKategorija === 'favoriti') {
            matchesCategory = state.favoriti.includes(u.id);
        } else {
            matchesCategory = state.odabranaKategorija === 'all' || u.kategorija === state.odabranaKategorija;
        }
        
        return matchesSearch && matchesCategory;
    });

    loadingEl.classList.add('hidden');
    renderContainer.innerHTML = '';

    if (filtriraneUsluge.length === 0) {
        if (state.odabranaKategorija === 'favoriti') {
            emptyEl.textContent = "Nemate spremljenih favorita. Kliknite zvjezdicu pokraj usluge!";
        } else {
            emptyEl.textContent = "Nema pronađenih usluga za vašu pretragu.";
        }
        emptyEl.classList.remove('hidden');
        return;
    } else {
        emptyEl.classList.add('hidden');
    }

    filtriraneUsluge.forEach(u => {
        const isFavorit = state.favoriti.includes(u.id);
        const uKosarici = state.kosarica.includes(u.id);
        
        const item = document.createElement('div');
        item.className = 'pricing-item';
        item.innerHTML = `
            <div class="pricing-item-info">
                <span class="service-name">${u.naziv}</span>
                <div class="item-actions">
                    <button class="fav-btn ${isFavorit ? 'active' : ''}" data-id="${u.id}">
                        ${isFavorit ? '★' : '☆'}
                    </button>
                    <button class="cart-btn ${uKosarici ? 'in-cart' : ''}" data-id="${u.id}" ${uKosarici ? 'disabled' : ''}>
                        ${uKosarici ? 'U kalkulatoru ✓' : 'Dodaj u kalkulator +'}
                    </button>
                </div>
            </div>
            <span class="price">${u.cijena.toFixed(2)} €</span>
        `;
        
        // Event za favorit
        item.querySelector('.fav-btn').addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            toggleFavorit(id);
            onStateChangeCallback();
        });

        // Event za kalkulator
        item.querySelector('.cart-btn').addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            dodajUInicijalnuKosaricu(id);
            onStateChangeCallback();
        });

        renderContainer.appendChild(item);
    });
}

// FUNKCIJA ZA PRIKAZ STAVKI U KALKULATORU
export function renderKosarica(onStateChangeCallback) {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPriceEl = document.getElementById('cart-total-price');
    
    if (!cartItemsContainer || !cartTotalPriceEl) return;

    cartItemsContainer.innerHTML = '';
    let ukupnaCijena = 0;

    const odabraneUsluge = state.usluge.filter(u => state.kosarica.includes(u.id));

    if (odabraneUsluge.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-text">Kalkulator je prazan.</p>';
        cartTotalPriceEl.textContent = '0.00 €';
        return;
    }

    odabraneUsluge.forEach(u => {
        ukupnaCijena += u.cijena;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${u.naziv}</span>
            <div>
                <span class="cart-item-price">${u.cijena.toFixed(2)} €</span>
                <button class="remove-cart-item" data-id="${u.id}">×</button>
            </div>
        `;

        cartItem.querySelector('.remove-cart-item').addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            ukloniIzKosarice(id);
            onStateChangeCallback();
        });

        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalPriceEl.textContent = `${ukupnaCijena.toFixed(2)} €`;
}

export function prikaziError() {
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('error-state').classList.remove('hidden');
}