const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const pokeName = document.getElementById('pokemon-name');
const pokeId = document.getElementById('pokemon-id');
const pokeWeight = document.getElementById('weight');
const pokeHeight = document.getElementById('height');
const pokeSprite = document.getElementById('sprite');
const pokeTypes = document.getElementById('types');
const pokeHp = document.getElementById('hp');
const pokeAtk = document.getElementById('attack');
const pokeDefense = document.getElementById('defense');
const pokeSpa = document.getElementById('special-attack');
const pokeSdef = document.getElementById('special-defense');
const pokeSpeed = document.getElementById('speed');
const pokeForm = document.getElementById('form-pokemon');
const hiddenContents = document.getElementById('hidden');


const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
};

const fetchDataFactory = () =>{
    hiddenContents.style.display = `none`;
    pokeTypes.innerHTML = ``;
    pokeSprite.src = ``;
    pokeName.textContent = ``;
    pokeId.textContent = ``;
    pokeWeight.textContent = ``;
    pokeHeight.textContent = ``;
    pokeHp.textContent = ``;
    pokeAtk.textContent = ``;
    pokeDefense.textContent = ``;
    pokeSpa.textContent = ``;
    pokeSdef.textContent = ``;
    pokeSpeed.textContent = ``;

    return async () => {
        try {
            const pokeIdName = searchInput.value.toLowerCase();
            const response = await fetch (`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokeIdName}`);
        
            if (!response.ok) {
                alert("Pokémon not found")
            }

            const data = await response.json();
            displayPokemon(data);
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }
}


const displayPokemon = (data) => {
    let imgSprite = data.sprites.front_default;
    let name = data.name.toUpperCase();
    let id = data.id;
    let weight = data.weight;
    let height = data.height;
    let hp = data.stats[0].base_stat;
    let attack = data.stats[1].base_stat;
    let defense = data.stats[2].base_stat;
    let spa = data.stats[3].base_stat;
    let spdef = data.stats[4].base_stat;
    let speed = data.stats[5].base_stat;


    const themeColor = typeColor[data.types[0].type.name];

    document.querySelector('.poke-types').innerHTML = '';
    hiddenContents.style.display = "block";
    pokeSprite.src = imgSprite;
    pokeName.textContent = name;
    pokeId.textContent += id;
    pokeWeight.textContent = weight;
    pokeHeight.textContent = height;
    pokeHp.textContent = hp;
    pokeAtk.textContent = attack;
    pokeDefense.textContent = defense;
    pokeSpa.textContent = spa;
    pokeSdef.textContent = spdef;
    pokeSpeed.textContent = speed;


spanTypes(data.types)
themeStyle(themeColor);
spanTheme(data.types);

}

const spanTypes = (types) => {
    types.forEach((type) => {
        let spanElmnt = document.createElement("span");
        spanElmnt.textContent = type.type.name.toUpperCase();
        document.querySelector('.poke-types').appendChild(spanElmnt);
    });
}

const themeStyle = (color) => {
    pokeForm.style.background = `linear-gradient(135deg, rgba(198, 27, 27, 0.1), ${color})`;
}

const spanTheme = (types) => {
    let spanColor = []
    types.forEach((type) => {
        spanColor.push(typeColor[type.type.name])
    });
    document.querySelectorAll(".poke-types span").forEach((element, index) => {
        element.style.background = spanColor[index];
    });
};


searchBtn.addEventListener('click', e => {
    e.preventDefault();
    const fetchData = fetchDataFactory();
    fetchData();
    searchInput.value = ``;
})
