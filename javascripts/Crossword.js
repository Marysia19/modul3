document.addEventListener('DOMContentLoaded', function () {
const cards = document.querySelectorAll('.card');
const vulcanImage = document.querySelector('.vulcan-image');
const mountainImage = document.querySelector('.mountain-image');
const caveImage = document.querySelector('.cave-image');
const nextButton = document.getElementById('next-button');
const clickSound = document.getElementById('click-sound');
clickSound.volume = 0.7;
// Отслеживаемые слова и связанные с ними картинки для анимок
const targetWords = {
    "ВУЛКАН": {
        image: vulcanImage,
        images: [
            document.getElementById('vulkan1'),
            document.getElementById('vulkan2'),
            document.getElementById('vulkan3'),
            document.getElementById('vulkan4')
        ]
    },
    "ГОРА": {
        image: mountainImage,
        images: [
            document.getElementById('mountain1'),
            document.getElementById('mountain2'),
            document.getElementById('mountain3'),
            document.getElementById('mountain4')
        ]
    },
    "ПЕЩЕРА": {
        image: caveImage,
        images: [
            document.getElementById('cave1'),
            document.getElementById('cave2'),
            document.getElementById('cave3'),
            document.getElementById('cave4')
        ]
    }
};
// Массив для хранения раскрытых букв
let revealedLetters = [];
// Переменная для хранения текущего таймера анимации
let currentAnimationTimer = null;
// Функция для проверки, собрано ли какое то слово
function checkWords() {
    for (const [word, data] of Object.entries(targetWords)) {
        const wordCollected = word.split('').every(letter => revealedLetters.includes(letter));
        if (wordCollected) {
            // остановка предыдущей анимацию, если она есть
            if (currentAnimationTimer) {
                clearTimeout(currentAnimationTimer);
            }
            // Показ анимации картинок и кнопки далее
            showImages(data.images);
            data.image.classList.add('visible');
            nextButton.classList.remove('hidden');
            return true;
        }
    }
    return false;
}
// Функция для сброса всех карточек и картинок
function resetCards() {
    cards.forEach(card => {
        card.textContent = '';
        card.classList.remove('revealed'); // очистка раскрытых букв
    });
    revealedLetters = []; // Очистка массива открытых букв
    // Скрытие всех картинок
    Object.values(targetWords).forEach(data => {
        data.image.classList.remove('visible');
        data.images.forEach(img => img.style.opacity = 0);
    });
    nextButton.classList.add('hidden');
}
// Функция для показа картинок
function showImages(images) {
     // Оостанвка анимации
    if (currentAnimationTimer) {
        clearTimeout(currentAnimationTimer);
    }
    // Показ картинки по очереди
    images.forEach((img, index) => {
        setTimeout(() => {
            img.style.opacity = 1;
        }, index * 1000);
    });
    currentAnimationTimer = setTimeout(() => {
        images.forEach(img => {
            img.style.opacity = 0;
        });
        currentAnimationTimer = setTimeout(() => showImages(images), 1000);
    }, 5000);
}
// Обработчик клика на карточку
cards.forEach(card => {
    card.addEventListener('click', function () {
        clickSound.play();
        // Проверка собрано ли слово
        const isWordCollected = checkWords();
        if (isWordCollected) {
            // Если слово собрано, сброс всех карт все при любом клике
            resetCards();
            return;
        }
        // карточка открывается, даже если у нее нет буквы
        if (!card.classList.contains('revealed')) {
            // Если буквы нет, используется пустая строка
            const letter = card.getAttribute('data-letter') || '';
            card.textContent = letter;
            card.classList.add('revealed');
            if (letter) {
                // Если буква есть, добавляем ее в массив
                revealedLetters.push(letter);
            }
            // Проверка, собрано ли какое то слово после открытия карточки
            checkWords();
            }
        });
    });
});