const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('#main-menu');

// La portada rota automáticamente una vez al día. Para añadir otro look,
// basta con sumar un objeto nuevo a esta lista.
const featuredLooks = [
  {
    number: '002',
    image: 'imagenes-pinterest/002-minifalda-vaquera-kiosco-helados-v2.png',
    alt: 'Outfit veraniego con minifalda vaquera y camiseta amarilla',
    href: 'outfit-helado.html',
    note: 'HOT GIRL<br>SUMMER!'
  },
  {
    number: '003',
    image: 'imagenes-pinterest/003-pantalon-rayas-atardecer-playa.png',
    alt: 'Pantalón de rayas rosas al atardecer en la playa',
    href: 'outfit-atardecer.html',
    note: 'DISCO<br>SUNSET!'
  }
];

const today = new Date();
const localMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const dayKey = Math.floor(localMidnight.getTime() / 86400000);
const featuredLook = featuredLooks[dayKey % featuredLooks.length];
const heroImage = document.querySelector('#hero-look-image');
const heroLink = document.querySelector('#hero-look-link');
const heroNote = document.querySelector('#hero-look-note');

if (heroImage && heroLink && heroNote) {
  heroImage.src = featuredLook.image;
  heroImage.alt = featuredLook.alt;
  heroLink.href = featuredLook.href;
  heroLink.textContent = `look ${featuredLook.number} ↗`;
  heroNote.innerHTML = featuredLook.note;
}

menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

menu.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
});
