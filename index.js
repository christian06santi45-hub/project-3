//curl -H "x-api-key: live_8q3IvbAUEkjdrlTHgtNmDeQnrqyUz6RWiC7F7jTxi44yPLwRRrxAFIrVSVG6chWm" "https://api.thedogapi.com/v1/images/search?limit=2"
//curl -H "x-api-key: live_8q3IvbAUEkjdrlTHgtNmDeQnrqyUz6RWiC7F7jTxi44yPLwRRrxAFIrVSVG6chWm" "https://api.thedogapi.com/v1/breeds"
let allBreeds = [];

const listEl = document.querySelector(".dog__list");
const searchbar = document.querySelector(".search__input"); // <-- FIXED

searchbar.addEventListener("input", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredBreeds = allBreeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchString)
  );

  displayBreeds(filteredBreeds);
});

async function main() {
  const breedsRes = await fetch("https://api.thedogapi.com/v1/breeds?limit=20");
  const breedsData = await breedsRes.json();

  allBreeds = breedsData;
  displayBreeds(allBreeds);
}

function displayBreeds(breedsToDisplay) {
  listEl.innerHTML = breedsToDisplay.map((breed) => breedHTML(breed)).join("");
}

function breedHTML(breed) {
  const breedGroup = breed.breed_group || "N/A";
  const imageUrl = breed.image?.url || "https://api.thedogapi.com/v1/images/search?limit=2";

  const height = breed.height?.imperial || "N/A";
  const weight = breed.weight?.imperial || "N/A";

  return `
        <div class="dog__card">
            <figure class="dog__img--wrapper">
                <img class="dog__img" src="${imageUrl}" alt="${breed.name}">
            </figure>
            <div class="dog__details">
                <div class="dog__title">${breed.name}</div>
                <div class="dog__breed">
                    <ol class="dogs__breed--list">
                        <li><b>Height: </b>${height} inches</li>
                        <li><b>Weight: </b>${weight} lbs</li>
                        <li><b>Group: </b>${breedGroup}</li>
                    </ol>
                </div>
            </div>
        </div>
    `;
}

main();
