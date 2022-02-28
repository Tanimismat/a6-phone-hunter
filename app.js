const searchPhone = () => {
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
    console.log(searchText);
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResult(data.data))
}

const displaySearchResult = phones => {
    console.log(phones);
    const searchResult = document.getElementById('display-search');
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML = `
            <div class="card text-center h-100 w-75">
                        <img src="${phone.image}" class="card-img-top phone-size mx-auto mt-3" alt="...">
                        <div class="card-body">
                            <h6 class="card-title">${phone.phone_name}</h6>
                            <h5>${phone.brand}</h5>
                        </div>
                        <div class="card-footer bg-white border-top-0 mx-auto">
                            <button type="button" class="btn btn-primary">Explore</button>
                        </div>
                    </div>
        `;
        searchResult.appendChild(div)
    });
}

displaySearchResult()