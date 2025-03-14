document.addEventListener('DOMContentLoaded', () => {
  // Переменная для хранения выбранного изображения
  let selectedImage = null;
  // переменные для хранения начальных координат мыши
  let startX = 0, startY = 0;
  // функция для получения текущих значений transform
  const getTransform = (img) => {
    // получаем вычисленные стили изображения
    const style = window.getComputedStyle(img);
    // создаем объект DOMMatrix для работы с матрицей трансформации
    const matrix = new DOMMatrix(style.transform);
    // Возвращаем значения x и y
    return { x: matrix.m41, y: matrix.m42 };
  };
  // функция для установки новых значений transform
  const setTransform = (img, x, y) => {
    // Применяем новые значения translate через CSS
    img.style.transform = `translate(${x}px, ${y}px)`;
  };
  // функция для обработки начала перемещения (мышь или касание)
  const handleStart = (clientX, clientY, img) => {
    // запоминаем выбранное изображение
    selectedImage = img;
    // получаем текущие значения transform
    const { x, y } = getTransform(selectedImage);
    // вычисляем начальные координаты мыши относительно изображения
    startX = clientX - x;
    startY = clientY - y;
    // меняем курсор на "grabbing"
    img.style.cursor = 'grabbing';
  };
  //для обработки перемещения
  const handleMove = (clientX, clientY) => {
    // если изображение выбрано, то вычисляем новые координаты для стиля transform
    if (selectedImage) {
      const x = clientX - startX;
      const y = clientY - startY;
      setTransform(selectedImage, x, y);
    }
  };
  //завершение перемещения
  const handleEnd = () => {
    if (selectedImage) {
      selectedImage.style.cursor = 'grab';
      selectedImage = null;
    }
  };
  // Находим все изображения внутри класса layout и добавляем обработчики событий
  document.querySelectorAll('.layout img').forEach(img => {
    // обработчик события нажатия кнопки мыши
    img.addEventListener('mousedown', (e) => {
      handleStart(e.clientX, e.clientY, img);
    });
    // обработчик события касания на сенсорных устройствах
    img.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY, img);
      e.preventDefault();
    });
  });
  // обработчик события движения мыши
  document.addEventListener('mousemove', (e) => {
    handleMove(e.clientX, e.clientY);
  });
  // обработчик события перемещения на сенсорных устройствах
  document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
    e.preventDefault();
  });
  // обработчик события отпускания кнопки мыши
  document.addEventListener('mouseup', () => {
    handleEnd();
  });
  // обработчик события завершения касания на сенсорных устройствах
  document.addEventListener('touchend', () => {
    handleEnd();
  });
});
// изображения для замены планировки при двойном клике
const layoutVersions = {
  'image-1': ['images/layout_1.svg', 'images/layout_1_2.svg', 'images/layout_1_3.svg'],
  'image-2': ['images/layout_2.svg', 'images/layout_2_1.svg', 'images/layout_2_2.svg'],
  'image-3': ['images/layout_3.svg', 'images/layout_3_1.svg', 'images/layout_3_2.svg'],
  'image-4': ['images/layout_4.svg', 'images/layout_4_2.svg', 'images/layout_4_1.svg'],
};
// Находим все изображения
const images = document.querySelectorAll('.image');
// Добавляем обработчик двойного клика для каждого изображения
images.forEach((image) => {
  // Получаем класс изображения
  const imageClass = image.classList[1];
  // индекс текущей версии изображения
  let currentVersionIndex = 0;
  // переменная для хранения времени последнего клика
  let lastClickTime = 0;

  // функция для обработки двойного клика или касания
  const handleDoubleClick = () => {
    // увеличение индекса изображения
    currentVersionIndex = (currentVersionIndex + 1) % layoutVersions[imageClass].length;
    // меняем src изображения на следующее
    image.src = layoutVersions[imageClass][currentVersionIndex];
  };
  // обработчик клика для мыши
  image.addEventListener('click', () => {
    const currentTime = new Date().getTime();
    // Если время между кликами меньше 300 мс, считается за двойной клик
    if (currentTime - lastClickTime < 300) {
      handleDoubleClick();
    }
    // Обновление времени последнего клика
    lastClickTime = currentTime;
  });
  // обработчик касания для сенсорных устройств
  image.addEventListener('touchstart', (e) => {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 300) {
      handleDoubleClick();
      e.preventDefault();
    }
    lastClickTime = currentTime;
  });
});