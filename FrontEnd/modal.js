// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// Get the <span> element that closes the modal
var closeBtn = document.getElementById("close-btn");

var previousBtn = document.getElementById("arrow-left");

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function () {
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
displayToutesLesPhotos();

function displayFormulaireAjoutPhoto() {
  document.querySelector("#touteslesphotos").style.display = "none";
  document.querySelector("#form-add").style.display = "block";
  document.querySelector("#modal-title").innerHTML = "Ajout Photo";
  previousBtn.style.display = "block";
}
displayFormulaireAjoutPhoto();

async function getWorks() {
  const reponse = await fetch("http://localhost:5678/api/works");
  const worksList = await reponse.json();
  console.log("works", worksList);

  // Recupérer la div gallery du fichier index.html:
  // const gallery = document.querySelectorAll(".gallery");
  let gallery = document.querySelector("#gallery_id");
  console.log(gallery);

  for (let i = 0; i < worksList.length; i++) {
    console.log(worksList[i].title);
    console.log(worksList[i].image);
    // Créer la figure avec l'image, titre et ajouter en tant qu'enfant à gallery (append child)

    let figureElement = document.createElement("figure");

    let imageElement = document.createElement("img");
    //let imageUrl = document.createElement("src")
    //imageElement.setAttribute("src", worksList[i].imageUrl)
    imageElement.src = worksList[i].imageUrl;

    imageElement.setAttribute("alt", worksList[i].title);
    //imageElement.innerText = worksList[i].title

    let figCaption = document.createElement("figcaption");
    figCaption.innerText = worksList[i].title;

    figureElement.appendChild(imageElement);
    figureElement.appendChild(figCaption);

    gallery.appendChild(figureElement);
  }
}

getWorks();

// img.src="${dataWorks[productWorks].imageUrl}"
// alt="${dataWorks[productWorks].title}" class="modal-image"

// Tests------------------------------------------------------------------------
// .then(data => {
//   const modal = document.getElementById('myModal');
// data.forEach((image) => {
//   const imgElement = document.createElement("img");
//   imgElement.src = image.url;
//   imgElement.alt = image.alt;
//   modal.appendChild(img.Element);
// });
// });

// async function getWorks() {
//   const reponse = await fetch("http://localhost:5678/api/works");
//   worksList = await reponse.json();
//   console.log("works", worksList);
//   let toutesLesPhotos = document.querySelector("gallery_id");
//   fillGallery(worksList);
//   console.log(toutesLesPhotos);
// }
// getWorks();

// function fillGallery(arrayOfWork) {
//   let gallery = document.querySelector("gallery_id");
//   gallery.innerHTML = "";
// }

// const poubelle = document.createElement("i");
// poubelle.classList.add("fa-solid", "fa-trash-can");
// figureModal.appendChild(poubelle);

// Essai pour réduire les images de la modale, directement dans le JS:

// img
//   src="${dataWorks[productWorks].imageUrl}"
//   alt="${dataWorks[productWorks].title}"
//   class="modal-image"
// ;
