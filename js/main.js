import { toDisplay } from "./display.js";

const API_KEY   = "9c6de8c116e01800dc9c56fe546028f4";
const BASE_URL  = "https://api.themoviedb.org/3"
const TRENDING  = "trending";
const MOVIES    = "movie";
const PERIOD    = "week"
/**
 * recherche des films de la seamine
 */
let urlReq1= `${BASE_URL}/${TRENDING}/${MOVIES}/${PERIOD}?api_key=${API_KEY}`

fetch(urlReq1)
.then (res => res.json())
.then (datas =>  {
    toDisplay (datas.results)
})
