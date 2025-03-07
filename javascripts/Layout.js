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
  // Находим все изображения внутри класса layout и добавляем обработчики событий
  document.querySelectorAll('.layout img').forEach(img => {
    img.addEventListener('mousedown', (e) => {
      // запоминаем выбранное изображение
      selectedImage = img;
      // получаем текущие значения transform
      const { x, y } = getTransform(selectedImage);
      // ыычисляем начальные координаты мыши относительно изображения
      startX = e.clientX - x;
      startY = e.clientY - y;
      img.style.cursor = 'grabbing';
    });
  });
  // обработчик события движения мыши
  document.addEventListener('mousemove', (e) => {
    // если изображение выбрано, то вычисляем новые координаты для стиля transform
    if (selectedImage) {
      const x = e.clientX - startX;
      const y = e.clientY - startY;
      setTransform(selectedImage, x, y);
    }
  });
  // обработчик события отпускания кнопки мыши
  document.addEventListener('mouseup', () => {
    if (selectedImage) {
      selectedImage.style.cursor = 'grab';
      selectedImage = null;
    }
  });
});
// замена планировки при двойном клике
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
  // Обработчик двойного клика
  image.addEventListener('dblclick', () => {
    // Увеличиваем индекс текущей версии
    currentVersionIndex = (currentVersionIndex + 1) % layoutVersions[imageClass].length;
    // меняем src изображения на следующее
    image.src = layoutVersions[imageClass][currentVersionIndex];
  });
});