const charactersList = document.getElementById("charactersList");
const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  searchCharacters(searchString);
});

const searchCharacters = async (searchString) => {
  const apiData = {
    url: "https://www.superheroapi.com/api.php/4554611301302605/",
    type: "search",
    name: String(searchString),
  };

  const { url, type, name } = apiData;
  const apiUrl = `${url}${type}/${name}`;
  console.log(apiUrl);

  const response = await fetch(apiUrl)
  const data = await response.json()

  generateHtml(data.results)
};

const generateHtml = (searchResults) => {
  const superheroDiv = document.querySelector(".superhero");
  superheroDiv.innerHTML = "";
  let displayedCharacters = 0;

  if(searchResults.length >= 10) {
    displayedCharacters = 10;
  } else {
    displayedCharacters = searchResults.length;
  }

  for(let i = 0; i < displayedCharacters; i++) { 
  const html = `
    <li class="character">
        <h2>${searchResults[i].name}</h2>
        <p>Height: ${searchResults[i].appearance.height}</p>
        <img src="${searchResults[i].image.url}"></img>
      </li>
  `;
  superheroDiv.innerHTML += html;
}};





/* const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character) => {
      return `
      <li class="character">
        <h2>${character.name}</h2>
        <img src="${character.image.url}"></img>
      </li>
      `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
}; */