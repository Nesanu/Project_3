let monToken = localStorage.getItem("token");
// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

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

  // Retrieve the gallery div from the index.html file
  let gallery = document.querySelector(".gallery_id");
  gallery.innerHTML = ""; // Delete the gallery to avoid duplicating images

  for (let i = 0; i < worksList.length; i++) {
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

    poubelle.addEventListener("click", async (e) => {
      e.preventDefault();

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
          figureElement = document.getElementById(
            "gallery-image" + worksList[i].id
          );
          figureElement.remove();
          // location.reload();
        })

        .catch((error) => {
          alert("Echec de suppression, une erreur s'est produite");
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
  const imageElement = document.getElementById("addimage");
  imageElement.src = URL.createObjectURL(selectedPic);
  const icon = document.getElementById("icon-image");
  icon.style.display = "none";
  imageElement.style.display = "block"; // display the image
});

// Add a submit event listener to the form
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", async function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  event.stopPropagation();

  // Create a FormData object from the form.
  // Get files from the input element.
  const files = addForm.querySelector("input[type=file]").files;
  const title = addForm.querySelector(".form-title").value;
  const category = addForm.querySelector(".form-category").value;
  const formData = new FormData();

  formData.append("image", files[0]);
  formData.append("title", title);
  formData.append("category", category);

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
      // Automatically return to the modal gallery after adding an image
      displayToutesLesPhotos();

      // Reset the form fields
      addForm.reset();
      const imageElement = document.getElementById("addimage");
      imageElement.src = "";
      imageElement.style.display = "none";
      const icon = document.getElementById("icon-image");
      icon.style.display = "block";
      submitButton.disabled = true;
      submitButton.style.backgroundColor = "#A7A7A7"; // Change to desired color
      // Reload my gallery after adding an image
      getWorks();
    })
    .catch((error) => {
      // There was an error submitting the form
    });
});

// Control the submit button in the form
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
// Get the logout button
const logoutBtn = document.getElementById("log-out");

// When the user clicks on the logout button, log out and redirect to the main page
logoutBtn.onclick = function () {
  // Clear the token from local storage
  localStorage.removeItem("token");

  // Redirect to the main page
  window.location.href = "index.html";
};
