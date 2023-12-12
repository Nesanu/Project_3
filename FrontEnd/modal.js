let modal = null;
const focusableSelector = "button, a, input, textarea";
let focusables = [];

const openModal = function (event) {
  event.preventDefault();
  modal = document.querySelector(event.target.getAttribute("href"));
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  previouslyFocusedElement = document.querySelector(":focus");
  modal.style.display = null;
  focusables[0].focus();
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
};

const closeModal = function (event) {
  if (modal === null) return;
  if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
  event.preventDefault();
  //   modal.addEventListener('animationend', function () {
  //     modal.style.display = "none";
  //     modal = null;
  //   })
  window.setTimeout(function () {
    modal.style.display = "none";
    modal = null;
  }, 500);
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  s;
  //   const hideModal = function() {
  //     modal.style.display = "none"
  //     modal.removeEventListener('animationend', hideModal)
  //     modal=null
  //   }
};
// modal.addEventListener("animationend", hideModal);

const stopPropagation = function (event) {
  event.stopPropagation();
};

const focusInModal = function (event) {
  event.preventDefault();
  let index = focusables.findIndex((f) => f === modal.querySelector(":focus"));
  if (event.shiftKey === true) {
    index--;
  } else {
    index++;
  }
  if (index >= focusables.length) {
    index = 0;
  }
  if (index < 0) {
    index = focusables.length - 1;
  }
  focusables[index].focus();
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape" || event.key === "Esc") {
    closeModal(event);
  }
  if (event.key === "Tab" && modal !== null) {
    focusInModal(event);
  }
});
