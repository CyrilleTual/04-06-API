export function toDisplay (films) {

    const anchor = document.getElementById('wrapper');

    // nettoyage de l'affichage (pour search )
    while (anchor.firstChild) {
        anchor.removeChild(anchor.firstChild);
    }

    const API_URL_IMG = "https://image.tmdb.org/t/p/original";

    // traitement des ret         
    for (const film of films) {


        // creation des éléments :    
        let art = document.createElement('article');
        let movieTitle      = document.createElement ('h2');
        
        let movieTxt        = document.createElement('div');
        let movieCount      = document.createElement('p');
        let movieAvg        = document.createElement('p');
        let movieRelease    = document.createElement('p');
        let movieOverview   = document.createElement('p');

        // traitement de l'image, si elle existe ( non null)
        let imgUrl = "";
        let moviePic = ""
        if(film.poster_path){
            imgUrl = `${API_URL_IMG}${film.poster_path}`;
            moviePic = document.createElement('img');
        };   

        // injection de contenu
        movieTitle.innerText = film.original_title;
        if(film.poster_path)moviePic.src=imgUrl;
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