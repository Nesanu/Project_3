console.log("Hello");

if (!localStorage.getItem("token")) {
  console.log("token not found");

  document.querySelector("#blackBloc").style.display = "none";
  document.querySelector("#filtres").style.display = "flex";
  document.querySelector("#log-in").style.display = "block";
  document.querySelector("#log-out").style.display = "none";
} else {
  console.log("token found");
  // document.querySelector("#btn-edit").style.display = "block";
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
  // let categories = document.querySelector(".categories");

  let filtres = document.querySelector(".flex-row-center");
  console.log(filtres);

  let buttonElement = document.createElement("button");
  buttonElement.setAttribute("class", "btn-filtres");
  // buttonTous = document.createElement("Tous");
  buttonElement.innerText = "Tous";
  // // Add event listener to the 'Tous' button
  buttonTous.addEventListener("click", () => {
    fillGallery(resultat);
  });
  // fillGallery(arrayOfWork);
  // });

  filtres.appendChild(buttonElement);
  buttonElement.addEventListener("click", () => {
    console.log(categoriesList[i].name);
    filterWorksByCategory(categoriesList[i].id);
  });

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

    let imageElement = document.createElement("img");

    imageElement.src = arrayOfWork[i].imageUrl;

    imageElement.setAttribute("alt", arrayOfWork[i].name);

    let figCaption = document.createElement("figcaption");
    figCaption.innerText = arrayOfWork[i].title;

    figureElement.appendChild(imageElement);
    figureElement.appendChild(figCaption);

    gallery.appendChild(figureElement);
  }
}

// Pour afficher toutes les images au click du bouton 'Tous', ajouter une condition 'if'
// dans la fonction filterWorksByCategory(categoryId),
// si le paramètre du id est '0', affichez tous les résultats.
//;

function filterWorksByCategory(categoryId) {
  console.log(categoryId);

  // If the categoryId is '0', return all works
  if (categoryId === "0") {
    return arrayOfWork[i];
    // return resultat;
    // return worksList[i].id
    //   fillGallery(worksList);
  } else {
    // Otherwise, filter the works by category

    console.log("Tous");
  }

  // document.getElementById("tousButton").addEventListener("click", function () {
  //   let works = filterWorksByCategory("0");
  //   // Update your gallery with the works
  // });

  let resultat = worksList.filter((work) => work.categoryId === categoryId);
  console.log(resultat);

  fillGallery(resultat);
}

getCategories();
