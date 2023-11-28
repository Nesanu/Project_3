const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log(event);

  //   const name = document.getElementById("name").value;
  //   window.alert(name); "name" non relevant dans ma mon fichier login.html

  window.location.href = "index.html";
  const email = document.getElementById("email").value;
  window.alert(email);

  const password = document.getElementById("password").value;
  window.alert(password);

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: '{"email","password"}',
    // body: JSON.stringify(email, password),
  });
  return response.json();
});

window.localStorage.setItem();

// postData("http://localhost:5678/api/users/login", { userId }).then(
//   (donnees) => {
//     console.log(donnees);
//   }
// );

//   const reponse = await fetch("http://localhost:5678/api/users/login");
//   // const usersLogin = await reponse.json();
// });
// async function postLogin(url = "", donnees = {}) {

//   return response.json();
// }

// // Exemple d'implémentation pour une requête POST
// async function postData(url = "", donnees = {}) {
//   // Les options par défaut sont indiquées par *
//   const response = await fetch(url, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(donnees), // le type utilisé pour le corps doit correspondre à l'en-tête "Content-Type"
//   });
//   return response.json(); // transforme la réponse JSON reçue en objet JavaScript natif
// }

// postData("https://example.com/solution", { solution: 42 }).then((donnees) => {
//   console.log(donnees); // Les données JSON analysées par l'appel `donnees.json()`
// });
