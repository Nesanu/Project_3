// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// let span = document.getElementsByClassName("close")[0];

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
    figureElement.setAttribute("id", "modal-image" + worksList[i].id);
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
      // localStorage.setItem("token", data.token);

      // Au lieu d'un localStorage, il vaut mieux un sessionStorage,
      // c'est beaucoup mieux lors de la deconnexion

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
          // figureElement.setAttribute("id", "modal-image" + worksList[i].id);
          figureElement.remove();
        })
        .catch((error) => {
          alert("Echec de suppression, une erreur s'est produite");
          console.error("Error:", error);
        });
    });
  }
}
getWorks();

// Get the form
form = document.getElementById("form-add");
// Add a submit event listener to the form
form.addEventListener("submit", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  // Create a FormData object from the form
  const formData = new FormData(form);
  // Send a POST request to the API
  fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: formData,
    // ou------> : body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((response) => response.json())
    .then((data) => {
      // The form was successfully submitted
      // You can update the gallery here
      console.log("Success:", data);
      // Add the new image to the gallery
      let img = document.createElement("img");
      img.src = data.imageUrl; // Replace 'imageUrl' with the actual property name in the response
      gallery.appendChild(img);
    })
    .catch((error) => {
      // There was an error submitting the form
      console.error("Error:", error);
    });
});

function previewImage() {
  // const form = document.getElementById("formAjout");
  form = document.getElementById("form-add");
  const formData = new FormData();
}
// FileReader();
// addEventListener("change", (event) => {
//   const file = event.target.files[0];
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = (event) => {
//     const img = document.getElementById("preview");
//     img.src = event.target.result;
//   };
// });
