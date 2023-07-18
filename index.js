const moviegluAPI = {
  BASE_URL: 'https://api-gate2.movieglu.com/',
  endpoints: 'filmsNowShowing',
  headers: {
    'x-api-key': 'e5oyUbAd2jdT4mZDgcbuaJPExnVF7sG9eJcbIKKd',
    'authorization': 'Basic Tk9ORV8xMjFfWFg6MUt2RlNydXF5blQ0',
    'client': 'NONE_121',
    'api-version': 'v200',
    'geolocation': '-22;14',
    'device-datetime': '2023-07-17T07:32:42.144Z',
    'territory': 'XX',
  },// if response status code 204 - ask me about this for new data headers.
  dataEndpoints: {
    title: (movie) => movie?.film_name,
    poster: (movie) => movie?.images?.poster[1]?.medium?.film_image,
  }
};

const moviesContainer = document.getElementById('movies__container');
const input = document.getElementById('search__input');
let movies = [];

const fetchMoveisLoader = (isLoading) => {
  moviesContainer.classList.toggle('movies__container--loading', isLoading);
};

const fetchMoveisError = (isError) => {
  moviesContainer.classList.toggle('movies__container--error', isError);
};

const fetchMoveisCallback = (data) => buildMoviesList({
  layout: movieLayout, 
  data: data.films,
  dataEndpoints: moviegluAPI.dataEndpoints,
  container: moviesContainer,
});

fetchUrl({
  url: moviegluAPI.BASE_URL + moviegluAPI.endpoints,
  headers: moviegluAPI.headers,
  isLoading: (status) => fetchMoveisLoader(status),
  isError: (err) => fetchMoveisError(err),
  callback: (data) => fetchMoveisCallback(data),
});

const debounceSearchMovies = debounce((value) => {
  let found = null;

  movies?.forEach(({title, element}) => {
    const foundMovie = title.toLowerCase().includes(value);
    element.classList.toggle('movie--hidden', !foundMovie);

    if (foundMovie) {
      found ++;
    }
  });

  moviesContainer.classList.toggle('movies__container--not-found', !found);
});

input.addEventListener('input', (e) => {
  const value = e.target.value;

  debounceSearchMovies(value);
});

async function fetchUrl({
  url,
  method = 'GET',
  headers = {},
  isLoading = false,
  isError = false,
  callback = null,
}) {
  try {
    isLoading(true);

    const res = await fetch(url, {method, headers});

    if (res) isLoading(false);
    if (!res.ok) return isError(true);

    const data = await res.json();
    if (!callback) return;

    return callback(data);

  } catch (err) {
    console.log(err);
    isLoading(false);
    isError(true);
  }
}

function movieLayout(src, title) {
  return `
    <div class='movie__container'>
      <img class='movie__poster' src='${src}' alt='${title}'>
      <h3 class='movie__title'>${title}</h3>
    </div>
  `;
}

function buildMoviesList({layout, data, dataEndpoints, container}) {
  movies = data?.map(movie => {
    const title = dataEndpoints.title(movie);
    const poster = dataEndpoints.poster(movie);

    if (!title || !poster) return;

    const liElement = document.createElement('li');
    const createLayout = layout(poster, title);
    liElement.insertAdjacentHTML('beforeend', createLayout);
    const movieElement = container.appendChild(liElement);

    return {
      title: title,
      element: movieElement,
    };
  });
}

function debounce(callback, delay = 300) {
  let debounceTimeout;

  return (...args) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}