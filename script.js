// Obtenção dos elementos do HTML
const wordImage = document.getElementById('word-image'); // Elemento de imagem da palavra
const syllablesContainer = document.getElementById('syllables-container'); // Contêiner das sílabas
const correctCountSpan = document.getElementById('correct-count'); // Contador de acertos
const wrongCountSpan = document.getElementById('wrong-count'); // Contador de erros
const resultDiv = document.getElementById('result'); // Div para exibir resultados
const selectedSyllablesDiv = document.getElementById('selected-syllables'); // Div para exibir sílabas selecionadas

// Palavras do jogo e suas sílabas
const words = [
    { image: 'bolo.png', syllables: ['bo', 'lo'] },
    { image: 'casa.jpg', syllables: ['ca', 'sa'] },
    { image: 'bule.jpg', syllables: ['bu', 'le'] },
    { image: 'cubo.jpg', syllables: ['cu', 'bo'] },
    { image: 'dado.jpg', syllables: ['da', 'do'] },
    { image: 'dedo.png', syllables: ['de', 'do'] },
    { image: 'foca.png', syllables: ['fo', 'ca'] },
    { image: 'fone.png', syllables: ['fo', 'ne'] },
    { image: 'lapis.jpg', syllables: ['la', 'pis'] },
    { image: 'lula.jpg', syllables: ['lu', 'la'] },
    { image: 'gato.png', syllables: ['ga', 'to'] },
    // Adicione mais palavras e suas sílabas aqui
];

let currentWordIndex = 0; // Índice da palavra atual
let currentWord = words[currentWordIndex]; // Palavra atual
let selectedSyllables = []; // Array para armazenar as sílabas selecionadas
let correctCount = 0; // Contador de acertos
let wrongCount = 0; // Contador de erros
let userName = ''; // Nome do usuário
let userAge = ''; // Idade do usuário

// Função para gerar sílabas com vogais
function generateSyllablesWithVowels(syllable) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const syllablesWithVowels = [];

    vowels.forEach(vowel => {
        syllablesWithVowels.push(syllable.replace(/[aeiou]/g, vowel));
    });

    return syllablesWithVowels;
}

// Função para exibir a palavra atual
function displayWord() {
    wordImage.src = currentWord.image; // Define a imagem da palavra

    syllablesContainer.innerHTML = ''; // Limpa o contêiner de sílabas

    // Para cada sílaba da palavra atual
    currentWord.syllables.forEach(syllable => {
        const syllablesWithVowels = generateSyllablesWithVowels(syllable);

        // Para cada sílaba com vogais gerada
        syllablesWithVowels.forEach(syllableWithVowel => {
            const syllableElement = document.createElement('div'); // Cria um elemento para a sílaba
            syllableElement.classList.add('syllable'); // Adiciona a classe 'syllable' para estilização
            syllableElement.textContent = syllableWithVowel; // Define o texto da sílaba
            // Adiciona um evento de clique para selecionar/desselecionar a sílaba
            syllableElement.addEventListener('click', () => toggleSyllable(syllableWithVowel, syllableElement));
            syllablesContainer.appendChild(syllableElement); // Adiciona a sílaba ao contêiner
        });
    });
}

// Função para selecionar/desselecionar uma sílaba
function toggleSyllable(syllable, element) {
    const index = selectedSyllables.indexOf(syllable);
    // Se a sílaba não estiver selecionada, adiciona-a ao array e destaca-a
    if (index === -1) {
        selectedSyllables.push(syllable);
        element.classList.add('selected');
    } else { // Caso contrário, remove-a do array e remove o destaque
        selectedSyllables.splice(index, 1);
        element.classList.remove('selected');
    }
    
    updateSelectedSyllablesDisplay(); // Atualiza a exibição das sílabas selecionadas
}

// Função para verificar a palavra formada pelo usuário
function checkWord() {
    const sortedSelectedSyllables = selectedSyllables.sort().join('');
    const sortedWordSyllables = currentWord.syllables.sort().join('');

    // Se as sílabas selecionadas coincidirem com as da palavra atual
    if (sortedSelectedSyllables === sortedWordSyllables) {
        // Exibe uma mensagem de parabéns com a imagem de sucesso
        Swal.fire({
            title: 'Parabéns!',
            text: 'Você acertou a palavra.',
            imageUrl: 'certo.gif', // imagem de sucesso
            imageWidth: 500,
            imageHeight: 280,
            imageAlt: 'Imagem de sucesso',
        });
        correctCount++; // Incrementa o contador de acertos
        correctCountSpan.textContent = correctCount; // Atualiza o contador de acertos no HTML
        nextWord(); // Passa para a próxima palavra
    } else {
        // Se as sílabas selecionadas não coincidirem com as da palavra atual, exibe uma mensagem de erro
        Swal.fire({
            title: 'Tente novamente',
            text: 'Você errou a palavra.',
            imageUrl: 'erro.gif', //  imagem de erro
            imageWidth: 480,
            imageHeight: 360,
            imageAlt: 'Imagem de erro',
        });
        wrongCount++; // Incrementa o contador de erros
        wrongCountSpan.textContent = wrongCount; // Atualiza o contador de erros no HTML
    }

    selectedSyllables = []; // Limpa as sílabas selecionadas
    updateSelectedSyllablesDisplay(); // Atualiza a exibição das sílabas selecionadas
    checkIfGameEnded(); // Verifica se o jogo terminou
}

// Função para verificar se o jogo terminou
function checkIfGameEnded() {
    if (correctCount + wrongCount === words.length) {
        // Exibe o nome, idade e pontuação do usuário
        Swal.fire({
            title: 'Fim do Jogo',
            html: `
                <p>Nome: ${userName}</p>
                <p>Idade: ${userAge}</p>
                <p>Acertos: ${correctCount}</p>
                <p>Erros: ${wrongCount}</p>
            `,
            confirmButtonText: 'Jogar Novamente'
        }).then(() => {
            // Reinicia o jogo
            correctCount = 0;
            wrongCount = 0;
            correctCountSpan.textContent = correctCount;
            wrongCountSpan.textContent = wrongCount;
            currentWordIndex = 0;
            currentWord = words[currentWordIndex];
            displayWord();
        });
    }
}

// Função para atualizar a exibição das sílabas selecionadas
function updateSelectedSyllablesDisplay() {
    selectedSyllablesDiv.textContent = ' ' + selectedSyllables.join(', '); // Atualiza o texto com as sílabas selecionadas
}

// Função para corrigir a última sílaba selecionada
function correctSyllable() {
    selectedSyllables.pop(); // Remove a última sílaba do array de sílabas selecionadas
    updateSelectedSyllablesDisplay(); // Atualiza a exibição das sílabas selecionadas
}

// Função para passar para a próxima palavra do jogo
function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % words.length; // Calcula o índice da próxima palavra
    currentWord = words[currentWordIndex]; // Define a próxima palavra
    displayWord(); // Exibe a próxima palavra
}

// Função para pedir nome e idade antes de iniciar o jogo
function askNameAndAge() {
    Swal.fire({
        
        title:'Jogo de Silabas',      
        html: `
            <label for="name">Nome:</label>
            <input type="text" id="name" class="swal2-input" placeholder="Digite seu nome">
            <label for="age">Idade:</label>
            <input type="number" id="age" class="swal2-input" placeholder="Digite sua idade">
        `,
        focusConfirm: false,
        preConfirm: () => {
            const name = Swal.getPopup().querySelector('#name').value;
            const age = Swal.getPopup().querySelector('#age').value;
            if (!name || !age) {
                Swal.showValidationMessage('Por favor, digite seu nome e idade');
                return false;
            }
            return { name, age };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Armazena os dados do usuário
            userName = result.value.name;
            userAge = result.value.age;

            // Exibe uma mensagem de boas-vindas
            Swal.fire(`Olá, ${userName}! Vamos começar o jogo.`).then(() => {
                // Inicia o jogo após a mensagem de boas-vindas
                displayWord();
            });
        }
    });
}

// Pede o nome e a idade ao carregar a página
askNameAndAge();
