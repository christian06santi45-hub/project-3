//curl -H "x-api-key: YOUR_KEY" "https://api.thedogapi.com/v1/images/search?limit=2"
//curl -H "x-api-key: YOUR_KEY" "https://api.thedogapi.com/v1/breeds"// 

let allBreeds = [];

const listEl = document.querySelector('.dog__list');
const searchbar = document.querySelector('.search__input');

searchbar.addEventListener('input', (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredBreeds = allBreeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchString)
  );

  displayBreeds(filteredBreeds);
});

async function main() {
  const breedsRes = await fetch("https://api.thedogapi.com/v1/breeds?limit=20");
  const breedsData = await breedsRes.json();
  console.log(breedsData);


  const breedsWithImages = await Promise.all(
    breedsData.map(async (breed) => {
      if (breed.reference_image_id) {
        const imgRes = await fetch(`https://api.thedogapi.com/v1/images/${breed.reference_image_id}`);
        const imgData = await imgRes.json();
        breed.imageUrl = imgData.url;       
      } else {
        breed.imageUrl = "https://via.placeholder.com/300?text=No+Image";
      }
      return breed;
    })
  );

  allBreeds = breedsWithImages;
  displayBreeds(allBreeds);
}

function displayBreeds(breedsToDisplay) {
  listEl.innerHTML = breedsToDisplay.map((breed) => breedHTML(breed)).join("");
}

function breedHTML(breed) {
  const breedGroup = breed.breed_group || "N/A";

  const height = breed.height?.imperial || "N/A";
  const weight = breed.weight?.imperial || "N/A";

  return `
    <div class="dog__card">
      <figure class="dog__img--wrapper">
        <img class="dog__img" src="${breed.imageUrl}" alt="${breed.name}">
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
