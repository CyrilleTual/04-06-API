export function toDisplay (films, search = false) {

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
        movieTitle.textContent = film.original_title;
        if(film.poster_path)moviePic.src=imgUrl;
        movieCount.textContent = `Vote Count : ${film.vote_count}`;
        movieAvg.textContent = `Vote average : ${film.vote_average}`;
        movieRelease.textContent = `Release : ${(new Date(film.release_date).toLocaleDateString())}`;
        movieOverview.textContent = film.overview;

         // injection dans le DOM
        movieTxt.append (movieCount, movieAvg, movieRelease, movieOverview)

        // dans le cas d'une recherche on recupérer le tableau d'info de producteurs:

        if (search){

            let ArrayProducts = film.infoProducers;
            // si il est non vide on va le parcourir 
            if (ArrayProducts !== []){

                let ul = document.createElement("ul");

                for (const producer of ArrayProducts) {
                    let li = document.createElement("ul");
                    let producerName = producer.name;
                    let producerWebSite = producer.urlOfSite;
                    li.textContent = `Producteur : ${producerName}`;
                    ul.append(li);
                    if (producerWebSite !== ""){
                        let li = document.createElement("ul");
                        let a = document.createElement("a");
                        a.setAttribute('href', producerWebSite )
                        a.setAttribute('title', 'website')
                        a.textContent = `${producerWebSite}`;
                        li.append(a);
                        ul.append(li);
                    }
                }
                movieTxt.append(ul);
            }   
        }     
        art.append(movieTitle,moviePic,movieTxt);
        anchor.append(art);
    }

}