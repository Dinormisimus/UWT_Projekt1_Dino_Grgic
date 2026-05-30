export const state = {
    usluge: [],
    searchQuery: localStorage.getItem('lastSearch') || '',
    odabranaKategorija: 'all',
    favoriti: JSON.parse(localStorage.getItem('favoriti')) || [] ,
    kosarica: JSON.parse(localStorage.getItem('barberKosarica')) || [] // NOVO
};

export function spremiPretragu(query) {
    state.searchQuery = query;
    localStorage.setItem('lastSearch', query);
}

export function postaviKategoriju(kat) {
    state.odabranaKategorija = kat;
}

export function toggleFavorit(id) {
    if (state.favoriti.includes(id)) {
        state.favoriti = state.favoriti.filter(favId => favId !== id);
    } else {
        state.favoriti.push(id);
    }
    localStorage.setItem('favoriti', JSON.stringify(state.favoriti));
}

// NOVE FUNKCIJE ZA KOŠARICU
export function dodajUInicijalnuKosaricu(id) {
    if (!state.kosarica.includes(id)) {
        state.kosarica.push(id);
        localStorage.setItem('barberKosarica', JSON.stringify(state.kosarica));
    }
}

export function ukloniIzKosarice(id) {
    state.kosarica = state.kosarica.filter(cartId => cartId !== id);
    localStorage.setItem('barberKosarica', JSON.stringify(state.kosarica));
}

export function isprazniKosaricu() {
    state.kosarica = [];
    localStorage.removeItem('barberKosarica');
}