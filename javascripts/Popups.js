document.addEventListener('DOMContentLoaded', function() {
const questionMark1 = document.getElementById('questionMark1');
const questionMark2 = document.getElementById('questionMark2');
const questionMark3 = document.getElementById('questionMark3');
const popup1 = document.getElementById('popup1');
const popup2 = document.getElementById('popup2');
const popup3 = document.getElementById('popup3');
const section3 = document.querySelector('.section_3');
const popupRules = document.getElementById('popuprules');
const closeButtonRules = popupRules.querySelector('.close');
const startButton = document.getElementById('start');
let isPopupShown = false;
// Функция для управления отображения всплывающего окна
function togglePopup(event, popup) {
    event.stopPropagation();
    if (popup.style.display === 'none' || popup.style.display === '') {
        popup.style.display = 'block';
    } else {
        popup.style.display = 'none';
    }
}
// Обработчики для знаков вопроса
questionMark1.addEventListener('click', function(event) {
    togglePopup(event, popup1);
});
questionMark2.addEventListener('click', function(event) {
    togglePopup(event, popup2);
});
questionMark3.addEventListener('click', function(event) {
    togglePopup(event, popup3);
});
// закрытие окошка ответа на вопрос при клике вне его области
document.addEventListener('click', function(event) {
    if (!popup1.contains(event.target) && event.target !== questionMark1) {
        popup1.style.display = 'none';
    }
    if (!popup2.contains(event.target) && event.target !== questionMark2) {
        popup2.style.display = 'none';
    }
    if (!popup3.contains(event.target) && event.target !== questionMark3) {
        popup3.style.display = 'none';
    }
});
// функция для проверки, находится ли секция с кроссвордом в пределах экрана 
function checkScroll() {
    // Если попап уже показан, то он не будет показываться снова
    if (isPopupShown) return;
    const section3Rect = section3.getBoundingClientRect();
    const section3Center = section3Rect.top + section3Rect.height / 2;
    // Проверяем, находится секция в видимой области экрана
    if (section3Center >= 0 && section3Center <= window.innerHeight) {
        // задержка 1сек перед показом правил кроссворда
        setTimeout(() => {
            popupRules.style.display = 'block';
            isPopupShown = true; // Устанавливаем флаг, что попап был показан
        }, 1000);
    }
}
// Закрытие попапа правил при клике на крестик
closeButtonRules.addEventListener('click', function() {
    popupRules.style.display = 'none';
});
// Закрытие попапа правил  при клике на кнопку Начать
startButton.addEventListener('click', function() {
    popupRules.style.display = 'none';
});
// Отслеживание прокрутки
window.addEventListener('scroll', checkScroll);
// Проверка при загрузке страницы
checkScroll();

//попап сохранения планировки
const popupLayout = document.getElementById('popuplayout');
const saveLayoutButton = document.getElementById('saveLayout');
const closeButtonLayout = popupLayout.querySelector('.close');
const saveButton = popupLayout.querySelector('#save');
const layoutContainer1 = document.querySelector('.layout-container__1');
const layoutContainer2 = document.querySelector('.layout-container__2');
const savelayout = document.querySelector('.save-layout');
// Функция для открытия попапа
function openPopupLayout() {
    popupLayout.classList.add('visible');
    // Скрытие планировок когда попап открыт
    layoutContainer1.style.display = 'none';
    layoutContainer2.style.display = 'none';
    savelayout.style.display = 'none';
}
// Функция для закрытия попапа
function closePopupLayout() {
    popupLayout.classList.remove('visible');
    // Показ планировок
    layoutContainer1.style.display = 'block';
    layoutContainer2.style.display = 'block';
    savelayout.style.display = 'block';
}
// обработчики события в попапе планировки
saveLayoutButton.addEventListener('click', openPopupLayout);
closeButtonLayout.addEventListener('click', closePopupLayout);
saveButton.addEventListener('click', closePopupLayout);
});