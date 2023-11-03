import "./scss/style.scss";
import Swiper from "swiper";
import { Navigation, Pagination } from 'swiper/modules';
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const showMoreBtn = document.querySelector(".show-more");
const showMoreBtnBrands = document.querySelector(".show-more-brands");
const swiperPagination = document.querySelectorAll(".swiper-pagination");
const items = document.querySelectorAll(".brand__item.high-resolution");
const brands = document.querySelectorAll(".brand__item.repair.laptop");

let isMoreVisible = false;

function initSlider() {
  if (window.innerWidth < 767) {
    const swiper = new Swiper(".swiper", {
      modules: [Navigation, Pagination],
      slidesPerView: "auto",
      direction: "horizontal",
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
    swiperPagination.forEach((elem) => {
      elem.style.width = `${window.innerWidth - 20}px`;
    });
  }
}

function showItems(block, first, second) {
  let toShow = window.innerWidth <= 1020 ? first : second;

  block.forEach((item, index) => {
    if (index < toShow) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function toggleMoreItems() {
  isMoreVisible = !isMoreVisible;

  items.forEach((item, index) => {
    if (index >= (window.innerWidth < 1120 ? 6 : 8)) {
      item.style.display = isMoreVisible ? "flex" : "none";
    }
  });

  showMoreBtn.innerHTML = isMoreVisible
    ? "<img src='./assets/expand-false.svg' alt=''> Скрыть"
    : "<img src='./assets/expand-true.svg' alt=''> Показать все";
}

function toggleMoreItemsBrand() {
  isMoreVisible = !isMoreVisible;

  brands.forEach((item, index) => {
    if (index >= (window.innerWidth < 1120 ? 3 : 4)) {
      item.style.display = isMoreVisible ? "flex" : "none";
    }
  });

  showMoreBtnBrands.innerHTML = isMoreVisible
    ? "<img src='./assets/expand-false.svg' alt=''> Скрыть"
    : "<img src='./assets/expand-true.svg' alt=''> Показать все";
}

showMoreBtn.addEventListener("click", toggleMoreItems);
showMoreBtnBrands.addEventListener("click", toggleMoreItemsBrand);

document.addEventListener("DOMContentLoaded", showItems(items, 6, 8));
document.addEventListener("DOMContentLoaded", showItems(brands, 3, 4));
document.addEventListener("DOMContentLoaded", initSlider);

window.addEventListener("resize", () => showItems(items, 6, 8));
window.addEventListener("resize", () => showItems(brands, 3, 4));
window.addEventListener("resize", () => initSlider());

// Модальное окно

const feedbackBtn = document.querySelector(".feedback-btn");
const html = document.querySelector("html");
const windowWrapper = document.querySelector(".modal-window");
const closeBtnWindow = document.querySelector(".btn-window");
const windowsTitle = document.querySelector(".window__title");
const callForm = document.querySelectorAll(".call-forms");
const feedbackForms = document.querySelectorAll(".feedback-form");
const callBtn = document.querySelectorAll(".price-btn-window");

feedbackBtn.addEventListener("click", function () {
  html.style.overflowY = "hidden";
  windowWrapper.style.display = "flex";
  windowsTitle.innerHTML = "Обратная связь";
  callForm.forEach((elem) => {
    elem.style.display = "none";
  });
  feedbackForms.forEach((elem) => {
    elem.style.display = "block";
  });
});

callBtn.forEach((btns) => {
  btns.addEventListener("click", function () {
    html.style.overflowY = "hidden";
    windowWrapper.style.display = "flex";
    windowsTitle.innerHTML = "Заказать звонок";
    feedbackForms.forEach((elem) => {
      elem.style.display = "none";
    });
    callForm.forEach((elem) => {
      elem.style.display = "block";
    });
  });
});

closeBtnWindow.addEventListener("click", function () {
  windowWrapper.style.display = "none";
  html.style = "none";
});

// Боковое меню

const popupWrapper = document.querySelector(".popup-wrapper");
const btnAside = document.querySelector(".btn-aside");
const navPopup = document.querySelector(".nav-popup");
const btnAsideClose = document.querySelector(".close");

btnAside.addEventListener("click", function () {
  html.style.overflowY = "hidden";
  btnAsideClose.style.display = "block";
  popupWrapper.style =
    "display: block; position:fixed; left:0; width: 100%; background: rgba(255, 255, 255, 0.9); z-index:6; height: 100%;";
  navPopup.style = "box-shadow: 5px 0px 33px rgb(141, 141, 141);";
  navPopup.classList.remove("animationClose");
  navPopup.classList.add("animationOpen");
});

btnAsideClose.addEventListener("click", function () {
  popupWrapper.style = "display: block; position:fixed; left:0; width: 100%;background: rgba(255, 255, 255, 0);z-index:6; height: 100%;";
  html.style = "";
  navPopup.classList.remove("animationOpen");
  navPopup.classList.add("animationClose");
  const timer = setTimeout(()=> {
    popupWrapper.style = "";
    navPopup.classList.remove("animationClose");
    clearTimeout(timer);
  }, 1000);
  navPopup.style = "box-shadow: none;";
  btnAsideClose.style = "none";
});
