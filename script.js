const body = document.querySelector("body");
const pokemonsList = document.getElementById("pokemon-list");
const abilityDiv = document.getElementById("ability-div");
const abilityList = document.getElementById("ability");
const movesDiv = document.getElementById("moves-div");
const movesList = document.getElementById("moves");
const weightDiv = document.getElementById("weight-div");
const weightList = document.getElementById("weight");

// API DOCS - https://pokeapi.co/

console.log("ASYNC AWAIT EXAMPLE");

const loadPokemons = async () => {
  try {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=50"); // Asynchronous operation - must be awaited

    console.log("response", response);
    const data = await response.json(); // Asynchronous operation - must be awaited

    console.log("DATA  ", data);
    data.results.forEach((pokemon, index) => {
      const listItem = document.createElement("li");
      const name = document.createTextNode(`${index + 1} - ${pokemon.name}`);

      listItem.appendChild(name);
      pokemonsList.appendChild(listItem);

      listItem.addEventListener("click", (event) => {
        selectPokemon(event.target, `${pokemon.name}`);
      });
    });
  } catch (error) {
    console.error("Error fetching the Pokemons", error);
  }
};

const loadPokemonsWithName = async (name) => {
  try {
    let res = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);

    const resData = await res.json();

    // Abilities
    var abilitiesLi = document.getElementsByClassName("abilities");
    for (var i = abilitiesLi.length - 1; i >= 0; i--) {
      abilitiesLi[i].parentNode.removeChild(abilitiesLi[i]);
    }

    resData.abilities.forEach((pokemon, index) => {
      const listItem = document.createElement("li");
      const abilities = document.createTextNode(`${pokemon.ability.name}`);
      listItem.classList.add("abilities");
      listItem.appendChild(abilities);
      abilityList.appendChild(listItem);

      abilityDiv.style.display = "block";
    });

    // Moves
    var movesLi = document.getElementsByClassName("moves");
    for (var i = movesLi.length - 1; i >= 0; i--) {
      movesLi[i].parentNode.removeChild(movesLi[i]);
    }

    resData.moves.forEach((pokemon, index) => {
      const moveslistItem = document.createElement("li");
      const moves = document.createTextNode(`${pokemon.move.name}`);
      moveslistItem.classList.add("moves");
      moveslistItem.appendChild(moves);
      movesList.appendChild(moveslistItem);

      movesDiv.style.display = "block";
    });

    // Weight
    var weightli = document.getElementsByClassName("weight");
    if (weightli.length > 0) {
      weightli.item(0).parentNode.removeChild(weightli.item(0));
    }

    let pokemonWeight = resData.weight;
    const weightlistItem = document.createElement("li");
    const weight = document.createTextNode(pokemonWeight);
    weightlistItem.classList.add("weight");
    weightlistItem.appendChild(weight);
    weightList.appendChild(weightlistItem);

    weightDiv.style.display = "block";
  } catch (error) {
    console.error("Error fetching the Pokemons with name", error);
  }
};

const selectPokemon = (listItem, pokemonName) => {
  console.log(pokemonName);

  const pokemonIndex = Number.parseInt(listItem.innerHTML);
  let nameOfSelected = document.getElementById("name");
  const imageOfSelected = document.getElementById("selected-image");

  loadPokemonsWithName(pokemonName);

  nameOfSelected.innerHTML = listItem.innerHTML.toUpperCase();
  nameOfSelected.style.visibility = "visible";
  nameOfSelected.style.display = "visible";
  imageOfSelected.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
};

loadPokemons();
