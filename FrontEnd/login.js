const form = document.querySelector(".form-login");
// const form = document.getElementById("#form-login");
form.addEventListener("submit", async (event) => {
  console.log(event);

  event.preventDefault();

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  // Verifier si le email et password sont vides. Si les champs sont vides affichez alerte

  const idData = {
    email: email,
    password: password,
  };

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(idData),
  });

  const data = await response.json();

  // Créer une condition si le token existe: if ... else

  if (data.token) {
    window.localStorage.setItem("token", data.token);
    window.location.replace("index.html");
  } else {
    window.alert("Wrong email or password.");
  }
});

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
//   const name = document.getElementById("name").value;
//   window.alert(name); "name" non relevant dans ma mon fichier login.html

// window.location.href = "index.html";
