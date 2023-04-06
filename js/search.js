import { toDisplay } from "./display.js";

/// capture du champs de recherche:
const searchInput = document.getElementById("search");
const API_KEY   = "9c6de8c116e01800dc9c56fe546028f4";
const BASE_URL  = "https://api.themoviedb.org/3"
const SEARCH  = "search";
const MOVIES    = "movie";
let producers = null;
let MOVIE_ID = null; 

function filmsToFind(toFind) {

    let urlReq1= `${BASE_URL}/${SEARCH}/${MOVIES}?api_key=${API_KEY}&query=${toFind}`
    fetch(urlReq1)
        .then (res => res.json())
        .then (datas => {
            // on passe le tableau de film à une seconde fonction 
            // pour recherche de compléments
            addDetails(datas.results)
        })
}

// rechercher de la boite de prod et d'un lien vers celle-ci
// /movie/{movie_id}
function addDetails (arrayOfFilms){
    // recupération de l'id pour chaque film 
    for (const film of arrayOfFilms) {
        // recupération des info boite de prod et lien 
        let prod = findProd(film.id)
        console.log (prod)   
    }

    toDisplay (arrayOfFilms)

}


function findProd(id){
    let urlReq= `${BASE_URL}/${MOVIES}/${id}?api_key=${API_KEY}`
     fetch(urlReq)
        .then (res => res.json())
        .then (film => {
            // recup des producteurs ( array)
            producers = film.production_companies;
            console.log (producers)
            return (producers);

            // on boucle pour recupérer chaque nom de compagnie
            for (const producer of producers) {
                let producerName = producer.name;
                let producerId = producer.id;
                //return "toto"
                console.log(film)
                console.log(producerName, producerId)
            }
            
        })

}









// au final on passe pour affichage -> toDisplay (datas.results)







window.addEventListener('DOMContentLoaded', () => {
        // ecoute sur le texte au fur et à mesure de la frappe
        searchInput.addEventListener('keyup', function(e){
        filmsToFind(e.target.value)
    })
})
