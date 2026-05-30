import { state, toggleFavorit } from './state.js';

export function renderUsluge(renderContainer, onFavoritToggleCallback) {
    const loadingEl = document.getElementById('loading-state');
    const emptyEl = document.getElementById('empty-state');
    
    // Filtriranje podataka na temelju stanja (Search i Filter)
    const filtriraneUsluge = state.usluge.filter(u => {
        const matchesSearch = u.naziv.toLowerCase().includes(state.searchQuery.toLowerCase());
        const matchesCategory = state.odabranaKategorija === 'all' || u.kategorija === state.odabranaKategorija;
        return matchesSearch && matchesCategory;
    });

    // Sakrij loading stanje jer punimo UI
    loadingEl.classList.add('hidden');
    renderContainer.innerHTML = '';

    // Provjera "Empty" stanja
    if (filtriraneUsluge.length === 0) {
        emptyEl.classList.remove('hidden');
        return;
    } else {
        emptyEl.classList.add('hidden');
    }

    // Dinamički prikaz elemenata (Render liste)
    filtriraneUsluge.forEach(u => {
        const isFavorit = state.favoriti.includes(u.id);
        
        const item = document.createElement('div');
        item.className = 'pricing-item';
        item.innerHTML = `
            <div>
                <span>${u.naziv}</span>
                <button class="fav-btn ${isFavorit ? 'active' : ''}" data-id="${u.id}">
                    ${isFavorit ? '★ Favorit' : '☆ Dodaj u favorite'}
                </button>
            </div>
            <span class="price">${u.cijena.toFixed(2)} €</span>
        `;
        
        // Event listener za interakciju korisnika (klik na favorit)
        item.querySelector('.fav-btn').addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            toggleFavorit(id);
            onFavoritToggleCallback(); // Ponovno iscrtaj UI
        });

        renderContainer.appendChild(item);
    });
}

export function prikaziError() {
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('error-state').classList.remove('hidden');
}