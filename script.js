const imageDisplay = document.getElementById('imageDisplay');
const imageResult = document.getElementById('imageResult');
const spinImagesButton = document.getElementById('spinImages');
const simplePosesCheckbox = document.getElementById('simplePosesCheckbox');
const imageHistory = document.getElementById('imageHistory');

spinImagesButton.addEventListener('click', () => {
  const totalImages = simplePosesCheckbox.checked ? 8 : 18;
  spinImagesButton.disabled = true;
  let step = 0;
  const interval = setInterval(() => {
    const index = (step % totalImages) + 1; // Assuming images are named image1.png, image2.png, etc.
    imageDisplay.src = `poses/image${index}.png`;
    imageResult.textContent = translations[currentLang].spinningText.replace('{value}', index);
    step += 1;
  }, 80);

  const finalIndex = Math.floor(Math.random() * totalImages) + 1;
  setTimeout(() => {
    clearInterval(interval);
    imageDisplay.src = `poses/image${finalIndex}.png`;
    imageResult.textContent = translations[currentLang].imageResultText.replace('{finalIndex}', finalIndex);
    imageResult.dataset.i18nValue = finalIndex;
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
const colorResult = document.getElementById('colorResult');
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

const initialColor = simpleColors[0]; // Cor inicial é o branco da lista
colorDisplay.style.background = initialColor;
colorResult.textContent = translations['pt'].colorResultText.replace('{color}', initialColor);
colorResult.dataset.i18nValue = initialColor;

spinColorButton.addEventListener('click', () => {
  spinColorButton.disabled = true;
  const interval = setInterval(() => {
    const color = getRandomColor();
    colorDisplay.style.background = color;
    colorResult.textContent = translations[currentLang].spinningText.replace('{value}', color);
  }, 60);

  setTimeout(() => {
    clearInterval(interval);
    const color = getRandomColor();
    colorDisplay.style.background = color;
    colorResult.textContent = translations[currentLang].colorResultText.replace('{color}', color);
    colorResult.dataset.i18nValue = color;
    spinColorButton.disabled = false;

    // Adiciona ao histórico de cores
    const historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    historyItem.style.backgroundColor = color;
    colorHistory.prepend(historyItem);
    trimHistory(colorHistory);
  }, 1200);
});

// --- Internationalization (i18n) ---
const langToggleButton = document.getElementById('lang-toggle');

function trimHistory(list) {
  const maxItems = 5;

  while (list.children.length > maxItems) {
    // .prepend() adds to the start, so the oldest item is always the last one
    list.lastChild.remove();
  }
}
let currentLang = localStorage.getItem('lang') || 'pt';

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

  if (key === 'imageResultText') {
    const finalIndex = element.dataset.i18nValue;
    text = text.replace('{finalIndex}', finalIndex);
  } else if (key === 'colorResultText') {
    const color = element.dataset.i18nValue;
    text = text.replace('{color}', color);
  }

  element.textContent = text;
}

langToggleButton.addEventListener('click', () => {
  const newLang = currentLang === 'pt' ? 'en' : 'pt';
  setLanguage(newLang);
});

// Set initial language on page load
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
});