async function searchPokemon() {

    const input = document
        .getElementById("pokemonInput")
        .value
        .toLowerCase()
        .trim();

    const message = document.getElementById("message");
    const card = document.getElementById("card");

    message.textContent = "";
    card.classList.add("hidden");

    if (!input) {
        message.textContent = "Enter a Pokémon name.";
        return;
    }

    try {

        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${input}`
        );

        if (!response.ok)
            throw new Error();

        const data = await response.json();

        document.getElementById("image").src =
            data.sprites.other["official-artwork"].front_default;

        document.getElementById("name").textContent =
            data.name.toUpperCase();

        document.getElementById("id").textContent =
            data.id;

        document.getElementById("height").textContent =
            data.height / 10;

        document.getElementById("weight").textContent =
            data.weight / 10;

        const types = document.getElementById("types");
        types.innerHTML = "";

        data.types.forEach(type => {
            const badge = document.createElement("span");
            badge.className = "type";
            badge.textContent = type.type.name;
            types.appendChild(badge);
        });

        card.classList.remove("hidden");

    } catch {

        message.textContent = "Pokémon not found.";

    }

}

document
.getElementById("pokemonInput")
.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        searchPokemon();
    }

});