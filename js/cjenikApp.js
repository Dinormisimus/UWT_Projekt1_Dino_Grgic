import { state, spremiPretragu, postaviKategoriju } from './state.js';
import { renderUsluge, prikaziError } from './ui.js';

const listContainer = document.getElementById('pricing-list');
const searchInput = document.getElementById('search-input');
const filterSelect = document.getElementById('filter-select');

// Vraćanje zadnje pretrage iz localStorage u input polje
if(searchInput) searchInput.value = state.searchQuery;

// ASYNC: Učitavanje podataka preko Fetch API-ja
async function ucitajUsluge() {
    try {
        // Može biti lokalni JSON ili URL nekog javnog API-ja
        const response = await fetch('./usluge.json');
        if (!response.ok) throw new Error('Mrežna pogreška');
        
        state.usluge = await response.json();
        osvjeziUI();
    } catch (error) {
        console.error(error);
        prikaziError();
    }
}

function osvjeziUI() {
    renderUsluge(listContainer, osvjeziUI);
}

// Eventovi za unos i promjenu filtera
if(searchInput) {
    searchInput.addEventListener('input', (e) => {
        spremiPretragu(e.target.value);
        osvjeziUI();
    });
}

if(filterSelect) {
    filterSelect.addEventListener('change', (e) => {
        postaviKategoriju(e.target.value);
        osvjeziUI();
    });
}

// Pokretanje aplikacije
ucitajUsluge();