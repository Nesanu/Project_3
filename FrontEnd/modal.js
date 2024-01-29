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
    // Créer la figure avec l'image, titre et ajouter en tant qu'enfant à gallery (append child)

    let figureElement = document.createElement("figure");
    figureElement.setAttribute("class", "modal-figure");
    let imageElement = document.createElement("img");

    imageElement.src = worksList[i].imageUrl;

    imageElement.setAttribute("alt", worksList[i].title);
    imageElement.setAttribute("class", "modal-image");

    figureElement.appendChild(imageElement);

    gallery.appendChild(figureElement);

    const poubelle = document.createElement("i");
    poubelle.classList.add("fa-solid", "fa-trash-can", "trash-icon");
    figureElement.appendChild(poubelle);
    console.log(poubelle);
    poubelle.addEventListener("click", async (e) => {
      e.preventDefault();
      // e.stopPropagation();

      console.log("click", worksList[i].id);
      // Send a DELETE request to the API
      let monToken = localStorage.getItem("token");
      // console.log(monToken);

      fetch("http://localhost:5678/api/works/" + worksList[i].id, {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${monToken}`,
        },
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          // Display an alert
          alert("Projet supprimé");
          // Remove the element from the DOM
          figureElement = await response.json();

          let figureElement = document.getElementById(
            ".modal-image" + worksList[i].id
          );
          figureElement.parentNode.removeChild(figureElement);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }

  getWorks();
}

// function previewImage {
//   const form = document.getElementById('formAjout');
// const formData = new FormData();
// }

//  const figureElement = await reponse.json();
// .then((response) => response.json())
// .then((figureElement) => {
// // Supprimer la figureElement du html
// let figureElement = document.getElementById("modal-image" + worksList[i].id);
// figureElement.parentNode.removeChild(imageElement);
//   figureElement = document.getElementById(".modal-image" + worksList[i].id);
//   figureElement.parentNode.removeChild(figureElement);
// })

//     if (reponse.ok) {
//       // return false;
//       window.alert("Photo supprimé avec succes");
//       // obtenir le corps de réponse en JSON
//     } else {
//       window.alert("Echec de suppression, une erreur est survenue");
//     }
// }).catch((error) => {
//   console.error("Error:", error);
// });

//   .then((response) => response.json())
//   .then((data) => {
//     // Supprimer la figureElement du html
//     let figureElement = document.getElementById("image-" + worksList[i].id);
//     figureElement.parentNode.removeChild(imageElement);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   //   });
// });
