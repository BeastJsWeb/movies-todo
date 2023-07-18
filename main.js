const BASE_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=';
const API_KEY = 'b469fa8561df3ce51497700cc6adb57c';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // e.g https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg;

const input = document.getElementById('search__input');
const moviesContainer = document.getElementById('movies__container');

/* You are working on a movie database app.
  The goal is to render a list of movies (poster and title).
  Start by fetching the movies data on load.
  Then render the data into the DOM. The rendered data for each movies are an image and a title.
  Finally, implement a search/filter functionality.
  For that, we're using an input field. Whenever something is being typed into the input,
  filter down the list of movies to those whose title includes the value of the input.
  If no movies are found, display "No movies found...".
  Data then needs to be re-rendered accordingly.
  Follow the steps below.
*/

/* TASKS */
// 1. Fetch the movies data from the API,
// 2. Display the data into the DOM,
// 3. Implement a search/filter by title functionality,
// BONUS - Debounce the search function

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// TODO - 1. Fetch data


// TODO - 2. Display data into the DOM:
  // HINT - If no movies are found, display "No movies found...".
  
  /* HINT - Create elements as followed for each movies
    <div>
      <img></img>
      <h3></h3>
    </div>
  */

  // HINT - Add each created elements to moviesContainer.


// TODO - 3. Create a filter functionality
