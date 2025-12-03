//curl -H "x-api-key: live_8q3IvbAUEkjdrlTHgtNmDeQnrqyUz6RWiC7F7jTxi44yPLwRRrxAFIrVSVG6chWm" "https://api.thedogapi.com/v1/images/search?limit=2"
//curl -H "x-api-key: live_8q3IvbAUEkjdrlTHgtNmDeQnrqyUz6RWiC7F7jTxi44yPLwRRrxAFIrVSVG6chWm" "https://api.thedogapi.com/v1/breeds"
let allBreeds = [];
    const listEl = document.querySelector('.dog__list')
    const searchbar = document.getElementById('search__input');

    searchbar.addEventListener('input', (e) => {
        const searchString = e.target.value.toLowerCase();
        const filteredBreeds = allBreeds.filter((breed) => {
            return breed.name.toLowerCase().includes(searchString);
        });
        
        displayBreeds(filteredBreeds);
    });

    async function main() {
        // ... rest of your main function
        const breedsRes = await fetch("api.thedogapi.com");
        const breedsData = await breedsRes.json();
        allBreeds = breedsData; 
        displayBreeds(allBreeds);
    }

    function displayBreeds(breedsToDisplay) {
        // ... rest of your displayBreeds function
        listEl.innerHTML = breedsToDisplay.map((breed) => breedHTML(breed)).join("");
    }

    function breedHTML(breed) {
        // ... rest of your breedHTML function
        const breedGroup = breed.breed_group || 'N/A';
        const imageUrl = breed.image?.url ?? '';

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
                        <li><b>Height: </b>${breed.height.imperial} inches</li>
                        <li><b>Weight: </b>${breed.weight.imperial} lbs</li>
                        <li><b>Group: </b>${breedGroup}</li> 
                    </ol>
                </div>
            </div>
        </div>`;
    }

    main();
    