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

const displaySearchResult = data => {
    console.log(data);
    const searchResult = document.getElementById('display-search');
    searchResult.textContent = '';
    data.forEach(data => {
        console.log(data);
        const phoneId = data.slug;
        console.log(phoneId)
        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML = `
            <div class="card text-center h-100 w-75">
                <img src="${data.image}" class="card-img-top phone-size mx-auto mt-3" alt="...">
                <div class="card-body">
                    <h6 class="card-title">Product Name: ${data.phone_name}</h6>
                    <h5>Brand: ${data.brand}</h5>
                </div>
                <div class="card-footer bg-white border-top-0 mx-auto">
                    <button onclick="loadPhoneDetail('${phoneId}')" type="button" class="btn btn-primary">Detail</button>
                </div>
            </div>
        `;
        searchResult.appendChild(div)
    });
}

const loadPhoneDetail = phoneId => {
    // const phoneId = data.slug;
    console.log(phoneId)
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data => displayPhoneDetail(data.data))
}


const displayPhoneDetail = phone => {
    console.log(phone)
    /* const phoneDetails = document.getElementById('phone-details')
    const div = document.createElement('div')
    div.classList.add('card');
    div.innerHTML = `
        <div class="card w-50 mx-auto">
                <img src="${data.image}" class="mx-auto card-img-top">
                <div class="card-body">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card'scontent.</p>
                </div>
        </div>
    `;
    phoneDetails.appendChild(div); */
}