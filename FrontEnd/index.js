console.log("Hello")


let worksList = []

async function getWorks(){
    const reponse = await fetch("http://localhost:5678/api/works");
    worksList = await reponse.json()
    console.log("works", worksList)    

// Recupérer la div gallery du fichier index.html: 
// const gallery = document.querySelectorAll(".gallery");
    let gallery = document.querySelector(".gallery")
    console.log(gallery)

    for (let i = 0; i < worksList.length; i++) {
        console.log(worksList[i].title)
        console.log(worksList[i].image)
// Créer la figure avec l'image, titre et ajouter en tant qu'enfant à gallery (append child)
        
        let figureElement = document.createElement("figure")

        let imageElement = document.createElement("img")
        //let imageUrl = document.createElement("src")
        //imageElement.setAttribute("src", worksList[i].imageUrl)  
        imageElement.src= worksList[i].imageUrl
    
        imageElement.setAttribute("alt", worksList[i].title)
        //imageElement.innerText = worksList[i].title

        let figCaption = document.createElement("figcaption")
        figCaption.innerText = worksList[i].title
        
       
        figureElement.appendChild(imageElement)
        figureElement.appendChild(figCaption)

        gallery.appendChild(figureElement);

   }

}

getWorks()


async function getCategories(){
    const reponse = await fetch("http://localhost:5678/api/categories");
    const categoriesList = await reponse.json();
    console.log("categories", categoriesList)
    
    // Recupérer la div filtres-travaux du fichier index.html: 
    // let categories = document.querySelector(".categories"); ?

    let filtres = document.querySelector(".flex-row-center")
    console.log(filtres)

    for (let i = 0; i < categoriesList.length; i++) {
        console.log(categoriesList[i].name)
        

// Créer le filtre des travaux document.createElement et ajouter en tant qu'enfant à la div 'categories' 
// (append child)
    let buttonElement = document.createElement("button")
    buttonElement.setAttribute("class","btn-filtres")
    buttonElement.innerText = "Tous"
    filtres.appendChild(buttonElement)
    console.log(categoriesList[i].name)

    buttonElement = document.createElement("button")
    buttonElement.setAttribute("class","btn-filtres")
    buttonElement.innerText = categoriesList[i].name
    filtres.appendChild(buttonElement)

    buttonElement.addEventListener("click", () => {
        console.log(categoriesList[i].name)
        filterWorksByCategory(categoriesList[i].id)
    } )

} 


}

function filterWorksByCategory(categoryId) {
    console.log(categoryId)

    

//    Creer le filter, actualiser l'affichage (regarder la fonction get works)
}


const boutonFiltrer = document.querySelector(".flex-row-center");

boutonFiltrer.addEventListener("click", function () {
   const filterWorksByCategory= categoriesWorks.filter(function (worksList) {
       return ?
    });

   });
   

   var arrByID = arr.filter(filtrerParID);

console.log("Tableau filtré\n", arrByID);


// console.log("Nombre d'éléments invalides = ", elementsInvalides);


getCategories()







    // CHAT GPT:Il faut ajouter des boutons ou des sélecteurs pour permettre aux utilisateurs 
    // de choisir une catégorie.

    // function filtrerParCategorie(categorie) {
    //     const images = document.querySelectorAll('.image');
    //     images.forEach(image => {
    //       const cat = image.getAttribute('data-category');
    //       if (categorie === 'tous' || cat === categorie) {
    //         image.style.display = 'block';
    //       } else {
    //         image.style.display = 'none';
    //       }
    //     });
    //   }

    // Ajoutez des événements pour le filtrage : des gestionnaires d'événements aux 
    // éléments de filtrage (boutons, sélecteurs, etc.) pour appeler la fonction de filtrage 
    // lorsque l'utilisateur fait une sélection.

    // document.getElementById('bouton-catégorie1').addEventListener('click', () => {
    //     filtrerParCategorie('catégorie1');
    //   });
      
    //   document.getElementById('bouton-catégorie2').addEventListener('click', () => {
    //     filtrerParCategorie('catégorie2');
    //   });
      
    //   // Pour le bouton "Tous les projets"
    //   document.getElementById('bouton-tous').addEventListener('click', () => {
    //     filtrerParCategorie('tous');
    //   });

    // Appelez la fonction de filtrage initialement pour afficher toutes les images.

    // filtrerParCategorie('tous');
      
      









    



// // CHAT GPT: Supposons que data contient les URLs des images récupérées depuis votre API
// const imageUrls = ['url_image_1', 'url_image_2', 'url_image_3']; 

// // Supposons que galleryElement est l'élément DOM où vous souhaitez afficher vos images
// const galleryElement = document.getElementById('votre_galerie_id');

// // Parcourez les URLs des images et ajoutez-les à la galerie
// imageUrls.forEach(url => {
//   const imgElement = document.createElement('img'); // Créez un élément image
//   imgElement.src = url; // Définissez l'URL de l'image
//   galleryElement.appendChild(imgElement); // Ajoutez l'image à la galerie
// });

// 



// export function ajoutWorks() {
//     const worksElements = document.querySelectorAll(".gallery");
    
//     for (Let i = 0; i < worksElements.length; i++) {
//         worksElements[i].addEventListener("click", async function (event){
//             /* ... */
//         });       
//     }     
// }

// function genererWorks(works){
//     for (let i = 0; i < works.length; i++){

//         ajoutWorks();
//     }
// }

// let gallery = document.querySelectorAll("querySelectorAll")
// gallery.innerHTML = div