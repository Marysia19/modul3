document.addEventListener('DOMContentLoaded', function() {
    const materials = document.querySelector('.materials');
    let isDown = false;
    let startX;
    let scrollLeft;
//Скролл материалов с телефона
    materials.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - materials.offsetLeft;
      scrollLeft = materials.scrollLeft;
    });
    materials.addEventListener('mouseleave', () => {
      isDown = false;
    });
    materials.addEventListener('mouseup', () => {
      isDown = false;
    });
    materials.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - materials.offsetLeft;
       // Скорость горизонтального скролла
      const walk = (x - startX) * 2;
      materials.scrollLeft = scrollLeft - walk;
    });
  });
//Выбор материала
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.materials img');
    // Получаем элемент
    const savechoice = document.getElementById('savechoice');
    let selectedImage = null;
    images.forEach(img => {
      let originalSrc = img.src;
      let hoverSrc = img.getAttribute('data-hover');
      //Замена картинок при наведении
      img.addEventListener('mouseover', function() {
        if (this !== selectedImage) {
          this.src = hoverSrc;
        }
      });
      img.addEventListener('mouseout', function() {
        if (this !== selectedImage) {
          this.src = originalSrc;
        }
      });
      img.addEventListener('click', function() {
        if (selectedImage) {
          // Сброс предыдущего материала
          selectedImage.src = selectedImage.getAttribute('data-original');
        }
        selectedImage = this;
        this.setAttribute('data-original', originalSrc);
        this.src = hoverSrc;
        savechoice.style.display = 'block';
      });
    });
  });