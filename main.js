const jsLogos = document.querySelectorAll(".decor__el-c"); // Находим все элементы с классом 'decor__el-с'

// Проверяем, найдены ли элементы
if (jsLogos.length === 0) {
  console.error("Элементы с классом 'decor__el-с' не найдены.");
}

jsLogos.forEach((jsLogo) => {
  // Устанавливаем начальное состояние
  let isHovered = false; // Отслеживаем состояние элемента
  let offsetX = 0;
  let offsetY = 0;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let deadZone = 2; // Мертвая зона, чтобы уменьшить чувствительность

  function hoverMove(mouseX, mouseY) {
    const elRect = jsLogo.getBoundingClientRect();
    const elCenterX = elRect.x + elRect.width / 2;
    const elCenterY = elRect.y + elRect.height / 2;

    // Вычисляем смещение
    const dx = mouseX - elCenterX;
    const dy = mouseY - elCenterY;

    const magnitude = Math.sqrt(dx * dx + dy * dy);
    const maxOffset = 10; // Максимальное смещение
    const offsetX = magnitude > 0 ? (-dx / magnitude) * maxOffset : 0;
    const offsetY = magnitude > 0 ? (-dy / magnitude) * maxOffset : 0;

    // Применяем смещение через transform
    jsLogo.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }

  // Функция для возврата элемента в исходное положение
  function resetPosition() {
    if (!isHovered) return;

    // Возвращаем элемент в исходное состояние
    jsLogo.style.transform = "translate(0, 0)";
    isHovered = false;
  }

  // Слушатель движения мыши
  document.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Вычисляем разницу между текущим и предыдущим положением мыши
    const dx = Math.abs(mouseX - prevMouseX);
    const dy = Math.abs(mouseY - prevMouseY);

    // Если движение мыши превышает мертвую зону, обновляем положение
    if (dx > deadZone || dy > deadZone) {
      const elRect = jsLogo.getBoundingClientRect();
      const elCenterX = elRect.x + elRect.width / 2;
      const elCenterY = elRect.y + elRect.height / 2;

      const distance = Math.sqrt(Math.pow(mouseX - elCenterX, 2) + Math.pow(mouseY - elCenterY, 2));

      if (distance <= 90) {
        hoverMove(mouseX, mouseY); // Перемещаем элемент, если курсор близко
        isHovered = true;
        jsLogo.style.transition = "all 0.2s ease";
        jsLogo.classList.add("decor__el--active");
      } else {
        resetPosition(); // Возвращаем элемент на место
        jsLogo.style.transition = "all 0.8s ease";
        jsLogo.classList.remove("decor__el--active");
      }

      // Обновляем предыдущие координаты мыши
      prevMouseX = mouseX;
      prevMouseY = mouseY;
    }
  });
});

// const worksCards = document.querySelectorAll(".works__card");
// const worksImgs = document.querySelectorAll(".works__img");

// // Функция для изменения ширины
// const changeWidth = (elements, delta) => {
//   elements.forEach((img) => {
//     const currentWidth = parseInt(window.getComputedStyle(img).getPropertyValue("width"));
//     img.style.width = `${currentWidth + delta}px`;
//   });
// };

// // Добавляем события только для карточек
// worksCards.forEach((card) => {
//   card.addEventListener("mouseover", (event) => {
//     if (event.target === card) {
//       // Убедимся, что событие сработало именно на карточке
//       changeWidth(worksImgs, 10);
//     }
//   });

//   card.addEventListener("mouseout", (event) => {
//     if (event.target === card) {
//       // Убедимся, что событие сработало именно на карточке
//       changeWidth(worksImgs, -10);
//     }
//   });
// });

document.querySelector(".mail__text").addEventListener("click", function () {
  const textToCopy = this.dataset.text;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      this.textContent = "Скопировано!";
      setTimeout(() => (this.textContent = textToCopy), 2000);
    })
    .catch((err) => console.error("Ошибка при копировании:", err));
});

// Get in touch //

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  document.querySelector(".form__btn").disabled = true;

  const formData = {
    name: form.name.value,
    mail: form.mail.value,
    message: form.message.value,
  };

  fetch(
    "https://script.google.com/macros/s/AKfycbzPc2LyNhrl2toaKiG9kyEjQK1FtExbOPV4VNPfIAh20i1w8oZeC7CScYKtiCJqPZVX/exec",
    {
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify(formData),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.result === "success") {
        alert("Данные успешно отправлены!");
        document.querySelector(".form__btn").disabled = false;
        form.reset();
      } else {
        document.querySelector(".form__btn").disabled = false;
        alert("Ошибка при отправке данных.");
      }
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      alert("Ошибка при отправке.");
      document.querySelector(".form__btn").disabled = false;
    });
});

//

const footerDate = document.querySelector(".footer__date");

const date = new Date().getFullYear();

footerDate.textContent = date;

document.querySelectorAll(".links__small").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const card = this.closest(".works__card");
    card.classList.add("animate");

    setTimeout(() => {
      window.open(this.href, "_blank");
      card.classList.remove("animate");
    }, 450);
  });
});


// scroll animation

var options = {
  threshold: 0.1,
};
var callback = function (entries) {
  entries.forEach(change => {
    if(change.isIntersecting) {
      change.target.classList.add("card__show")
    } else change.target.classList.remove("card__show")
  })

};
let observer = new IntersectionObserver(callback, options);
let element = document.querySelectorAll(".works__card")

element.forEach(el => {
  observer.observe(el)
})

