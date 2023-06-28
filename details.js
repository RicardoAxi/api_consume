// Referencia del Dom donde se obtienen los detalles
const pokemonDetails = document.getElementById('pokemonDetails');

// Obtención de parametros por URL
const urlParams = new URLSearchParams(window.location.search);
const types = urlParams.get('types');
const id = urlParams.get('id');

//Nueva petición a la API by ID
getPokemonDetails(id)
    .then(pokemon => {
        // llamada de función para los detalles
        showPokemonDetails(types, pokemon);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Función para obtener más detalles del Pokémon desde la API
async function getPokemonDetails(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('No se pudo obtener la información del Pokémon.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Función para mostrar los detalles del Pokémon en la interfaz
function showPokemonDetails(types, pokemon) {
    // Maquetado de los detalles
    const detailsContent = document.createElement('div');
    detailsContent.innerHTML = `
    <p>Tipos: ${types}</p>
    <p>ID: ${pokemon.id}</p>
    <p>Altura: ${pokemon.height / 10} m</p>
    <p>Peso: ${pokemon.weight / 10} kg</p>
    <p>Habilidades: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
    <p>Stats:</p>
    <ul>
      ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
    </ul>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="img-fluid">
  `;

    // Agrega los detalles del Pokémon al contenedor
    pokemonDetails.appendChild(detailsContent);
}
