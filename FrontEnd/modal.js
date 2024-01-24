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
  document.querySelector("#modal-title").innerHTML = "Galerie photo";
  previousBtn.style.display = "none";
}

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
    figureElement.setAttribute("class", "modal-figure");
    let imageElement = document.createElement("img");
    //let imageUrl = document.createElement("src")
    //imageElement.setAttribute("src", worksList[i].imageUrl)
    imageElement.src = worksList[i].imageUrl;

    imageElement.setAttribute("alt", worksList[i].title);
    imageElement.setAttribute("class", "modal-image");

    //imageElement.innerText = worksList[i].title

    // let figCaption = document.createElement("figcaption");
    // figCaption.innerText = worksList[i].title;

    figureElement.appendChild(imageElement);
    // figureElement.appendChild(figCaption);

    gallery.appendChild(figureElement);

    const poubelle = document.createElement("i");
    poubelle.classList.add("fa-solid", "fa-trash-can", "trash-icon");
    figureElement.appendChild(poubelle);
    console.log(poubelle);
  }

  // Get all the trash can icons
  var trashIcons = document.getElementsByClassName("trash-icon");

  // Loop through each icon
  for (var i = 0; i < trashIcons.length; i++) {
    // Add a click event listener to the icon
    trashIcons[i].addEventListener("click", function (event) {
      // Prevent the default action
      event.preventDefault();

      // Get the ID of the image to delete
      var imageId = this.dataset.imageId;

      window.localStorage.setItem("token", data.token);
      // let monToken = localStorage.getItem("token");

      // Send a DELETE request to the API
      fetch("http://localhost:5678/api/works/1" + imageId, {
        method: "DELETE",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${monToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Remove the image element from the page
          var imageElement = document.getElementById("modal-image" + imageId);
          imageElement.parentNode.removeChild(imageElement);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }
}

getWorks();

// // Exemples code:
// Get all the trash can icons
// var trashIcons = document.getElementsByClassName("trash-icon");

// // Loop through each icon
// for (var i = 0; i < trashIcons.length; i++) {
//   // Add a click event listener to the icon
//   trashIcons[i].addEventListener("click", function (event) {
//     // Prevent the default action
//     event.preventDefault();
//     // event.stopPropagation();

//     // Get the ID of the image to delete
//     var imageId = this.dataset.imageId;

//     // Send a DELETE request to the API:
//     // ex.fetch("https://your-api-url/images/" + imageId, {
//     // method: "DELETE",
//     // })

//     fetch("http://localhost:5678/api/works/{id}" + imageId, {
//       method: "DELETE",
//       headers: {
//         accept: "*/*",
//         Authorization: `Bearer ${monToken}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Remove the image element from the page
//         var imageElement = document.getElementById("image-" + imageId);
//         imageElement.parentNode.removeChild(imageElement);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   });
// }

// function previewImage {
//   const form = document.getElementById('formAjout');
// const formData = new FormData();
// }

// Exemple de code pour la suppression d'une image à l'aide du bouton poubelle :

// function genererPhotosModal(photosModal) {
//   //Création d'une boucle qui va prendre toutes les photos
//   for (let i = 0; i < photosModal.length; i++) {
//     // Création des balises
//     const article = photosModal[i];

//     const sectionGallery = document.querySelector(".galleryModal");

//     const articleElement = document.createElement("article");
//     articleElement.classList.add("photosRealisation");
//     articleElement.dataset.id = [i];

//     const idElement = document.createElement("p");
//     idElement.innerText = article.id;

//     const titleElement = document.createElement("p");
//     titleElement.innerText = "editer";

//     //Ajout de l'icone supprimé-----------
//     const iconeElement = document.createElement("div");
//     iconeElement.classList.add("deletePhoto");
//     iconeElement.innerHTML =
//       '<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.6 1.8V0.9C6.6 0.402944 6.19704 0 5.7 0H3.3C2.80294 0 2.4 0.402944 2.4 0.9V1.8H0V2.4H0.6V8.1C0.6 8.59704 1.00294 9 1.5 9H7.5C7.99704 9 8.4 8.59704 8.4 8.1V2.4H9V1.8H6.6ZM3 0.9C3 0.734316 3.13432 0.6 3.3 0.6H5.7C5.86568 0.6 6 0.734316 6 0.9V1.8H3V0.9ZM4.2 4.2V7.2H4.8V4.2H4.2ZM2.4 7.2V5.4H3V7.2H2.4ZM6 5.4V7.2H6.6V5.4H6Z" fill="white"/></svg>';

//     const imageElement = document.createElement("img");
//     imageElement.src = article.imageUrl;

//     const categoryIdElement = document.createElement("p");
//     categoryIdElement.innerText = article.categoryId;

//     //Ajout de articleElement dans sectionGallery

//     sectionGallery.appendChild(articleElement);

//     //Ajout de nos balises au DOM
//     articleElement.appendChild(imageElement);
//     articleElement.appendChild(titleElement);
//     articleElement.appendChild(iconeElement);
//   }
// }
// //--------------Suppression photo--------------------------------
// iconeElement.addEventListener("click", async (e) => {
//   e.preventDefault();
//   e.stopPropagation();
//   const iconeElement = article.id;
// let monToken = localStorage.getItem("token");
// console.log(iconeElement);
// let response = await fetch(
//   `http://localhost:5678/api/works/${iconeElement}`,
//   {
//     method: "DELETE",
//     headers: {
//       accept: "*/*",
//       Authorization: `Bearer ${monToken}`,
//     },
//   }
// );
//   if (response.ok) {
//     return false;
//     // if HTTP-status is 200-299
//     //alert("Photo supprimé avec succes");
//     // obtenir le corps de réponse (la méthode expliquée ci-dessous)
//   } else {
//     alert("Echec de suppression");
//   }
// });
