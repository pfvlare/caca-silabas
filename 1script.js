const wordImage = document.getElementById('word-image');
const syllablesContainer = document.getElementById('syllables-container');
const correctCountSpan = document.getElementById('correct-count');
const wrongCountSpan = document.getElementById('wrong-count');
const resultDiv = document.getElementById('result');
const selectedSyllablesDiv = document.getElementById('selected-syllables');

const words = [
    { image: 'bolo.png', syllables: ['BO', 'LO'] },
    { image: 'casa.jpg', syllables: ['CA', 'SA'] },
    { image: 'bule.jpg', syllables: ['BU', 'LE'] },
    { image: 'cubo.jpg', syllables: ['CU', 'BO'] },
    { image: 'dado.jpg', syllables: ['DA', 'DO'] },
    { image: 'dedo.png', syllables: ['DE', 'DO'] },
    { image: 'foca.png', syllables: ['FO', 'CA'] },
    { image: 'fone.png', syllables: ['FO', 'NE'] },
    { image: 'lapis.jpg', syllables: ['LA', 'PIS'] },
    { image: 'lula.jpg', syllables: ['LU', 'LA'] },
    { image: 'gato.png', syllables: ['GA', 'TO'] },
];

const wordsPhaseTwo = [
    { image: 'elefante.jpg', syllables: ['E', 'LE', 'FAN', 'TE'] },
    { image: 'jacaré-38125377.webp', syllables: ['JA', 'CA', 'RE'] },
    { image: 'abacaxi.WEBP', syllables: ['A', 'BA', 'CA', 'XI'] },
    { image: 'macaco.jpg', syllables: ['MA', 'CA', 'CO'] },
    { image: 'BONECA.jpg', syllables: ['BO', 'NE', 'CA'] },
    { image: 'AMIGOS.PNG', syllables: ['A', 'MI', 'GOS'] },
    { image: 'BICICLETA.jpg', syllables: ['BI', 'CI', 'CLE','TA'] },
    { image: 'GIRAF.PNG', syllables: ['GI', 'RA', 'FA'] },
    { image: 'chapeuF.JPG', syllables: ['CHA', 'PEU', ] },
    { image: 'carro.JPG', syllables: ['CAR', 'RO'] },
    { image: 'AVIAO.JPG', syllables: ['A', 'VI', 'AO'] },

   
    
];

let currentWordIndex = 0;
let currentWord = words[currentWordIndex];
let selectedSyllables = [];
let correctCount = 0;
let wrongCount = 0;
let userName = '';
let userAge = '';
let isPhaseTwo = false;
let timer;
let timeLimit = 15;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateSyllablesWithVowels(syllable) {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const syllablesWithVowels = [];

    vowels.forEach(vowel => {
        syllablesWithVowels.push(syllable.replace(/[aeiou]/gi, vowel));
    });

    return syllablesWithVowels;
}

function displayWord() {
    wordImage.src = currentWord.image;
    syllablesContainer.innerHTML = '';

    let syllablesToDisplay = currentWord.syllables.slice();
    if (isPhaseTwo) {
        shuffleArray(syllablesToDisplay);
    }

    syllablesToDisplay.forEach(syllable => {
        const syllablesWithVowels = generateSyllablesWithVowels(syllable);
        syllablesWithVowels.forEach(syllableWithVowel => {
            const syllableElement = document.createElement('div');
            syllableElement.classList.add('syllable');
            syllableElement.textContent = syllableWithVowel;
            syllableElement.addEventListener('click', () => toggleSyllable(syllableWithVowel.toUpperCase(), syllableElement));
            syllablesContainer.appendChild(syllableElement);
        });
    });

    if (isPhaseTwo) {
        startTimer();
    }
}

function toggleSyllable(syllable, element) {
    const index = selectedSyllables.indexOf(syllable);
    if (index === -1) {
        selectedSyllables.push(syllable);
        element.classList.add('selected');
    } else {
        selectedSyllables.splice(index, 1);
        element.classList.remove('selected');
    }

    updateSelectedSyllablesDisplay();
}

function checkWord() {
    const sortedSelectedSyllables = selectedSyllables.map(s => s.toUpperCase()).sort().join('');
    const sortedWordSyllables = currentWord.syllables.map(s => s.toUpperCase()).sort().join('');

    if (sortedSelectedSyllables === sortedWordSyllables) {
        Swal.fire({
            title: 'Parabéns!',
            text: `Você acertou a palavra: ${currentWord.syllables.join('')}`,
            imageUrl: 'certo.gif',
            imageWidth: 500,
            imageHeight: 280,
            imageAlt: 'Imagem de sucesso',
            confirmButtonColor: '#28a745'
        });
        correctCount++;
        correctCountSpan.textContent = correctCount;
        nextWord();
    } else {
        Swal.fire({
            title: 'Tente novamente',
            text: 'Você errou a palavra.',
            imageUrl: 'erro.gif',
            imageWidth: 480,
            imageHeight: 360,
            imageAlt: 'Imagem de erro',
            confirmButtonColor: '#28a745'
        });
        wrongCount++;
        wrongCountSpan.textContent = wrongCount;
    }

    clearSelectedSyllables();
    checkIfGameEnded();
}

function checkIfGameEnded() {
    const totalAttempts = correctCount + wrongCount;

    if (totalAttempts === 10) {
        Swal.fire({
            title: 'Fim da Fase 1',
            text: 'Você deseja continuar para a Fase 2?',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            showCancelButton: true,
            confirmButtonColor: '#28a745'
        }).then((result) => {
            if (result.isConfirmed) {
                isPhaseTwo = true;
                correctCount = 0;
                wrongCount = 0;
                correctCountSpan.textContent = correctCount;
                wrongCountSpan.textContent = wrongCount;
                currentWordIndex = 0;
                shuffleArray(wordsPhaseTwo);
                currentWord = wordsPhaseTwo[currentWordIndex];
                displayWord();
            } else {
                Swal.fire({
                    title: 'Fim do Jogo',
                    html: `
                        <p>Nome: ${userName}</p>
                        <p>Idade: ${userAge}</p>
                        <p>Acertos: ${correctCount}</p>
                        <p>Erros: ${wrongCount}</p>
                    `,
                    confirmButtonText: 'Jogar Novamente',
                    confirmButtonColor: '#28a745'
                }).then(() => {
                    resetGame();
                });
            }
        });
    }
}

function updateSelectedSyllablesDisplay() {
    selectedSyllablesDiv.textContent = ' ' + selectedSyllables.join(', ');
}

function correctSyllable() {
    selectedSyllables.pop();
    updateSelectedSyllablesDisplay();
    clearSelectedSyllables();
}

function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % (isPhaseTwo ? wordsPhaseTwo.length : words.length);
    currentWord = isPhaseTwo ? wordsPhaseTwo[currentWordIndex] : words[currentWordIndex];
    clearSelectedSyllables();
    displayWord();
}

function previousWord() {
    currentWordIndex = currentWordIndex === 0 ? (isPhaseTwo ? wordsPhaseTwo.length - 1 : words.length - 1) : currentWordIndex - 1;
    currentWord = isPhaseTwo ? wordsPhaseTwo[currentWordIndex] : words[currentWordIndex];
    clearSelectedSyllables();
    displayWord();
}

function clearSelectedSyllables() {
    selectedSyllables = [];
    updateSelectedSyllablesDisplay();
    const selectedElements = document.querySelectorAll('.syllable.selected');
    selectedElements.forEach(element => {
        element.classList.remove('selected');
    });
}

function startTimer() {
    clearInterval(timer);
    let timeLeft = timeLimit;
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkWord();
        } else {
            timeLeft--;
            document.getElementById('timer').textContent = `Tempo restante: ${timeLeft}s`;
        }
    }, 1000);
}

function askNameAndAge() {
    Swal.fire({
        title: 'insira seu nome !',
        html: `
            <label for="name">Nome:</label>
            <input type="text" id="name" class="swal2-input">
            
        `,
        confirmButtonText: 'Iniciar Jogo',
        confirmButtonColor: '#28a745',
        preConfirm: () => {
            const name = Swal.getPopup().querySelector('#name').value;
            
            if (!name ) {
                Swal.showValidationMessage('Por favor, insira nome ');
            }
            return { name,  };
        }
    }).then((result) => {
        userName = result.value.name;
        userAge = result.value.age;
        startGame();
    });
}

function startGame() {
    correctCount = 0;
    wrongCount = 0;
    correctCountSpan.textContent = correctCount;
    wrongCountSpan.textContent = wrongCount;
    isPhaseTwo = false;
    shuffleArray(words);
    currentWordIndex = 0;
    currentWord = words[currentWordIndex];
    displayWord();
}

function resetGame() {
    correctCount = 0;
    wrongCount = 0;
    correctCountSpan.textContent = correctCount;
    wrongCountSpan.textContent = wrongCount;
    isPhaseTwo = false;
    askNameAndAge();
}

// Inicie o jogo ao carregar a página
askNameAndAge();
