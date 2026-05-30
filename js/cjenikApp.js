import { state, spremiPretragu, postaviKategoriju, isprazniKosaricu } from './state.js';
import { renderUsluge, renderKosarica, prikaziError } from './ui.js';

const listContainer = document.getElementById('pricing-list');
const searchInput = document.getElementById('search-input');
const filterSelect = document.getElementById('filter-select');
const clearCartBtn = document.getElementById('clear-cart-btn');

if (searchInput) {
    searchInput.value = state.searchQuery;
}

async function ucitajUsluge() {
    try {
        const response = await fetch('./usluge.json');
        if (!response.ok) throw new Error('Mrežna pogreška');
        
        state.usluge = await response.json();
        osvjeziUI();
    } catch (error) {
        console.error(error);
        prikaziError();
    }
}

// GLAVNA FUNKCIJA KOJA RE-RENDERA SVE NA STRANICI
function osvjeziUI() {
    renderUsluge(listContainer, osvjeziUI);
    renderKosarica(osvjeziUI);
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        spremiPretragu(e.target.value);
        osvjeziUI();
    });
}

if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
        const odabranaKat = e.target.value;
        postaviKategoriju(odabranaKat);
        osvjeziUI();
    });
}

if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
        isprazniKosaricu();
        osvjeziUI();
    });
}

ucitajUsluge();