import { toDisplay } from "./display.js";

const searchInput = document.getElementById("search");
const API_KEY   = "9c6de8c116e01800dc9c56fe546028f4";
const BASE_URL  = "https://api.themoviedb.org/3"
const SEARCH  = "search";
const MOVIES    = "movie";

/**
 * retourne un tableau en fonction de la saisie dans le champ de recherche
 */
function filmsToFind(toFind) {
    let urlReq1= `${BASE_URL}/${SEARCH}/${MOVIES}?api_key=${API_KEY}&query=${toFind}`
    fetch(urlReq1)
        .then (res => res.json())
        .then (datas => {
            // on passe le tableau de film à une seconde fonction 
            // pour recherche de compléments d'information
            addDetails(datas.results)
        })
}

/**
 * rechercher de la boite de prod et d'un lien vers celle-ci
 */
async function addDetails (arrayOfFilms){
    let newArrayOfProducers;
    let newArrayOfFilms = [];

    for await (const film of arrayOfFilms) {  // pour chaque film de la selection

        newArrayOfProducers = [] // nouveau tableau + complet
        // recupération d'un tableau des producteurs 
        let arrayOfProducers = await findProd(film.id);

        // pour chaque producteur on va chercher son website
        for await (const producer of arrayOfProducers) {

            let producerId = producer.id;
            producer.urlOfSite = await findWebSite(producerId);

            // dans chaque producer on ajoute une clef avec l'url du web site
            newArrayOfProducers.push(producer);  
        }
        // pour chaque film on ajoute une clef avec les producers en détail
        film.infoProducers = newArrayOfProducers;
        // on reconstitue un nouveau tableau de films complété 
        newArrayOfFilms.push(film);
    }

    // appel de l'affichage avec le nouveau tableau de films
    toDisplay (newArrayOfFilms, true)

}


// recupère un tableau de producteurs à partir d'un id de film
async function findProd(idFilm){
    let urlReq= `${BASE_URL}/${MOVIES}/${idFilm}?api_key=${API_KEY}`
    let resp = await fetch(urlReq)
        .then (res => res.json())
        .then (film => {return (film.production_companies)})
    return (resp)   
}

// recupère le site d'un producer depuis sont id
async function findWebSite(producerId){
    let urlReq=`${BASE_URL}/company/${producerId}?api_key=${API_KEY}`
    let resp = await fetch(urlReq)
        .then (res => res.json())
        .then (producer => { return(producer.homepage)})
    return (resp)    
}

/**
 * Ecouteur sur le champ de recherche 
 */
window.addEventListener('DOMContentLoaded', () => {
        // ecoute sur le texte au fur et à mesure de la frappe
        searchInput.addEventListener('keyup', function(e){
        filmsToFind(e.target.value)
    })
})
