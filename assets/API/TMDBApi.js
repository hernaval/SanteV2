// API/TMDBApi.js

const API_TOKEN = "3588fdbc8c26db8ec7e9750f30e0b4b3";
export function getFilmsFromApiWithSearchedText (text) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text
    return fetch(url)
    .then(
      (Response)=>Response.json())
    .catch(error=>console.error(error))
  }
  export default getFilmsFromApiWithSearchedText