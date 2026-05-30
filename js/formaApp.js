const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Obrada submit-a bez reload stranice

        // Resetiranje starih grešaka
        ocistiGreske();

        const ime = document.getElementById('ime').value.trim();
        const email = document.getElementById('email').value.trim();
        const poruka = document.getElementById('poruka').value.trim();
        
        let prolaziValidaciju = true;

        // Osnovna validacija
        if (ime.length < 3) {
            prikažiGrešku('ime', 'Ime mora imati barem 3 znaka.');
            prolaziValidaciju = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            prikažiGrešku('email', 'Unesite valjanu e-mail adresu.');
            prolaziValidaciju = false;
        }

        if (poruka.length < 10) {
            prikažiGrešku('poruka', 'Poruka mora imati barem 10 znakova.');
            prolaziValidaciju = false;
        }

        // Ako je sve u redu, ispiši poruku i očisti formu
        if (prolaziValidaciju) {
            formMessage.textContent = `Hvala vam, ${ime}! Vaš upit je uspješno poslan.`;
            formMessage.className = "form-message success";
            form.reset();
        } else {
            formMessage.textContent = "Molimo ispravite pogreške u formi.";
            formMessage.className = "form-message error";
        }
    });
}

function prikažiGrešku(poljeId, tekstPoruke) {
    const errorSpan = document.getElementById(`${poljeId}-error`);
    errorSpan.textContent = tekstPoruke;
    document.getElementById(poljeId).classList.add('input-error');
}

function ocistiGreske() {
    formMessage.className = "form-message hidden";
    document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
    document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(el => el.classList.remove('input-error'));
}