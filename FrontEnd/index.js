console.log("Hello")

async function getWorks(){
    const reponse = await fetch("http://localhost:5678/api/works");
    const worksList = await reponse.json();
    console.log("works", worksList)    

// Recupérer la div gallery du fichier index.html: 
// const gallery = document.querySelectorAll(".gallery");
    let gallery = document.querySelector(".gallery");
    console.log(gallery)

    for (let i = 0; i < worksList.length; i++) {
        console.log(worksList[i].title)
        console.log(worksList[i].image)
// Créer la figure avec l'image, titre et ajouter en tant qu'enfant à gallery (append child)
        
        let figureElement= document.createElement("figure")

        let imageElement= document.createElement("img")
        // let imageUrl = document.createElement("src")
        imageElement.setAttribute("src", "imageUrl")  
        imageElement.src = worksList[i].imageUrl
    
        imageElement.setAttribute("alt", "textfigure")  
        imageElement.innerText = worksList[i].textfigure

        let figCaption = document.createElement("figcaption")
        figCaption.innerText = worksList[i].title
        
       
        figureElement.appendChild(imageElement)
        figureElement.appendChild(figCaption)

        gallery.appendChild(figureElement);
    


   }

}

getWorks()

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