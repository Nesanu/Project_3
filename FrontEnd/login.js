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
  await response.json();

  window.localStorage.setItem("token", response.token);
  console.log(token);
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
