import { toDisplay } from "./display.js";

/// capture du champs de recherche:

// Dune: Part Two
const searchInput = document.getElementById("search");
const API_KEY   = "9c6de8c116e01800dc9c56fe546028f4";
const BASE_URL  = "https://api.themoviedb.org/3"
const SEARCH  = "search";
const MOVIES    = "movie";

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
let arrayOfProducers =[];



async function addDetails (arrayOfFilms){
    
    let newArrayOfProducers;
    let newArrayOfFilms = [];

    for await (const film of arrayOfFilms) {

        newArrayOfProducers = []
        // recupération des info boite de prod et lien 
        await findProd(film.id)
        // pour chaque producteur on va chercher son website
        for await (const producer of arrayOfProducers) {
            let producerId = producer.id;
            await findWebSite(producerId);
            // dans chaque producer on ajoute une clef avec l'url du web site
            producer.urlOfSite = producerWebSite;
            newArrayOfProducers.push(producer);  
        }
        // pour chaque film on ajoute une clef avec les producers en détail
        film.infoProducers = newArrayOfProducers;
        // on reconstitue un nouveau tableau de films 
        newArrayOfFilms.push(film);
    }

    // appel de l'affichage
    toDisplay (newArrayOfFilms, true)

}


// recupère un tableau de producteurs à partir d'un id de film
async function findProd(idFilm){
    arrayOfProducers =[]
    let urlReq= `${BASE_URL}/${MOVIES}/${idFilm}?api_key=${API_KEY}`
    await fetch(urlReq)
        .then (res => res.json())
        .then (film => {
            // recup des producteurs ( array)
            arrayOfProducers=film.production_companies; 
            //film.production_companies; 
        })
}


// recupère le site d'un producer depuis sont id
let producerWebSite ="";
async function findWebSite(producerId){
    let urlReq=`${BASE_URL}/company/${producerId}?api_key=${API_KEY}`
    await fetch(urlReq)
        .then (res => res.json())
        .then (producer => {
            // recup du site Web
            producerWebSite=producer.homepage;  
        })
}









window.addEventListener('DOMContentLoaded', () => {
        // ecoute sur le texte au fur et à mesure de la frappe
        searchInput.addEventListener('keyup', function(e){
        filmsToFind(e.target.value)
    })
})
