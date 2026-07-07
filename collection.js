const moods = {
  hibiscus: { number: '01', title: 'Hibiscus<br>Summer', description: 'Rosa, flores y calor.', color: '#ea9dae' },
  orange: { number: '02', title: 'Orange<br>Girl', description: 'Cítricos, sol y energía.', color: '#f98256' },
  lagoon: { number: '03', title: 'Blue<br>Lagoon', description: 'Turquesa, playa y brisa.', color: '#8fcbd4' },
  disco: { number: '04', title: 'Disco<br>Sunset', description: 'Brillo, noche y drama.', color: '#fbde9c' }
};
const requestedMood = new URLSearchParams(window.location.search).get('mood');
const moodKey = moods[requestedMood] ? requestedMood : 'hibiscus';
const mood = moods[moodKey];
document.documentElement.dataset.mood = moodKey;
document.documentElement.style.setProperty('--mood-bg', mood.color);
document.querySelector('#mood-number').textContent = mood.number;
document.querySelector('#mood-title').innerHTML = mood.title;
document.querySelector('#mood-description').textContent = mood.description;
document.title = `${mood.title.replace('<br>', ' ')} · Angy's Virtual Closet`;
document.querySelectorAll('[data-moods]').forEach(card => {
  card.hidden = !card.dataset.moods.split(' ').includes(moodKey);
});
