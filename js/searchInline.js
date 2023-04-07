console.log('hi')

const searchInput = document.getElementById("search_inline");

/**
 * Ecouteur sur le champ de recherche 
 */
window.addEventListener('DOMContentLoaded', () => {
        // ecoute sur le texte au fur et à mesure de la frappe
        searchInput.addEventListener('keyup', function(e){
        filmsToFind(e.target.value)
    })
})


