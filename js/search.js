import { toDisplay } from "./display.js";
import { filmsToFind, findProd, findWebSite } from "./fetchFunctions.js";

const searchInput = document.getElementById("search");

async function search (toFind){
    let result = await filmsToFind(toFind)
    addDetails(result)
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


/**
 * Ecouteur sur le champ de recherche 
 */
window.addEventListener('DOMContentLoaded', () => {
        // ecoute sur le texte au fur et à mesure de la frappe
        searchInput.addEventListener('keyup', function(e){
        //filmsToFind(e.target.value)
        search(e.target.value)
    })
})
