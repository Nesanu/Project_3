// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// Get the <span> element that closes the modal
var closeBtn = document.getElementById("close-btn");

var previousBtn = document.getElementById("prev-btn");

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function displayToutesLesPhotos() {
  document.querySelector("#touteslesphotos").style.display = "block";
  document.querySelector("#form-add").style.display = "none";
  document.querySelector("#modal-title").innerHTML = "Galerie Photos";
  previousBtn.style.display = "none";
}

// function displayToutesLesPhotos() {
//   document.querySelector("#touteslesphotos").style.display = "none";
//   document.querySelector("#form-add").style.display = "block";
// }

function displayFormulaireAjoutPhoto() {
  document.querySelector("#touteslesphotos").style.display = "none";
  document.querySelector("#form-add").style.display = "block";
  document.querySelector("#modal-title").innerHTML = "Ajout Photo";
  previousBtn.style.display = "block";
}

const poubelle = document.createElement("i");
poubelle.classList.add("fa-solid", "fa-trash-can");

// function fillGallery(arrayOfWork) {
//   let gallery = document.querySelector("gallery_id");
//   gallery.innerHTML = "";
// }

displayToutesLesPhotos();

async function getWorks() {
  const reponse = await fetch("http://localhost:5678/api/works");
  worksList = await reponse.json();
  console.log("works", worksList);
  let gallery = document.querySelector("gallery_id");
  fillGallery(worksList);
}
getWorks();
