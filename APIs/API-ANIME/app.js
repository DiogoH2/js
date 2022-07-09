const getAnimeUrl = id => `https://kitsu.io/api/edge/anime/${id}`

const generateAnimePromises = () => Array(160).fill().map((_, index) => fetch(getAnimeUrl(index + 1)).then(response => response.json()))

const generateHTML = animes => animes.reduce((accumulator, anime) => {
    

    accumulator += `
         <li class="card">
             <h2>${anime.data.id}. ${anime.data.attributes.titles.en}</h2>
             <h3>${anime.data.attributes.titles.ja_jp}</h3>
             <img glass="card-image" alt="${anime.data.attributes.slug}"
            src="${anime.data.attributes.posterImage.tiny}"/>
             <p>${anime.data.type}</p>
         </li>`
    return accumulator
}, '')

const insertAnimes = animes => {
    const ul = document.querySelector('[data-js="animes"]')
    ul.innerHTML = animes
}



const animesPromises = generateAnimePromises()

Promise.all(animesPromises)
    .then(generateHTML)
    .then(insertAnimes)
