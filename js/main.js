console.log ('branché')

const API_KEY   = "9c6de8c116e01800dc9c56fe546028f4";
const BASE_URL  = "https://api.themoviedb.org/3"
const TRENDING  = "trending";
const MOVIES    = "movie";
const PERIOD    = "week"

let urlReq1= `${BASE_URL}/${TRENDING}/${MOVIES}/${PERIOD}?api_key=${API_KEY}`

fetch(urlReq1)
.then (res => res.json())
.then (datas =>  {
    console.log (datas.results)
    toDisplay (datas.results)
})

function toDisplay (films) {

    const anchor = document.getElementById('wrapper');
    const API_URL_IMG = "https://image.tmdb.org/t/p/original";

    for (const film of films) {

        let imgUrl = `${API_URL_IMG}${film.poster_path}`;    

        // creation des éléments :    
        let art = document.createElement('article');
        let movieTitle      = document.createElement ('h2');
        let moviePic        = document.createElement('img');
        let movieTxt        = document.createElement('div');
        let movieCount      = document.createElement('p');
        let movieAvg        = document.createElement('p')
        let movieRelease    = document.createElement('p')
        let movieOverview   = document.createElement('p')

        // injection de contenu
        movieTitle.innerText = film.original_title;
        moviePic.src=imgUrl;
        movieCount.innerText = `Vote Count : ${film.vote_count}`;
        movieAvg.innerText = `Vote average : ${film.vote_average}`;
        movieRelease.innerText = `Release : ${(new Date(film.release_date).toLocaleDateString())}`;
        movieOverview.innerText = film.overview;

        // injection dans le DOM
        movieTxt.append (movieCount, movieAvg, movieRelease, movieOverview)
        art.append(movieTitle,moviePic,movieTxt);
        anchor.append(art);
    }

}