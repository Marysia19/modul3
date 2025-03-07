document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.resizable-image'); 
    const popupMenu = document.getElementById('popupMenu');
    const closeButton = popupMenu.querySelector('.close-button');
    const aboutElements = document.querySelectorAll('.about, .description, .about__right');
    let isResizing = false;
    let startWidth, startHeight, startX, startY;
    let resizeDirection = null;
    let isMaxSizeReached = false;
    let currentImage = null;
    let originalWidth = {};
    let originalHeight = {};
    // оригинальные размеры картинок при загрузке страницы
    images.forEach(image => {
        originalWidth[image.src] = parseFloat(window.getComputedStyle(image).width);
        originalHeight[image.src] = parseFloat(window.getComputedStyle(image).height);
    });
    // Функция для начала изменения размера
    function startResize(e) {
        if (currentImage.style.width === '130%') return; // ограничитель расширения до 130% от оригинала
        if (popupMenu.style.display === 'block') return; // если popup меню открыто, игнор события
        isResizing = true;
        // Получение начальных размеров и координат
        startWidth = parseFloat(window.getComputedStyle(currentImage).width);
        startHeight = parseFloat(window.getComputedStyle(currentImage).height);
        // Получение начальных координат касания или мышки
        if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        } else {
            startX = e.clientX;
            startY = e.clientY;
        }
        // Определение направления при расширении
        const rect = currentImage.getBoundingClientRect();
        const offsetX = startX - rect.left;
        const offsetY = startY - rect.top;
        if (offsetX < rect.width / 2 && offsetY < rect.height / 2) {
            resizeDirection = 'top-left'; // тянут верхний левый угол
        } else if (offsetX >= rect.width / 2 && offsetY < rect.height / 2) {
            resizeDirection = 'top-right'; // тянут верхний правый угол
        } else if (offsetX < rect.width / 2 && offsetY >= rect.height / 2) {
            resizeDirection = 'bottom-left'; // тянут нижний левый угол
        } else {
            resizeDirection = 'bottom-right'; // тянут нижний правый угол
        }
        e.preventDefault(); 
        // скрываются надписи позади картинки
        aboutElements.forEach(element => {
            element.style.display = 'none';
        });
    }
    // Функция для изменения размера
    function resize(e) {
         // Если popup меню открыто, игнор события
        if (!isResizing || popupMenu.style.display === 'block') return;
        // Получение текущие координаты касания или мыши
        let currentX, currentY;
        if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        } else {
            currentX = e.clientX;
            currentY = e.clientY;
        }
        // Вычисление изменение размера
        let deltaX = currentX - startX;
        let deltaY = currentY - startY;
        let newWidth = startWidth;
        let newHeight = startHeight;
        // Корректировка ширины и высоту в зависимости от направления
        switch (resizeDirection) {
            case 'top-left':
                newWidth = startWidth - deltaX;
                newHeight = startHeight - deltaY;
                break;
            case 'top-right':
                newWidth = startWidth + deltaX;
                newHeight = startHeight - deltaY;
                break;
            case 'bottom-left':
                newWidth = startWidth - deltaX;
                newHeight = startHeight + deltaY;
                break;
            case 'bottom-right':
                newWidth = startWidth + deltaX;
                newHeight = startHeight + deltaY;
                break;
        }
        // Ограничивание минимальный и максимальный размер
        let scaleX = newWidth / startWidth;
        let scaleY = newHeight / startHeight;
        let scale = Math.min(scaleX, scaleY);
        if (scale > 1.3) scale = 1.3; // Максимальный размер130%
        if (scale < 1) scale = 1; // Минимальный размер 100%
        // новые размеры и прозрачность
        currentImage.style.width = (startWidth * scale) + 'px';
        currentImage.style.height = (startHeight * scale) + 'px';
        currentImage.style.opacity = 0.7 + 0.3 * (scale - 1) / 0.3;
        // Если достигнут максимальный размер, показ попап
        if (scale === 1.3) {
            isResizing = false;
            isMaxSizeReached = true;
            popupMenu.style.display = 'block';
        }
    }
    // если пользователь нажал крестик, сброс
    function resetImage() {
        if (currentImage) {
            currentImage.style.width = originalWidth[currentImage.src] + 'px';
            currentImage.style.height = originalHeight[currentImage.src] + 'px';
            currentImage.style.opacity = '0.7';
        }
        isMaxSizeReached = false;
        aboutElements.forEach(element => {
            element.style.display = '';
        });
    }
 // Если не дотянули до максимального размера, сброс
    function stopResize() {
        if (isResizing && !isMaxSizeReached) {
            resetImage();
        }
        isResizing = false;
    }
    // Обработчики для всех изображений
    images.forEach(image => {
        image.addEventListener('mousedown', function(e) {
            currentImage = image;
            startResize(e);
        });
        image.addEventListener('touchstart', function(e) {
            currentImage = image;
            startResize(e);
        }, { passive: false });
    });
    //обработчики для мыши и сенсорных устройств
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
    window.addEventListener('touchmove', resize, { passive: false });
    window.addEventListener('touchend', stopResize);
    //обработчик для кнопки закрытть
    closeButton.addEventListener('click', function() {
        popupMenu.style.display = 'none'
        resetImage();
    });
});