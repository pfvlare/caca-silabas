const wordImage = document.getElementById('word-image');
const syllablesContainer = document.getElementById('syllables-container');
const correctCountSpan = document.getElementById('correct-count');
const wrongCountSpan = document.getElementById('wrong-count');
const resultDiv = document.getElementById('result');
const selectedSyllablesDiv = document.getElementById('selected-syllables');

const words = [
    { image: 'casa.jpg', syllables: ['ca', 'sa'] },
    { image: 'bule.jpg', syllables: ['bu', 'le'] },
    { image: 'cubo.jpg', syllables: ['cu', 'bo'] },
    { image: 'dado.jpg', syllables: ['da', 'do'] },
    { image: 'dedo.png', syllables: ['de', 'do'] },
    { image: 'foca.png', syllables: ['fo', 'ca'] },
    { image: 'fone.png', syllables: ['fo', 'ne'] },
    { image: 'lapis.jpg', syllables: ['la', 'pis'] },
    { image: 'lula.jpg', syllables: ['lu', 'la'] },
    { image: 'casa.jpg', syllables: ['ca', 'sa'] },
    // Adicione mais palavras e suas sílabas aqui
];

let currentWordIndex = 0;
let currentWord = words[currentWordIndex];
let selectedSyllables = [];
let correctCount = 0;
let wrongCount = 0;

function generateSyllablesWithVowels(syllable) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const syllablesWithVowels = [];

    vowels.forEach(vowel => {
        syllablesWithVowels.push(syllable.replace(/[aeiou]/g, vowel));
    });

    return syllablesWithVowels;
}

function displayWord() {
    wordImage.src = currentWord.image;

    syllablesContainer.innerHTML = '';

    currentWord.syllables.forEach(syllable => {
        const syllablesWithVowels = generateSyllablesWithVowels(syllable);

        syllablesWithVowels.forEach(syllableWithVowel => {
            const syllableElement = document.createElement('div');
            syllableElement.classList.add('syllable');
            syllableElement.textContent = syllableWithVowel;
            syllableElement.addEventListener('click', () => toggleSyllable(syllableWithVowel, syllableElement));
            syllablesContainer.appendChild(syllableElement);
        });
    });
}

function toggleSyllable(syllable, element) {
    const index = selectedSyllables.indexOf(syllable);
    if (index === -1) {
        selectedSyllables.push(syllable);
        element.classList.add('selected'); // Adiciona a classe 'selected' para destacar a sílaba selecionada
    } else {
        selectedSyllables.splice(index, 1);
        element.classList.remove('selected'); // Remove a classe 'selected' para desfazer o destaque da sílaba
    }
    
    updateSelectedSyllablesDisplay();
}

function checkWord() {
    const sortedSelectedSyllables = selectedSyllables.sort().join('');
    const sortedWordSyllables = currentWord.syllables.sort().join('');

    if (sortedSelectedSyllables === sortedWordSyllables) {
        Swal.fire({
            title: 'Parabéns!',
            text: 'Você acertou a palavra.',
            imageUrl: 'certo.gif', // Substitua 'correct.png' pela URL da sua imagem de sucesso
            imageWidth: 480,
            imageHeight: 360,
            imageAlt: 'Imagem de sucesso',
        });
        correctCount++;
        correctCountSpan.textContent = correctCount;
        if (correctCount === words.length) {
            resultDiv.textContent = 'Você acertou todas as palavras!';
        }
        nextWord();
    } else {
        Swal.fire({
            title: 'Tente novamente',
            text: 'Você errou a palavra.',
            imageUrl: 'erro.gif', // Substitua 'wrong.png' pela URL da sua imagem de erro
            imageWidth: 480,
            imageHeight: 360,
            imageAlt: 'Imagem de erro',
        });
        wrongCount++;
        wrongCountSpan.textContent = wrongCount;
    }

    selectedSyllables = [];
    updateSelectedSyllablesDisplay();
}

function updateSelectedSyllablesDisplay() {
    selectedSyllablesDiv.textContent = ' ' + selectedSyllables.join(', ');
}

function correctSyllable() {
    selectedSyllables.pop();
    updateSelectedSyllablesDisplay();
}

function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    currentWord = words[currentWordIndex];
    displayWord();
}

displayWord();
