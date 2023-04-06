

/// capture du champs de recherche:

const searchInput = document.getElementById("search");

let toSearch = "";

function filmsToFind(toFind) {

const API_KEY   = "9c6de8c116e01800dc9c56fe546028f4";
const BASE_URL  = "https://api.themoviedb.org/3"
const SEARCH  = "search";
const MOVIES    = "movie";

let urlReq1= `${BASE_URL}/${SEARCH}/${MOVIES}?api_key=${API_KEY}`

fetch(urlReq1)

    .then (res =)





    // .then (res => res.json())
    // .then (datas =>  {
    //     console.log (datas.results)
    //     //toDisplay (datas.results)
    // })



}










window.addEventListener('DOMContentLoaded', () => {

        // ecoute sur le texte au fur et à mesure de la frappe
        searchInput.addEventListener('keyup', function(e){
        filmsToFind(e.target.value)
    })
})
