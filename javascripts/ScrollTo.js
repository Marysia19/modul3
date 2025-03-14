// Внутренние ссылки к следующим секциям
// перенос к выбору материала
document.getElementById('scroll-to-next').addEventListener('click', function() {
  const targetClass = ['.choice-title']; 
  const offset = 30;
  targetClass.forEach(function(className) {
      const targetElement = document.querySelector(className);
      if (targetElement) {
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          const scrollToPosition = targetPosition - offset;
          window.scrollTo({
              top: scrollToPosition,
              behavior: 'smooth'
          });
      }
  });
});
// перенос к кроссворду
document.getElementById('savechoice').addEventListener('click', function() {
  const targetElement = document.querySelector('.crossword-title');
  if (targetElement) {
      const offset = 30;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const scrollToPosition = targetPosition - offset;
      window.scrollTo({
          top: scrollToPosition,
          behavior: 'smooth'
      });
  }
});
// перенос к планировкам
document.getElementById('next-button').addEventListener('click', function() {
  const targetElement = document.querySelector('.layout-title');
  if (targetElement) {
      const offset = 30;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const scrollToPosition = targetPosition - offset;
      window.scrollTo({
          top: scrollToPosition,
          behavior: 'smooth'
      });
  }
});
// кнопка возвращения в начало
document.addEventListener("DOMContentLoaded", function() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    window.onscroll = function() {
      if (document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
      } else {
        scrollToTopBtn.style.display = "none";
      }
    };
    scrollToTopBtn.addEventListener("click", function() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });