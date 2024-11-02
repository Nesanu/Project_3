const form = document.querySelector("#form-login");
form.addEventListener("submit", async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  // Check for the empty fieds of the email and password. If so, display an alert.

  if (!email || !password) {
    window.alert("Email and password cannot be empty.");
    return;
  }

  // An object that contains the email and password fields is created to be sent to the server.

  const idData = {
    email: email,
    password: password,
  };

  // A POST request is sent to the server with the email and password field in the request body.

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(idData),
  });

  // The response from the server is converted to JSON format.
  const data = await response.json();

  // If the server response contains a token, it is stored in the local storage and the user is redirected to the index.html page.
  // If no token is found in the server's response, an alert is displayed.

  if (data.token) {
    window.localStorage.setItem("token", data.token);
    window.location.replace("index.html");
  } else {
    window.alert("Wrong email or password.");
  }
});
