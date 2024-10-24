let monToken = localStorage.getItem("token");
// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal ??? supprimer
// let span = document.getElementsByClassName("close")[0];

// Get the <span> element that closes the modal
let closeBtn = document.getElementById("close-btn");

let previousBtn = document.getElementById("arrow-left");

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
  let gallery = document.querySelector(".gallery_id");
  console.log(gallery);
  gallery.innerHTML = ""; // Clear the gallery NB: pour éviter de dupliquer les images

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
      // Force reload of the web page without manual refresh

      // Send a DELETE request to the API
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
          // Remove the figure element from the DOM
          figureElement.style.display = "none";
          // gallery.innerHTML = ""; // Clear the gallery
          figureElement = document.getElementById(
            "gallery-image" + worksList[i].id
          );
          figureElement.remove();
          //Exemple Pascal:
          // figureGallery = document.getElementById(
          //   "gallery-image" + worksList[i].id
          // );
          // figureGallery.remove();
          // location.reload();
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
const addForm = document.getElementById("form-add");
const fileInput = addForm.querySelector("input[type=file]");
fileInput.addEventListener("change", (event) => {
  const selectedPic = event.target.files[0];
  console.log(selectedPic);
  const imageElement = document.getElementById("addimage");
  imageElement.src = URL.createObjectURL(selectedPic);
  const icon = document.getElementById("icon-image");
  icon.style.display = "none";
  imageElement.style.display = "block"; // display the image
  console.log(imageElement);
  console.log(icon);
});

// Add a submit event listener to the form
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", async function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  // event.stopPropagation();
  console.log("hello submit");

  // Create a FormData object from the form:

  // get files from the input element:
  const files = addForm.querySelector("input[type=file]").files;
  const title = addForm.querySelector(".form-title").value;
  const category = addForm.querySelector(".form-category").value;
  const formData = new FormData();
  console.log(files[0]);
  console.log(title);
  console.log(category);
  formData.append("image", files[0]);
  formData.append("title", title);
  formData.append("category", category);
  console.log(formData);

  await fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: { Authorization: `Bearer ${monToken}` },
    body: formData,
    // body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // The form was successfully submitted

      alert("Projet ajouté");
      console.log("Success:", data);
      // location.reload();

      // Add the new image to the gallery
      let img = document.createElement("img");
      img.src = data.imageUrl;
      img.alt = data.title;
      let figcaption = document.createElement("figcaption");
      figcaption.innerText = data.title;
      let figure = document.createElement("figure");
      figure.appendChild(img);
      figure.appendChild(figcaption);
      let gallery = document.querySelector(".gallery_id");
      gallery.appendChild(figure);
      // gallery.innerHTML = ""; // Clear the gallery

      // Add the new image to the main gallery
      let mainGallery = document.querySelector(".gallery");
      let mainFigure = document.createElement("figure");
      mainFigure.setAttribute("id", "gallery-image" + data.id);
      let mainImg = document.createElement("img");
      mainImg.src = data.imageUrl;
      mainImg.alt = data.title;
      let mainFigcaption = document.createElement("figcaption");
      mainFigcaption.innerText = data.title;
      mainFigure.appendChild(mainImg);
      mainFigure.appendChild(mainFigcaption);
      mainGallery.appendChild(mainFigure);
      // e.preventDefault();

      // Reset the form fields
      addForm.reset();
      const imageElement = document.getElementById("addimage");
      imageElement.src = "";
      imageElement.style.display = "none";
      const icon = document.getElementById("icon-image");
      icon.style.display = "block";
      submitButton.disabled = true;
      submitButton.style.backgroundColor = "#A7A7A7"; // Change to desired color
      // Je dois recharger ma galerie après avoir ajouté une image
      getWorks();
    })
    .catch((error) => {
      // There was an error submitting the form
      console.error("Error:", error);
    });
});

// fillGallery();

addForm.addEventListener("input", function () {
  const files = addForm.querySelector("input[type=file]").files;
  const title = addForm.querySelector(".form-title").value;
  const category = addForm.querySelector(".form-category").value;
  const allowedExtensions = ["jpg", "jpeg", "png"];
  const maxSizeInBytes = 4 * 1024 * 1024; // 4MB in bytes

  if (files.length > 0) {
    const file = files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    const fileSize = file.size;

    if (!allowedExtensions.includes(fileExtension)) {
      alert("Only jpg, jpeg, and png files are allowed.");
      submitButton.disabled = true;
      submitButton.style.backgroundColor = "#A7A7A7";
      return;
    }

    if (fileSize > maxSizeInBytes) {
      alert("File size must be less than 4MB.");
      submitButton.disabled = true;
      submitButton.style.backgroundColor = "#A7A7A7";
      return;
    }
  }
  if (files.length > 0 && title.trim() !== "" && category.trim() !== "") {
    submitButton.disabled = false;
    submitButton.style.backgroundColor = "#1D6154"; // Change to desired color
  } else {
    submitButton.disabled = true;
    submitButton.style.backgroundColor = "#A7A7A7"; // Change to desired color
  }
});
