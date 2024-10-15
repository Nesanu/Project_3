const form = document.getElementById("#form-login");
// const form = document.getElementById("#form-login");
form.addEventListener("submit", async (event) => {
  console.log(event);

  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve the values from the email and password fields
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Verifier si le email et password sont vides. Si les champs sont vides affichez alerte

  if (!email || !password) {
    window.alert("Email and password cannot be empty.");
    return;
  }
  // Prepare the data to be sent to the server
  const idData = {
    email: email,
    password: password,
  };

  // Send a POST request to the server with the email and password
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(idData),
  });

  const data = await response.json();

  // Check if the response contains a token
  if (data.token) {
    // Store the token in localStorage and redirect to index.html
    window.localStorage.setItem("token", data.token);
    window.location.replace("index.html");
  } else {
    window.alert("Wrong email or password.");
  }
});
