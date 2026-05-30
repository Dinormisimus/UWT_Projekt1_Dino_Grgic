# Barber Zadar - Interaktivna Web Aplikacija

Projekt predstavlja modernu i pristupačnu web stranicu za tradicionalnu brijačnicu u Zadru, nadograđenu čistim JavaScriptom u interaktivnu web aplikaciju.

## Implementirane funkcionalnosti (Zahtjevi projekta)
- **Dinamički prikaz podataka:** Popis usluga u cjeniku se ne nalazi u HTML-u već se dinamički generira iz podataka.
- **Async (Fetch API):** Podaci o uslugama se asinkrono učitavaju iz lokalne `usluge.json` datoteke.
- **Upravljanje stanjem (State):** Aplikacija prati stanje pretrage, odabrane kategorije i popisa favorita.
- **Persistencija (localStorage):** Favorizirane usluge i zadnja pretraga korisnika ostaju spremljeni i nakon osvježavanja stranice.
- **UI stanja:** Implementirana su vizualna stanja za učitavanje (*loading*), pogrešku (*error*) i prazan rezultat pretrage (*empty state*).
- **Forma i Validacija:** Kontakt forma na stranici Lokacija obrađuje se bez osvježavanja stranice (`preventDefault`), ima klijentsku validaciju i ispisuje poruke uspjeha/greške.
- **Organizacija koda:** Kod je podijeljen u ES6 module (`type="module"`) odvajajući stanje (`state.js`), UI logiku (`ui.js`) i aplikacijsku logiku (`cjenikApp.js`, `formaApp.js`).

## Autor
Dino Grgić - UWT Projekt_1 (2026)