const listaPokemon = [
    "Pokemon/Bulbasaur.gif",
    "Pokemon/Bulbasaur-S.gif",
    "Pokemon/Ivysaur.gif",
    "Pokemon/Ivysaur-S.gif",
    "Pokemon/Venusaur.gif",
    "Pokemon/Venusaur-S.gif",
    "Pokemon/Charmander.gif",
    "Pokemon/Charmander-S.gif",
    "Pokemon/Charmeleon.gif",
    "Pokemon/Charmeleon-S.gif",
    "Pokemon/Charizard.gif",
    "Pokemon/Charizard-S.gif",


    // aqui van los pokemon
];

let vida = 0;
let contador = 0;
let derrotados = [];
let pokemonActual = "";

const pokemonImg = document.getElementById('pokemon-img');
const vidaText = document.getElementById('vida');
const contadorTotal = document.getElementById('contador-total');
const derrotadosDiv = document.getElementById('derrotados');

// Cargar datos si existen
window.onload = () => {
    const clicksGuardados = localStorage.getItem("clicksTotales");
    const derrotadosGuardados = JSON.parse(localStorage.getItem("pokemonsDerrotados"));
    const vidaGuardada = localStorage.getItem("vidaActual");
    const pokemonGuardado = localStorage.getItem("pokemonActual");

    if (clicksGuardados) {
        contador = parseInt(clicksGuardados);
        contadorTotal.textContent = `Clicks Totales: ${contador}`;
    }

    if (derrotadosGuardados) {
        derrotados = derrotadosGuardados;
        derrotados.forEach(poke => agregarDerrotado(poke));
    }

    if (vidaGuardada && pokemonGuardado) {
        vida = parseInt(vidaGuardada);
        pokemonActual = pokemonGuardado;
        pokemonImg.src = pokemonActual;
        vidaText.textContent = `Vida: ${vida}`;
    } else {
        nuevoPokemon();
    }
};

// Boton de ataque
document.getElementById('click-button').addEventListener('click', () => {
    vida--;
    contador++;
    actualizar();

    if (vida <= 0) {
        if (!derrotados.includes(pokemonActual)) {
            derrotados.push(pokemonActual);
            agregarDerrotado(pokemonActual);
        }
        limpiarPokemonActual();
        nuevoPokemon();
    }
});

// aquí se actualizan los contadores y vida
function actualizar() {
    vidaText.textContent = `Vida: ${vida}`;
    contadorTotal.textContent = `Clicks Totales: ${contador}`;
    localStorage.setItem("clicksTotales", contador);
    localStorage.setItem("pokemonsDerrotados", JSON.stringify(derrotados));
    localStorage.setItem("vidaActual", vida);
    localStorage.setItem("pokemonActual", pokemonActual);
}

// Esto muestra los pokemon derrotados
function agregarDerrotado(imgSrc) {
    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.width = "50px";  // esto cambia el tamaño de los pokemon derrotados
    img.style.margin = "5px";

    // Si el Pokémon es "shiny" (contiene "-S" en el nombre), el borde será dorado
    if (esEspecial(imgSrc)) {
        img.style.border = "2px solid gold";  // Borde dorado solo para shiny
    } else {
        img.style.border = "2px solid black";  // Borde negro para los demás Pokémon
    }

    img.style.borderRadius = "5px";  // Un borde redondeado opcional
    derrotadosDiv.appendChild(img);
}

// Función para detectar si un Pokémon es "especial" (shiny) (nombre que contiene "-S")
function esEspecial(nombre) {
    return nombre.includes("-S");
}

function nuevoPokemon() {
    let elegido;
    do {
        const indice = Math.floor(Math.random() * listaPokemon.length);
        elegido = listaPokemon[indice];
    } while (esEspecial(elegido) && Math.random() > 0.01); // 1% de probabilidad si es especial

    pokemonActual = elegido;
    vida = Math.floor(Math.random() * 91) + 10; // Vida entre 10 y 100
    pokemonImg.src = pokemonActual;
    vidaText.textContent = `Vida: ${vida}`;

    localStorage.setItem("vidaActual", vida);
    localStorage.setItem("pokemonActual", pokemonActual);
}

// Esto elimina de tu save el pokemon derrotado y añade al nuevo
function limpiarPokemonActual() {
    localStorage.removeItem("vidaActual");
    localStorage.removeItem("pokemonActual");
}

// Botón de reset
document.getElementById('reset-button').addEventListener('click', () => {
    if (confirm("¿Seguro que quieres resetear todo tu progreso?")) {
        localStorage.clear();
        location.reload();  // Recarga la página para empezar de nuevo
    }
});
