const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log(event);

  //   const name = document.getElementById("name").value;
  //   window.alert(name); "name" non relevant dans ma mon fichier login.html

  // window.location.href = "index.html";
  const email = document.getElementById("email").value;
  window.alert(email);

  const password = document.getElementById("password").value;
  window.alert(password);

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
  console.log(data);

  window.localStorage.setItem("token", data.token);
  console.log(data.token);

  // Créer une condition: si le token existe if ... else

  let tokenOk = true;
  if (tokenOk) {
    console.log("The token exists");
  } else {
    window.alert("Wrong password");
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
