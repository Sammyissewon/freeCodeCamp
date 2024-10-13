const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonTypes = document.getElementById("types");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpecialAtt = document.getElementById("special-attack");
const pokemonSpecialDef = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");
const pokemonSprite = document.getElementById("sprite-container");

const fetchData = async () => {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase();
    const res = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`
    );
    const data = await res.json();
    setPokemonInfo(data);
  } catch (err) {
    alert("Pokémon not found");
    console.err(err);
  }
};

const setPokemonInfo = (data) => {
  const { name, id, weight, height, types, sprites, stats } = data;

  pokemonName.textContent = `${name[0].toUpperCase() + name.slice(1)}`;
  pokemonId.textContent = `#${id}`;
  pokemonWeight.textContent = `Weight: ${weight}`;
  pokemonHeight.textContent = `Height: ${height}`;
  pokemonHp.textContent = stats[0].base_stat;
  pokemonSprite.innerHTML = `<img id="sprite" src = "${sprites.front_default}" alt= "${name}">`;

  pokemonAttack.textContent = stats[1].base_stat;
  pokemonDefense.textContent = stats[2].base_stat;
  pokemonSpecialAtt.textContent = stats[3].base_stat;
  pokemonSpecialDef.textContent = stats[4].base_stat;
  pokemonSpeed.textContent = stats[5].base_stat;
  pokemonTypes.innerHTML = types
    .map(
      (obj) =>
        `<span>${
          obj.type.name[0].toUpperCase() + obj.type.name.slice(1)
        }</span>`
    )
    .join(" ");
};

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  fetchData();
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchData();
  }
});
