console.log("Hello");

if (!localStorage.getItem("token")) {
  console.log("token not found");

  document.querySelector("#blackBloc").style.display = "none";
  document.querySelector("#filtres").style.display = "flex";
  document.querySelector("#log-in").style.display = "block";
  document.querySelector("#log-out").style.display = "none";
} else {
  console.log("token found");

  document.querySelector("#blackBloc").style.display = "flex";
  document.querySelector("#filtres").style.display = "none";
  document.querySelector("#log-in").style.display = "none";
  document.querySelector("#log-out").style.display = "block";
}

if (!localStorage.getItem("token")) {
  console.log("token not found");

  document.querySelector(".ipen_modifier").style.display = "none";
} else {
  console.log("token found");
  document.querySelector(".ipen_modifier").style.display = "block";
}

let worksList = [];

async function getWorks() {
  const reponse = await fetch("http://localhost:5678/api/works");
  worksList = await reponse.json();
  console.log("works", worksList);

  fillGallery(worksList);
}

getWorks();

async function getCategories() {
  const reponse = await fetch("http://localhost:5678/api/categories");
  const categoriesList = await reponse.json();
  console.log("categories", categoriesList);

  // Recupérer la div filtres-travaux du fichier index.html:

  let filtres = document.querySelector(".flex-row-center");
  console.log(filtres);

  let buttonElement = document.createElement("button");
  buttonElement.setAttribute("class", "btn-filtres");
  // buttonElement = document.createElement("tousButton");
  buttonElement.innerText = "Tous";
  buttonElement.addEventListener("click", () => {
    fillGallery(worksList);
  });
  filtres.appendChild(buttonElement);

  for (let i = 0; i < categoriesList.length; i++) {
    console.log(categoriesList[i].name);

    // Créer le filtre des travaux document.createElement et ajouter en tant qu'enfant à la div 'categories'
    // (append child)

    buttonElement = document.createElement("button");
    buttonElement.setAttribute("class", "btn-filtres");
    buttonElement.innerText = categoriesList[i].name;
    filtres.appendChild(buttonElement);

    buttonElement.addEventListener("click", () => {
      console.log(categoriesList[i].name);
      filterWorksByCategory(categoriesList[i].id);
    });
  }
}

function fillGallery(arrayOfWork) {
  let gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  for (let i = 0; i < arrayOfWork.length; i++) {
    // Créer la figure avec l'image, titre et ajouter en tant qu'enfant à gallery (append child)

    let figureElement = document.createElement("figure");
    figureElement.setAttribute("id", "gallery-image" + arrayOfWork[i].id);
    let imageElement = document.createElement("img");

    imageElement.src = arrayOfWork[i].imageUrl;

    imageElement.setAttribute("alt", arrayOfWork[i].title);
    // imageElement.setAttribute("alt", worksList[i].title);

    let figCaption = document.createElement("figcaption");
    figCaption.innerText = arrayOfWork[i].title;

    figureElement.appendChild(imageElement);
    figureElement.appendChild(figCaption);

    gallery.appendChild(figureElement);
  }
}

function filterWorksByCategory(categoryId) {
  console.log(categoryId);

  let resultat = worksList.filter((work) => work.categoryId === categoryId);
  console.log(resultat);

  fillGallery(resultat);
}

getCategories();
