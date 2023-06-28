const cargarDatos = async() => {
const respuesta = await fetch('https://hp-api.onrender.com/api/characters');
console.log(respuesta)
    
}

cargarDatos();