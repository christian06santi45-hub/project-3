//curl -H "x-api-key: live_8q3IvbAUEkjdrlTHgtNmDeQnrqyUz6RWiC7F7jTxi44yPLwRRrxAFIrVSVG6chWm" "https://api.thedogapi.com/v1/images/search?limit=2"
//curl -H "x-api-key: live_8q3IvbAUEkjdrlTHgtNmDeQnrqyUz6RWiC7F7jTxi44yPLwRRrxAFIrVSVG6chWm" "https://api.thedogapi.com/v1/breeds"
const listEl = document.querySelector('.dog__list')

async function main() {
    const breedsRes = await fetch("https://api.thedogapi.com/v1/images/search?limit=2?limit=20");
    const breedsData = await breedsRes.json();
    listEl.innerHTML = breedsData.map((breed) => breedHTML(breed)).join("");
}

function breedHTML(breed) {
    const breedGroup = breed.breed_group || 'N/A'
    const imageUrl = breed.image?.url || 'https://api.thedogapi.com'

    return `<div class="dog__card">
        <figure class="dog__img--wrapper">
            <img class="dog__img" src="${imageUrl}" alt="A ${breed.name}">
        </figure>
        <div class="dog__details">
            <div class="dog__title">
                ${breed.name}
            </div>
            <div class="dog__breed">
                <ol class="dogs__breed--list">
                    <li><b>Height:</b>${breed.height.imperial} inches</li>
                    <li><b>Weight:</b>${breed.weight.imperial} lbs</li>
                    <li><b>Group:</b>${breed.breedGroup || 'N/A'}</li>
                </ol>
            </div>
        </div>
    </div>`;
}

main();
    
