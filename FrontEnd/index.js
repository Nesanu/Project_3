if (!localStorage.getItem("token")) {
  document.querySelector("#blackBloc").style.display = "none";
  document.querySelector("#filtres").style.display = "flex";
  document.querySelector("#log-in").style.display = "block";
  document.querySelector("#log-out").style.display = "none";
} else {
  document.querySelector("#blackBloc").style.display = "flex";
  document.querySelector("#filtres").style.display = "none";
  document.querySelector("#log-in").style.display = "none";
  document.querySelector("#log-out").style.display = "block";
}

if (!localStorage.getItem("token")) {
  document.querySelector(".ipen_modifier").style.display = "none";
} else {
  document.querySelector(".ipen_modifier").style.display = "block";
}

let worksList = [];

async function getWorks() {
  const reponse = await fetch("http://localhost:5678/api/works");
  worksList = await reponse.json();
  fillGallery(worksList);
}

getWorks();

async function getCategories() {
  const reponse = await fetch("http://localhost:5678/api/categories");
  const categoriesList = await reponse.json();

  // Retrieve the filters-works div from the index.html file

  let filtres = document.querySelector(".flex-row-center");

  let buttonElement = document.createElement("button");
  buttonElement.setAttribute("class", "btn-filtres");

  buttonElement.innerText = "Tous";
  buttonElement.addEventListener("click", () => {
    fillGallery(worksList);
  });
  filtres.appendChild(buttonElement);

  // Check if the 'Tous' button should be active on page load
  if (
    localStorage.getItem("activeCategory") === "all" ||
    !localStorage.getItem("activeCategory")
  ) {
    buttonElement.classList.add("active");
    buttonElement.style.backgroundColor = "#1D6154";
  }

  // Save the active category to localStorage when the 'Tous' button is clicked
  buttonElement.addEventListener("click", () => {
    localStorage.setItem("activeCategory", "all");
  });

  for (let i = 0; i < categoriesList.length; i++) {
    // Create the filter for works and append it as a child to the 'categories' div

    buttonElement = document.createElement("button");
    buttonElement.setAttribute("class", "btn-filtres");
    buttonElement.innerText = categoriesList[i].name;
    filtres.appendChild(buttonElement);

    buttonElement.addEventListener("click", () => {
      filterWorksByCategory(categoriesList[i].id);

      // Keep the filter button pressed and active when clicked and deactivate it when the button is changed
      document.querySelectorAll(".btn-filtres").forEach((button) => {
        button.addEventListener("click", () => {
          document.querySelectorAll(".btn-filtres").forEach((btn) => {
            btn.classList.remove("active");
            btn.style.backgroundColor = "";
          });
          button.classList.add("active");
          button.style.backgroundColor = "#1D6154";
        });
      });
    });
  }
}

function fillGallery(arrayOfWork) {
  let gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  for (let i = 0; i < arrayOfWork.length; i++) {
    //  Create figure with image, title and append as a child to gallery (append child)

    let figureElement = document.createElement("figure");
    figureElement.setAttribute("id", "gallery-image" + arrayOfWork[i].id);
    let imageElement = document.createElement("img");

    imageElement.src = arrayOfWork[i].imageUrl;

    imageElement.setAttribute("alt", arrayOfWork[i].title);

    let figCaption = document.createElement("figcaption");
    figCaption.innerText = arrayOfWork[i].title;

    figureElement.appendChild(imageElement);
    figureElement.appendChild(figCaption);

    gallery.appendChild(figureElement);
  }
}

function filterWorksByCategory(categoryId) {
  let resultat = worksList.filter((work) => work.categoryId === categoryId);

  fillGallery(resultat);
}

getCategories();
