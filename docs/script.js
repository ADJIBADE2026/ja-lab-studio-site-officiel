"use strict";
const form = document.querySelector('#bookingForm');
const status = document.querySelector('#formMessage');
const output = document.querySelector('#requestText');
document.querySelector('#year').textContent = new Date().getFullYear();
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menu.hidden = false;
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); menu.focus(); } });
function today() {
 const d = new Date();
 return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
const dateInput = form.elements.date;
dateInput.min = today();
form.addEventListener('submit', event => {
 event.preventDefault();
 dateInput.min = today();
 if (!form.reportValidity()) return;
 const data = new FormData(form);
 const get = key => String(data.get(key) || '').trim();
 if (!get('nom')) { status.textContent = 'Veuillez indiquer votre nom.'; form.elements.nom.focus(); return; }
 output.value = `Bonjour JA Lab Studio, je souhaite organiser une séance photo.\n\nNom : ${get('nom')}\nCourriel : ${get('email') || 'Non précisé'}\nTéléphone : ${get('telephone') || 'Non précisé'}\nSéance : ${get('service')}\nDate souhaitée : ${get('date')}\n\n${get('message') || 'Disponibilités et tarif à confirmer.'}`;
 document.querySelector('#preparedRequest').hidden = false;
 status.textContent = 'Votre message est prêt. Copiez-le, puis envoyez-le dans WhatsApp ou par courriel.';
 output.focus();
});
document.querySelector('#copyRequest').addEventListener('click', async () => {
 try { await navigator.clipboard.writeText(output.value); status.textContent = 'Message copié. Vous pouvez le coller dans WhatsApp ou dans votre courriel.'; }
 catch { output.focus(); output.select(); status.textContent = 'Sélectionnez et copiez le message manuellement.'; }
});
