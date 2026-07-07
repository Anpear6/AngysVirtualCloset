const icons = { tops: '♧', 'faldas-largas': '〰', 'faldas-cortas': '♡', pantalones: 'Ⅱ', chaquetas: '♢', accesorios: '✦' };
const names = {
  Amazon: ['Top de crochet solar','Falda larga estampada','Minifalda denim','Pantalón de rayas','Chaqueta bordada','Gafas naranjas','Bolso de cuentas','Pendientes hibisco'],
  Shein: ['Top halter floral','Falda boho paisley','Falda mini de volantes','Pantalón palazzo coral','Chaqueta patchwork','Collar de cuentas','Bolso con flores','Anillos de colores']
};
const categories = ['tops','faldas-largas','faldas-cortas','pantalones','chaquetas','accesorios','accesorios','accesorios'];
const shop = document.body.dataset.shop;
const grid = document.querySelector('#product-grid');
names[shop].forEach((name, index) => {
  const category = categories[index];
  const card = document.createElement('article');
  card.className = 'product-card'; card.dataset.category = category;
  card.innerHTML = `<div class="product-visual" aria-hidden="true">${icons[category]}</div><div class="product-info"><small>${category.replace('-', ' ').toUpperCase()}</small><h2>${name}</h2><a href="#"><span>VER PRODUCTO</span><span>↗</span></a></div>`;
  grid.appendChild(card);
});
document.querySelector('.filters').addEventListener('click', event => {
  const button = event.target.closest('button[data-filter]'); if (!button) return;
  document.querySelectorAll('.filters button').forEach(item => item.classList.toggle('active', item === button));
  document.querySelectorAll('.product-card').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
});
