"use strict";

movies.splice(32000);

// --------------- NORMALIZE ALL MOVIES -------------------- //

const AllMovies = movies.map((movies) => {
    return{
        title:movies.title,
        year:movies.year,
        lang:movies.language,
        category:movies.categories,
        id:movies.imdbId,
        time:`${Math.floor(movies.runtime/60)} h, ${movies.runtime%60} m`,
        summary:movies.summary,
        link:`https://www.youtube.com/watch?v=${movies.youtubeId}`,
        naxImg:movies.bigThumbnail,
        minImg:movies.smallThumbnail,
        rating:movies.imdbRating,
    }
})

// --------------- NORMALIZE ALL MOVIES END ------------------ //


// --------------- RENDER ALL MOVIES function --------------- //

function renderAllMovies(){
    AllMovies.forEach((el) => {
        const card=createElement('div', 'card shadow', `
        <img class="card-img" src="${el.minImg}" alt="img">
        <div class="card-body">
            <h4 class="card-title">
                ${el.title}
            </h4>
            <ul class="list-unstyled">
                <li><strong>Year:</strong>${el.year}</li>
                <li><strong>Language:</strong>${el.lang}</li>
                <li><strong>Raiting:</strong>${el.rating}</li>
                <li><strong>Category:</strong>${el.category}</li>
                <li><strong>Runtime:</strong>${el.time}</li>
            </ul>
            <div class="social d-flex">

                <a class="btn btn-danger m-2" href="${el.link}" role="button">Link</a>
                <button class="btn btn-primary m-2">
                    Read more ...
                </button>
                <button class="btn btn-warning m-2">
                    Add bookmark
                </button>
            </div>
        </div>`);
        $('.wrapper').appendChild(card)
    })
}
renderAllMovies()

// --------------- FIND FILM FUNCTION --------------- //

const findFilm = (regexp, rating) => {
    console.log(regexp);
    return AllMovies.filter((film) => {
        return film.title.match(regexp) && film.rating >= rating;
    })       

}

// --------------- FIND FILM FUNCTION END ------------- //


// --------------- FIND FILM LISTENER ------------- //

$('#submitForm').addEventListener('submit', () => {

    $('.wrapper').innerHTML=`<span class="loader"></span>`;  

    const searchValue = $('#filmName').value;

    const filmRating = $('#filmRating').value;

    const regexp = new RegExp(searchValue, "gi");

    const searchResult = findFilm(regexp, filmRating);

    setTimeout(()=>{
        if(searchResult.length > 0){
            searchResultRender(searchResult);

            $('.card-res').classList.remove('d-none');

            $('#res').innerHTML=`<strong >${searchResult.length} ta ma'lumot topildi</strong>`;
            if(searchValue.length === 0) {
                $('#res').innerHTML=`<strong >${searchResult.length} ta ma'lumot topildi</strong>`;
            }

        } else {
            $('.card-res').style.display = 'none';

            $('.wrapper').innerHTML=`<h2 class="text-center text-danger>MA'LUMOT TOPILMADI</h2>`;
        }
    },2000)
})


function searchResultRender(data = []) {
    $('.wrapper').innerHTML = ""
    data.forEach((el) => {
        const card = createElement('div', 'card shadow-lg',
        `
        <img class="card-img" src="${el.minImg}" alt="img">
        <div class="card-body">
            <h4 class="card-title">
                ${el.title}
            </h4>
            <ul class="list-unstyled">
                <li><strong>Year:</strong>${el.year}</li>
                <li><strong>Language:</strong>${el.lang}</li>
                <li><strong>Raiting:</strong>${el.rating}</li>
                <li><strong>Category:</strong>${el.category}</li>
                <li><strong>Runtime:</strong>${el.time}</li>
            </ul>
            <div class="social d-flex">
                <button class="btn btn-danger m-2">
                    Trailers
                </button>
                <button class="btn btn-primary m-2">
                    Read more ...
                </button>
                <button class="btn btn-warning m-2">
                    Add bookmark
                </button>
            </div>
        </div>`);
        $('.wrapper').appendChild(card)
    })
}

// --------------- FIND FILM LISTENER END------------- //


