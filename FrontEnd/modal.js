let monToken = localStorage.getItem("token");
// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
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

// async function getWorks() {
//   const reponse = await fetch("http://localhost:5678/api/works");
//   worksList = await reponse.json();
//   console.log("works", worksList);

//   fillGallery(worksList);
// }

async function getWorks() {
  const reponse = await fetch("http://localhost:5678/api/works");
  const worksList = await reponse.json();
  console.log("works", worksList);

  // Recupérer la div gallery du fichier index.html:
  // const gallery = document.querySelectorAll(".gallery");
  let gallery = document.querySelector(".gallery_id");
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

    //   // Remove the work from the screen after confirmation from the server
    //   poubelle.addEventListener("click", async (e) => {
    //     e.preventDefault();
    //     console.log("click", worksList[i].id);

    //     try {
    //       const response = await fetch(
    //         "http://localhost:5678/api/works/" + worksList[i].id,
    //         {
    //           method: "DELETE",
    //           headers: {
    //             accept: "application/json",
    //             Authorization: `Bearer ${monToken}`,
    //           },
    //         }
    //       );

    //       if (!response.ok) {
    //         throw new Error("Network response was not ok");
    //       }

    //       // Display an alert
    //       alert("Projet supprimé");

    //       // Remove the element from the DOM
    //       figureElement.remove();
    //     } catch (error) {
    //       alert("Echec de suppression, une erreur s'est produite");
    //       console.error("Error:", error);
    //     }
    //   });
    // }
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
          // Remove the element from the DOM
          figureElement.remove();
          figureElement.style.display = "none";
          gallery.innerHTML = ""; // Clear the gallery
          location.reload();
          // return false;
        })

        // figureElement.style.display = "none";
        // .then((data) => {
        //   // console.log("Delete successful", data);
        //   figureElement.style.display = "none";
        //   // Display an alert
        //   alert("Projet supprimé");
        //   // Update the gallery without refreshing the page
        //   figureElement.remove(); // Remove the figure element from the DOM
        // })
        //   // Display an alert
        //   alert("Projet supprimé");
        //   e.preventDefault();
        //   // Remove the element from the DOM
        // figureElement.remove();
        //   // // figureElement.remove("image");

        //   figureElement.style.display = "none";
        // })
        .catch((error) => {
          alert("Echec de suppression, une erreur s'est produite");
          console.error("Error:", error);
        });
    });
  }
}

//
//
// figureElement.remove("image");
// figureElement.remove("modal-image" + worksList[i].id);
// figureElement.style.display = "none";
// gallery.remove(modalImage + worksList[i].id);

// Update the page after deleting the image

const updatedWorksList = worksList.filter(
  (work) => work.id !== worksList[i].id
);
gallery = document.querySelector(".gallery");
gallery.innerHTML = ""; // Clear the gallery
updatedWorksList.forEach((work) => {
  let figureElement = document.createElement("figure");
  figureElement.setAttribute("class", "modal-figure");
  figureElement.setAttribute("id", "modal-image" + work.id);
  let imageElement = document.createElement("img");

  imageElement.src = work.imageUrl;
  imageElement.setAttribute("alt", work.title);
  imageElement.setAttribute("class", "modal-image");

  figureElement.appendChild(imageElement);
  gallery.appendChild(figureElement);

  const poubelle = document.createElement("i");
  poubelle.classList.add("fa-solid", "fa-trash-can", "trash-icon");
  figureElement.appendChild(poubelle);
  poubelle.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("click", work.id);
    fetch("http://localhost:5678/api/works/" + work.id, {
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
        alert("Projet supprimé");
        gallery.remove(figureElement);
        // gallery.remove(figureElement);
        // figureElement.remove();
        figureElement.classList.remove("modal-image");
        figureElement.style.display = "none";
        //  gallery.remove(modalImage + worksList[i].id);
      })
      .catch((error) => {
        alert("Echec de suppression.");
        console.error("Error:", error);
      });
  });
});

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
  // Create a new FormData object

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
      // You can update the gallery here
      alert("Projet ajouté");
      console.log("Success:", data);
      location.reload();
      // Add the new image to the gallery
      // let img = document.createElement("img");
      // img.src = data.imageUrl;

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
    })
    .catch((error) => {
      // There was an error submitting the form
      console.error("Error:", error);
    });
});

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
