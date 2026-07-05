const translations = {
  en: {
    pageTitle: 'Ultimate Chameleon Bravery',
    imageRouletteTitle: 'Pose Roulette',
    spinImagesButton: 'Spin pose roulette',
    imageResultText: 'Result: pose {finalIndex}',
    simplePosesLabel: 'Simple poses',
    colorRouletteTitle: 'Color Roulette',
    spinColorButton: 'Spin color roulette',
    simpleColorsLabel: 'Simple colors',
    colorResultText: 'Result: {color}',
    spinningText: 'Spinning... {value}',
  },
  pt: {
    pageTitle: 'Ultimate Chameleon Bravery',
    imageRouletteTitle: 'Roleta de poses',
    spinImagesButton: 'Girar roleta de poses',
    imageResultText: 'Resultado: pose {finalIndex}',
    simplePosesLabel: 'Poses simples',
    colorRouletteTitle: 'Roleta de cor',
    spinColorButton: 'Girar roleta de cor',
    simpleColorsLabel: 'Cores simples',
    colorResultText: 'Resultado: {color}',
    spinningText: 'Sorteando... {value}',
  },
};

// This line is to make it work in a simple browser environment without modules.
// If you were using ES modules, you would use `export default translations;`
window.translations = translations;