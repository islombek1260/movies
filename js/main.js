"use strict";

movies.splice(100);

// ------ NORMALIZE ALL MOVIES--------//

const AllMovies = movies.map((movies) => {
    return {
        title: movies.title,
        year: movies.year,
        lang: movies.language,
        category: movies.categories,
        id: movies.imdbId,
        time: ` ${Math.floor(movies.runtime / 60)}h ${movies.runtime % 60}m`,
        summary: movies.summary,
        link: `https://www.youtube.com/embed/${movies.youtubeId}`,
        maxImg: movies.bigThumbnail,
        minIMG: movies.smallThumbnail,
        rating: movies.imdbRating,
    };
});


// ------ NORMALIZE ALL MOVIES -------- //

// ------------ RENDER ALL MOVIES function ------------ //

function renderAllMovies() {
    AllMovies.forEach((el) => {
        const card = createElement(
            "div",
            "card shadow-lg",
            `
     
     <img src="${el.minIMG}" alt="img" class="card-img">
     <div class="card-body">
        <h4 class="card-title">
           ${el.title}   
        </h4>
        <ul class="list-unstyled">
        <li> <strong>Year:  ${el.year}   </strong>
        </li>
        <li> <strong>Language:  ${el.lang} </strong></li>
        <li> <strong>Rating:   ${el.rating} </strong></li>
        <li> <strong>Category:  ${el.category}  </strong></li>
        <li> <strong>Runtime:  ${el.time} </strong></li>
     </ul>
 
        <div class="social d-flex">
           <a href="${el.link}" target="_blank" class="btn btn-danger m-2" id="trailer"> See trailer </a>
           <button class="btn btn-primary m-2" data-read="${el.id}" id="read-more">
              Read more &#8594
           </button>
 
           <button class="btn btn-warning m-2" data-add="${el.id}" id="add-bookmark">
              Add to bookmark
           </button>
        </div>
     </div>`
        );

        $(".wrapper").appendChild(card);
    });
}

renderAllMovies();

// ---------------- FIND FILMS FUNCTIONS ---------------- //

const findFilm = (regexp, rating = 0, category) => {
    if (category === "All") {
        return AllMovies.filter((film) => {
            return film.title.match(regexp) && film.rating >= rating;
        });
    }

    return AllMovies.filter((film) => {
        return (
            film.title.match(regexp) &&
            film.rating >= rating &&
            film.category.includes(category)
        );
    });
};

// --------------- FIND FILMS LISTENER ----------------- //

$("#submitForm").addEventListener("submit", () => {
    $(".wrapper").innerHTML = `<span class="loader"></span>`;

    const searchValue = $("#filmName").value;
    const filmRating = $("#filmRating").value;
    const filmCategory = $("#category").value;

    const regexp = new RegExp(searchValue, "gi");

    const searchResult = findFilm(regexp, filmRating, filmCategory);

    console.log(searchResult);

    setTimeout(() => {
        if (searchResult.length > 0) {
            searchResultsRender(searchResult);
            $('.card-res').classList.remove('d-none');

            if (searchResult.length == 1) {
                $('#res').innerHTML = `<strong >${searchResult.length}</strong> movie found`;
            } else {
                $('#res').innerHTML = `<strong >${searchResult.length}</strong> movies found`
            }

        } else {
            $('.card-res').classList.add('d-none');
            $('.wrapper').innerHTML = `<h1 class="text-center text-danger">Movie not found</h1>`;
        }
    }, 2000)
});

function searchResultsRender(data = []) {
    $(".wrapper").innerHTML = "";
    data.forEach((el) => {
        const card = createElement(
            "div",
            "card shadow-lg",
            `
        
        <img src="${el.minIMG}" alt="img" class="card-img">
        <div class="card-body">
           <h4 class="card-title">
              ${el.title}   
           </h4>
           <ul class="list-unstyled">
              <li> <strong>Year:  ${el.year}   </strong>
              </li>
              <li> <strong>Language:  ${el.lang} </strong></li>
              <li> <strong>Rating:   ${el.rating} </strong></li>
              <li> <strong>Category:  ${el.category}  </strong></li>
              <li> <strong>Runtime:  ${el.time} </strong></li>
           </ul>
    
            <div class="social d-flex">
                <a href="${el.link}" target="_blank" class="btn btn-danger m-2" id="trailer"> See trailer </a>
                <button class="btn btn-primary m-2" data-read="${el.id}" id="read-more">
                   Read more &#8594
                </button>
 
                 <button class="btn btn-warning m-2" data-add="${el.id}" id="add-bookmark">
                     Add to bookmark
                 </button>
            </div>
    
        </div>`
        );

        $(".wrapper").appendChild(card);
    });
}




// -------------------------- DYNAMIC CATEGORIES ------------------------- //

const dynamicCategory = () => {
    let category = [];

    AllMovies.forEach((e) => {
        e.category.forEach((el) => {
            if (!category.includes(el)) {
                category.push(el);
            }
        });
    });

    category.sort();
    category.unshift("All");
    category.forEach((el) => {
        const option = createElement("option", "item-option", el);
        $("#category").appendChild(option);
    });
};

dynamicCategory();

// ------------------ SHOW MODAL  ------------------------------ //

$(".wrapper").addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-primary")) {
        const idMovie = e.target.getAttribute("data-read");
        showModal(idMovie);
        $('.modal-window').classList.remove('modal-hide');
    }
});


function showModal(ID) {
    const filmItem = AllMovies.filter((e) => {
        return e.id == ID;
    });

    filmItem.forEach((e) => {

        const row = createElement('div', 'row',
            `<div class="col-md-4">
                    <img src="${e.minIMG}" alt="cover" class="img-fluid">
                 </div>
                 <div class="col-md-6">
                    <h4 class="text-primary">${e.title}</h4>
                    <ul class="list-group">
                       <li class="list-group-item">Rating: ${e.rating} </li>
                       <li class="list-group-item">Year: ${e.year} </li>
                       <li class="list-group-item">Runtime: ${e.time} </li>
                       <li class="list-group-item">Category: ${e.category} </li>
                    </ul>
                 </div>
                 <div class="col-md-12 mt-4">
                    <h4 class="text-danger"> ${e.title} </h4>
                    <p> ${e.summary}</p>
             </div>`);
        $('.modal-content').appendChild(row);
    })
}


$('#close').addEventListener('click', () => {
    console.log("ok");
    $('.modal-window').classList.add('modal-hide');
    $('.modal-content').innerHTML = "";
    console.log("ok");
})


window.addEventListener('click', (e) => {

    if (e.target.classList.contains('modal-window')) {
        $('#close').classList.toggle('animate')
        console.log("ok");
    }

})

// --------- SHOW MODAL ENDED -------------------- //