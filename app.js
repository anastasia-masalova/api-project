const charactersList = document.getElementById("charactersList");
const searchBar = document.getElementById("searchBar");

let hpCharacters = [];

searchBar.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredCharacters = hpCharacters.filter( character => {
        return character.name.toLowerCase().includes(searchString) || character.house.toLowerCase().includes(searchString);
    });
    console.log(filteredCharacters);
    displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch("https://hp-api.herokuapp.com/api/characters");
    hpCharacters = await res.json();
    displayCharacters(hpCharacters);
  } catch (err) {
    console.log(err);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character) => {
      return `
      <li class="character">
        <h2>${character.name}</h2>
        <p>House: ${character.house}</p>
        <p>Actor: ${character.actor}</p>
        <img src="${character.image}"></img>
      </li>
      `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
};

loadCharacters();
