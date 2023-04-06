import { toDisplay } from "./display.js";

const API_KEY   = "9c6de8c116e01800dc9c56fe546028f4";
const BASE_URL  = "https://api.themoviedb.org/3"
const TRENDING  = "trending";
const MOVIES    = "movie";
const PERIOD    = "week"

let urlReq1= `${BASE_URL}/${TRENDING}/${MOVIES}/${PERIOD}?api_key=${API_KEY}`

fetch(urlReq1)
.then (res => res.json())
.then (datas =>  {
    //console.log (datas.results)

    // verification de l'existance d'une image 



    toDisplay (datas.results)
})
