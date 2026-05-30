// Globalno stanje aplikacije (State)
export const state = {
    usluge: [],
    searchQuery: localStorage.getItem('lastSearch') || '',
    odabranaKategorija: 'all',
    favoriti: JSON.parse(localStorage.getItem('favoriti')) || []
};

// Funkcije za upravljanje stanjem i perzistencijom (localStorage)
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