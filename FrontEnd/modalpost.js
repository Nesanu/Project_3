// Get the form
// let gallery = document.getElementById("gallery"); // Assuming you have a gallery element to append images to
let newForm = document.getElementById("form-add");
// Add a submit event listener to the form
newForm.addEventListener("submit", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  // Create a FormData object from the form
  const formData = new FormData(newForm);
  // Send a POST request to the API
  fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    // body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    // .then((response) => response.json())
    .then((data) => {
      // The form was successfully submitted
      // You can update the gallery here
      console.log("Success:", data);
      // Add the new image to the gallery
      let img = document.createElement("img");
      img.src = data.imageUrl; // Replace 'imageUrl' with the actual property name in the response
      alert("Projet ajouté"); // Replace 'imageUrl' with the actual property name in the response
      // gallery.appendChild(img);
      gallery.add(figureElement);
      figureElement.classList.add("modal-image");
      figureElement.style.display = "block";
    })
    .catch((error) => {
      // There was an error submitting the form
      console.error("Error:", error);
    });
});

// // To check if the form is valid before submission, you can use the checkValidity() method on the form element.
// // If the form is not valid, you can display an error message and prevent the form submission.

// // Get the form
// // form = document.getElementById("form-add");

// // form.addEventListener("submit", function (event) {
// //   // Check if the form is valid
// //   if (!form.checkValidity()) {
// //     // Prevent the default form submission behavior
// //     event.preventDefault();
// //     event.stopPropagation();

// //     // Display an error message
// //     alert("Please fill in all required fields.");

// //     // Add 'was-validated' class to the form to make invalid fields visible
// //     form.classList.add("was-validated");
// //   } else {
// //     // Form is valid, you can continue with form submission
// //     const formData = new FormData(form);
// //   }
// // });

// // Devrais-je ajouter une nouvelle image à la galerie à l'aide de JavaScript,
// // sans recharger la page après que le formulaire ait été soumis avec succès,
// // après avoir reçu une réponse du serveur, comme dans les lignes 27-30 ?

// // Je pense qu'il ne faut pas que je fasse un nvo fetch, méthode Post, comme ci-dessous, car cela redoublerait le code?
// // D'avance merci bcp pour ton avis!

// // Add a new image without loading the page after the form is successfully submitted

// // // Get the form
// // const form = document.getElementById("form-add");
// // // const form = document.getElementById('formAjout');

// // form.addEventListener("submit", function (event) {
// //   // Prevent the default form submission behavior
// //   event.preventDefault();

// //   // Create a FormData object from the form
// //   const formData = new FormData(form);

// //   // Send the form data to your server
// //   fetch("http://localhost:5678/api/works", {
// //     method: "POST",
// //     body: formData,
// //   })
// //     .then((response) => response.json())
// //     .then((data) => {
// //       // Add the new image to the gallery
// //       let img = document.createElement("img");
// //       img.src = data.imageUrl; // Replace 'imageUrl' with the actual property name in the response
// //       gallery.appendChild(img);
// //     })
// //     .catch((error) => {
// //       console.error("Error:", error);
// //     });
// // });

// // form = document.getElementById("form-add");
