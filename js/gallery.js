//Создание и рендер разметки по массиву данных и предоставленному шаблону.
//Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
//Открытие модального окна по клику на элементе галереи.
//Подмена значения атрибута src элемента img.lightbox__image.
///Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
//Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

import imgGallery from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  overley: document.querySelector(".lightbox__overlay"),
  img: document.querySelector(".lightbox__image"),
  modal: document.querySelector('[data-action="close-lightbox"]'),
};

refs.gallery.addEventListener("click", imgModalOpen);
refs.modal.addEventListener("click", modalClose);
refs.overley.addEventListener("click", overleyModalClose);
refs.gallery.addEventListener("keydown", escModalClose);

const galleryChart = createGalleryItems(imgGallery);
refs.gallery.innerHTML = galleryChart;

function createGalleryItems(items) {
  return items
    .map(
      ({ original, description, preview }) => `<li class="gallery__item">
            <a class="gallery__link" href="${original}">
        <img class ="gallery__image" src="${preview}" alt="${description}" data-source="${original}">
            </a>
        </li>`
    )
    .join("");
}
const bigImg = imgGallery.map(({ original }) => original);
activeImage;

function activeImage() {
  const activeImage = bigImg;
  refs.img.src = activeImage;
}

function imgModalOpen(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  refs.lightbox.classList.add("is-open");
  refs.img.src = event.target.dataset.source;
  refs.img.alt = event.target.alt;
}

function modalClose() {
  refs.lightbox.classList.remove("is-open");
  refs.img.src = "";
  clearlightboxImg;
}

function overleyModalClose(event) {
  if (event.currentTarget === event.target) {
    modalClose();
  }
}

function escModalClose(event) {
  if (event.code === "Escape") {
    modalClose();
  }
}

function clearlightboxImg() {
  img.removeAttribute("src");
  img.removeAttribute("alt");
}
