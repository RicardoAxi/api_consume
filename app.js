// Referencias del DOM
const searchInput = document.getElementById('searchInput');
const randomButton = document.getElementById('randomButton');
const searchButton = document.getElementById('searchButton');
const pokemonInfo = document.getElementById('pokemonInfo');

// Evento click para el random buttom
randomButton.addEventListener('click', () => {
    const randomId = Math.floor(Math.random() * 150) + 1;
    getPokemonInfo('pokemon', randomId);
});

// Evento click del botón de búsqueda por nombre
searchButton.addEventListener('click', () => {
    const pokemonName = searchInput.value.trim().toLowerCase();
    if (pokemonName.length > 0) {
        getPokemonInfo('pokemon', pokemonName);
    }
});

// Función para obtener la información del Pokémon desde la API
async function getPokemonInfo(endpoint, paramValue) {
    const url = `https://pokeapi.co/api/v2/${endpoint}/${paramValue}`;

    try {
        // Solicitud a la API utilizando fetch
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('No se pudo obtener la información del Pokémon.');
            console.error('Error:', error.message);
        }
        const data = await response.json();
        // Muestra la información del Pokémon en la interfaz
        showPokemonInfo(data);
    } catch (error) {
        alert("No se encontró el Pokemón");
    }
}

// Función para mostrar la información del Pokémon en la interfaz
function showPokemonInfo(pokemon) {
    // Maqueta de la ficha del Pokemon
    const pokemonCard = document.createElement('div');
    pokemonCard.className = 'card mb-3';
    pokemonCard.innerHTML = `
    <div class="row g-0">
      <div class="col-md-4">
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="img-fluid rounded w-100">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${pokemon.name}</h5>
          <p class="card-text">ID: ${pokemon.id}</p>
          <p class="card-text">Altura: ${pokemon.height / 10} m</p>
          <p class="card-text">Peso: ${pokemon.weight / 10} kg</p>
          <button class="btn btn-primary" id="detailsButton">Detalles</button>
        </div>
      </div>
    </div>
  `;

    // Agrega la ficha del Pokémon al contenedor
    pokemonInfo.innerHTML = '';
    pokemonInfo.appendChild(pokemonCard);
    pokemonInfo.style.display = 'block';

    // Evento click del botón de detalles
    const detailsButton = document.getElementById('detailsButton');
    detailsButton.addEventListener('click', () => {
        const types = pokemon.types.map(type => type.type.name).join(', ');
        const url = `details-pokemon.html?types=${encodeURIComponent(types)}&id=${pokemon.id}`;
        window.open(url, '_blank');
    });
}
