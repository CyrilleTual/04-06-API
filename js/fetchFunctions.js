const API_KEY   = "9c6de8c116e01800dc9c56fe546028f4";
const BASE_URL  = "https://api.themoviedb.org/3"
const SEARCH    = "search";
const MOVIES    = "movie";
const TRENDING  = "trending";
const PERIOD    = "week"

/// films tendance de la semaine 
export async function lastWeek(){

    let urlReq1 = `${BASE_URL}/${TRENDING}/${MOVIES}/${PERIOD}?api_key=${API_KEY}`
    let datas   = await (await fetch(urlReq1)).json();
    return datas.results;
}

/// tableau de films en fonction de la saisie dans le champ de recherche
export async function filmsToFind(toFind) {
    let urlReq1 = encodeURI(`${BASE_URL}/${SEARCH}/${MOVIES}?api_key=${API_KEY}&query=${toFind}`);
    let datas   = await (await fetch(urlReq1)).json();
    return (datas.results);    
}

// recupère un tableau de producteurs à partir d'un id de film
export async function findProd(idFilm){
    let urlReq  = `${BASE_URL}/${MOVIES}/${idFilm}?api_key=${API_KEY}`
    let datas   = await (await fetch(urlReq)).json();
    return (datas.production_companies)   
}

// recupère le site d'un producer depuis id du producteur 
export async function findWebSite(producerId){
    let urlReq  =`${BASE_URL}/company/${producerId}?api_key=${API_KEY}`;
    let datas   = await(await fetch(urlReq)).json();
    return(datas.homepage)     
}