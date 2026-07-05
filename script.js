let currentLang = localStorage.getItem('lang') || 'pt';

// --- Image Preloading ---
// This will load the images into the browser's cache when the page loads.
// It makes the roulette animation smoother and prevents the "ConnectionAbortedError"
// on the development server by avoiding rapid-fire network requests.
function preloadImages(count, path, prefix = 'image', extension = 'png') {
  for (let i = 1; i <= count; i++) {
    const img = new Image();
    img.src = `${path}/${prefix}${i}.${extension}`;
  }
}

// Preload all possible images for the roulettes
preloadImages(18, 'poses'); // Preload all 18 pose images
preloadImages(2, 'format'); // Preload the 2 format images

const imageDisplay = document.getElementById('imageDisplay');
imageDisplay.onerror = function() {
  console.error(`Erro ao carregar a imagem: ${this.src}`);
};
const spinImagesButton = document.getElementById('spinImages');
const simplePosesCheckbox = document.getElementById('simplePosesCheckbox');
const imageHistory = document.getElementById('imageHistory');

spinImagesButton.addEventListener('click', () => {
  // Foca na roleta ao clicar
  const rouletteGroup = spinImagesButton.closest('.roulette-group');
  if (rouletteGroup) {
    rouletteGroup.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  const totalImages = simplePosesCheckbox.checked ? 8 : 18;
  spinImagesButton.disabled = true;
  let step = 0;
  const interval = setInterval(() => {
    const index = (step % totalImages) + 1; // Assuming images are named image1.png, image2.png, etc.
    imageDisplay.src = `poses/image${index}.png`;
    step += 1;
  }, 80);

  const finalIndex = Math.floor(Math.random() * totalImages) + 1;
  setTimeout(() => {
    clearInterval(interval);
    imageDisplay.src = `poses/image${finalIndex}.png`;
    spinImagesButton.disabled = false;

    // Adiciona ao histórico de imagens
    const historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    const historyImg = document.createElement('img');
    historyImg.src = `poses/image${finalIndex}.png`;
    historyItem.appendChild(historyImg);
    imageHistory.prepend(historyItem);
    trimHistory(imageHistory);
  }, 1200);
});

const colorDisplay = document.getElementById('colorDisplay');
const spinColorButton = document.getElementById('spinColor');
const simpleColorsCheckbox = document.getElementById('simpleColorsCheckbox');
const colorHistory = document.getElementById('colorHistory');

const simpleColors = [
  'rgb(255, 0, 0)',     // Vermelho
  'rgb(255, 165, 0)',   // Laranja
  'rgb(255, 255, 0)',   // Amarelo
  'rgb(0, 128, 0)',     // Verde
  'rgb(0, 0, 255)',     // Azul
  'rgb(75, 0, 130)',    // Anil (Índigo)
  'rgb(238, 130, 238)', // Violeta
  'rgb(15, 23, 42)',    // Preto (mantendo o tom escuro do tema)
  'rgb(248, 250, 252)', // Branco (mantendo o tom claro do tema)
];

function getRandomColor() {
  if (simpleColorsCheckbox.checked) {
    const randomIndex = Math.floor(Math.random() * simpleColors.length);
    return simpleColors[randomIndex];
  }
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

const initialColor = 'rgb(248, 250, 252)'; // Cor inicial "Branco"
colorDisplay.style.backgroundColor = initialColor;

spinColorButton.addEventListener('click', () => {
  spinColorButton.disabled = true;
  // Foca na roleta ao clicar
  const rouletteGroup = spinColorButton.closest('.roulette-group');
  if (rouletteGroup) {
    rouletteGroup.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  const interval = setInterval(() => {
    const color = getRandomColor();
    colorDisplay.style.background = color;
  }, 60);

  setTimeout(() => {
    clearInterval(interval);
    const color = getRandomColor();
    colorDisplay.style.background = color;
    spinColorButton.disabled = false;

    // Adiciona ao histórico de cores
    const historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    historyItem.style.backgroundColor = color;
    colorHistory.prepend(historyItem);
    trimHistory(colorHistory);
  }, 1200);
});

// --- Roulette: Format ---
const formatImageDisplay = document.getElementById('formatImageDisplay');
formatImageDisplay.onerror = function() {
  console.error(`Erro ao carregar a imagem de formato: ${this.src}`);
};
const spinFormatImagesButton = document.getElementById('spinFormatImages');
// Removed simpleFormatPosesCheckbox as per request
const formatImageHistory = document.getElementById('formatImageHistory');

spinFormatImagesButton.addEventListener('click', () => {
  // Foca na roleta ao clicar
  const rouletteGroup = spinFormatImagesButton.closest('.roulette-group');
  if (rouletteGroup) {
    rouletteGroup.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  const totalFormatImages = 2; // Fixed to 2 images as per request
  spinFormatImagesButton.disabled = true;
  let step = 0;
  const interval = setInterval(() => {
    const index = (step % totalFormatImages) + 1;
    formatImageDisplay.src = `format/image${index}.png`;
    step += 1;
  }, 80);

  const finalIndex = Math.floor(Math.random() * totalFormatImages) + 1;
  setTimeout(() => {
    clearInterval(interval);
    formatImageDisplay.src = `format/image${finalIndex}.png`;
    spinFormatImagesButton.disabled = false;

    // Adiciona ao histórico de imagens de formato
    const historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    const historyImg = document.createElement('img');
    historyImg.src = `format/image${finalIndex}.png`;
    historyItem.appendChild(historyImg);
    formatImageHistory.prepend(historyItem);
    trimHistory(formatImageHistory);
  }, 1200);
});

// --- Roulette: Multiplier ---
const multiplierDisplay = document.getElementById('multiplierDisplay');
const multiplierValueSpan = document.getElementById('multiplierValue');
const spinMultiplierButton = document.getElementById('spinMultiplier');
const multiplierHistory = document.getElementById('multiplierHistory');

const multiplierOptions = ['x1.0', 'x1.4', 'x1.7'];

multiplierValueSpan.textContent = multiplierOptions[0]; // Set initial value

spinMultiplierButton.addEventListener('click', () => {
  // Foca na roleta ao clicar
  const rouletteGroup = spinMultiplierButton.closest('.roulette-group');
  if (rouletteGroup) {
    rouletteGroup.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  spinMultiplierButton.disabled = true;
  let step = 0;
  const interval = setInterval(() => {
    const value = multiplierOptions[step % multiplierOptions.length];
    multiplierValueSpan.textContent = value;
    step += 1;
  }, 60);

  const finalValue = multiplierOptions[Math.floor(Math.random() * multiplierOptions.length)];
  setTimeout(() => {
    clearInterval(interval);
    multiplierValueSpan.textContent = finalValue;
    spinMultiplierButton.disabled = false;

    const historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    historyItem.textContent = finalValue; // Display the value in history
    multiplierHistory.prepend(historyItem);
    trimHistory(multiplierHistory);
  }, 1200);
});

// --- Internationalization (i18n) ---
const langToggleButton = document.getElementById('lang-toggle');

function trimHistory(list) {
  const maxItems = 5;
  const wrapper = list.parentElement;

  // Adiciona a classe para o degradê apenas quando a lista está cheia.
  if (list.children.length >= maxItems) {
    wrapper.classList.add('is-full');
  } else {
    wrapper.classList.remove('is-full');
  }

  while (list.children.length > maxItems) {
    // .prepend() adds to the start, so the oldest item is always the last one
    list.lastChild.remove();
  }
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.querySelectorAll('[data-i18n-key]').forEach(translateElement);

  // Atualiza o estilo do botão
  if (lang === 'en') {
    langToggleButton.classList.add('en');
  } else {
    langToggleButton.classList.remove('en');
  }
}

function translateElement(element) {
  const key = element.dataset.i18nKey;
  let text = translations[currentLang][key];
  if (text) element.textContent = text;
}

langToggleButton.addEventListener('click', () => {
  const newLang = currentLang === 'pt' ? 'en' : 'pt';
  setLanguage(newLang);
});

// Set initial language on page load
setLanguage(currentLang);