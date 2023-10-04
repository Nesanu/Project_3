console.log("Hello")

const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

fetch("http://localhost:5678/api/works").then(function() {
    console.log()
}

export function ajoutWorks() {
    const worksElements = document.querySelectorAll(".gallery");
    
    for (Let i = 0; i < worksElements.length; i++) {
        worksElements[i].addEventListener("click", async function (event){
            /* ... */
        });       
    }     
}

function genererWorks(works){
    for (let i = 0; i < works.length; i++){

        ajoutWorks();
    }
}
