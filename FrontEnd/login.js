const form = document.querySelector("#form-login");
form.addEventListener("submit", async (event) => {
  console.log(event);

  event.preventDefault();

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  // Verifier si les champs email et password sont vides. Si oui, affichez une alerte.
  // Si les champs ne sont pas vides, continuez avec la requête fetch.
  // ????? Quand j'enlève required des champs input password et email, la condition if (!email || !password) fonctionne, pourquoi ?

  if (!email || !password) {
    window.alert("Email and password cannot be empty.");
    return;
  }

  // Préparer les données à envoyer au serveur, en utilisant un objet.
  // Cet objet doit contenir les clés email et password.

  const idData = {
    email: email,
    password: password,
  };

  // Envoyer un requete POST à l'URL "http://localhost:5678/api/users/login"

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(idData),
  });

  const data = await response.json();

  // Créer une condition si le token existe, stockez-le dans le local storage et redirigez l'utilisateur vers la page index.html.

  if (data.token) {
    window.localStorage.setItem("token", data.token);
    window.location.replace("index.html");
  } else {
    window.alert("Wrong email or password.");
  }
});
