// Get the form
form = document.getElementById("formAjout");
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
      console.log("Success:", data);
    })
    .catch((error) => {
      // There was an error submitting the form
      console.error("Error:", error);
    });
});

// Get the form
const form = document.getElementById("formAjout");

form.addEventListener("submit", function (event) {
  // Check if the form is valid
  if (!form.checkValidity()) {
    // Prevent the default form submission behavior
    event.preventDefault();
    event.stopPropagation();

    // Display an error message
    alert("Please fill in all required fields.");

    // Add 'was-validated' class to the form to make invalid fields visible
    form.classList.add("was-validated");
  } else {
    // Form is valid, you can continue with form submission
    const formData = new FormData(form);
    // ... rest of your code
  }
});
___________________________________________________________________________________;

// Add a new image without loading the page after the form is successfully submitted

// Get the form
const form = document.getElementById("form-add");
// const form = document.getElementById('formAjout');

form.addEventListener("submit", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Create a FormData object from the form
  const formData = new FormData(form);

  // Send the form data to your server
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Add the new image to the gallery
      let img = document.createElement("img");
      img.src = data.imageUrl; // Replace 'imageUrl' with the actual property name in the response
      gallery.appendChild(img);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
