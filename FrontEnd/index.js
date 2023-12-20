console.log("Hello");

// if (!localStorage.getItem("token")) {
//   console.log("token not found");
//   document.querySelector("#btn-edit").style.display = "none";
//   document.querySelector(".flex-row-center").style.display = "block";
// } else {
//   console.log("token found");
//   document.querySelector("#btn-edit").style.display = "block";
//   document.querySelector(".flex-row-center").style.display = "block";
// }

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
  // let categories = document.querySelector(".categories"); ?

  let filtres = document.querySelector(".flex-row-center");
  console.log(filtres);

  let buttonElement = document.createElement("button");
  buttonElement.setAttribute("class", "btn-filtres");
  buttonElement.innerText = "Tous";

  filtres.appendChild(buttonElement);
  buttonElement.addEventListener("click", () => {
    console.log(categoriesList[i].name);
    filterWorksByCategory(categoriesList[i].id);
  });

  //   function filterByCategory(categoryId) {
  //     // Votre logique de filtrage ici
  //     console.log(`Filtrage par catégorie avec l'ID : ${categoryId}`);
  // }

  // // Appel de la fonction avec un ID de 0
  // filterByCategory(0);

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

function filterWorksByCategory(categoryId) {
  console.log(categoryId);
  // Pour afficher toutes les images au click du bouton 'Tous', ajouter une condition 'if'
  // dans la fonction filterWorksByCategory(categoryId),
  // si le paramètre du id est '0', affichez tous les résultats.
  // // filterWorksByCategory(0) ????;

  let resultat = worksList.filter((work) => work.categoryId === categoryId);
  console.log(resultat);

  fillGallery(resultat);
}

getCategories();

// CHAT GPT:Il faut ajouter des boutons ou des sélecteurs pour permettre aux utilisateurs
// de choisir une catégorie.

//     });
//   }

// Ajoutez des événements pour le filtrage : des gestionnaires d'événements aux
// éléments de filtrage (boutons, sélecteurs, etc.) pour appeler la fonction de filtrage
// lorsque l'utilisateur fait une sélection.

// document.getElementById('bouton-catégorie1').addEventListener('click', () => {
//     filtrerParCategorie('catégorie1');
//   });

//   // Pour le bouton "Tous"
//   document.getElementById('bouton-tous').addEventListener('click', () => {
//     filtrerParCategorie('tous');
//   });

// export function ajoutWorks() {
//     const worksElements = document.querySelectorAll(".gallery");

//     for (Let i = 0; i < worksElements.length; i++) {
//         worksElements[i].addEventListener("click", async function (event){
//             /* ... */
//         });
//     }
