const loadGadget = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const response = await fetch(url);
    const data = await response.json();
    displayItems(data.data);
}

const displayItems = items => {
    console.log(items);
    // get id from html page
    const itemsContainer = document.getElementById('items-container');
    // clear previous items
    itemsContainer.textContent = '';
    // display only few items
    items = items.slice(0, 20);
    // get d-none div
    const noItems = document.getElementById('no-item-found');
    if (items.length === 0) {
        noItems.classList.remove('d-none');
    } else {
        noItems.classList.add('d-none');
    }
    // get items one by one using loop
    items.forEach(item => {
        console.log(item);
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('col');
        itemDiv.innerHTML = `
        <div class="card h-100 p-3">
            <img src="${item.image ? item.image : 'Image not found'}" class="card-img-top" alt="...">
             <div class="card-body ">
                <h5 class="card-title">${item.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                                to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `;
        itemsContainer.appendChild(itemDiv);
    });
    // stop spinner
    toggleSpinner(false);
}

// search button
document.getElementById('search-btn').addEventListener('click', function () {
    // start spinner
    toggleSpinner(true);
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    loadGadget(searchText);
    // console.log(searchText);

});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove = 'd-none';
    } else {
        loaderSection.classList.add('d-none');
    }
}

loadGadget('iphone');
