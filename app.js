const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
document.getElementById('error-message1').style.display = 'none'
document.getElementById('error-message2').style.display = 'none'

// Search
const searchPhone = () => {
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
    const searchResult = searchText.toLowerCase()
    console.log(searchResult);

    toggleSpinner('inline-block')
    searchField.value = '';
    document.getElementById('error-message1').style.display = 'none'
    if (searchResult == '' || searchResult == ' ') {
        document.getElementById('error-message1').style.display = 'block'
        toggleSpinner('none')
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchResult}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data.data))
            .catch(error => displayError(error));
    }
}

const displayError = error => {
    document.getElementById('error-message1').style.display = 'block'
}


// Display
const displaySearchResult = data => {
    console.log(data);
    const searchResult = document.getElementById('display-search');
    searchResult.textContent = '';
    if (data.length == 0) {
        document.getElementById('error-message2').style.display = 'block'
    }
    const first20 = data.slice(0, 20);
    first20.forEach(data => {
        // console.log(data);
        const phoneId = data.slug;

        // console.log(phoneId)

        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML = `
            <div class="card text-center h-100 w-75 column">
                <img src="${data.image}" class="card-img-top phone-size mx-auto mt-3" alt="...">
                <div class="card-body">
                    <h6 class="card-title">Product Name: ${data.phone_name}</h6>
                    <h5 class="text-dark text-opacity-75">Brand: ${data.brand}</h5>
                </div>
                <div class="card-footer bg-white border-top-0 mx-auto">
                    <button onclick="loadPhoneDetail('${phoneId}')" type="button" class="btn btn-primary ">Details</button>
                </div>
            </div>
        `;
        searchResult.appendChild(div)
    });
    toggleSpinner('none')
    document.getElementById('showMore-button').style.display = 'block'
}


// Loading Details
const loadPhoneDetail = phoneId => {
    console.log(phoneId)
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data => displayPhoneDetail(data.data))
}

// Displaying Details
const displayPhoneDetail = phone => {
    console.log(phone)
    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.textContent = '';
    const div = document.createElement('div')
    div.classList.add('col');
    div.innerHTML = `
        <div class="w-75 mx-auto d-flex my-5 align-items-center media ">
                <img src="${phone.image}" class="mx-auto card-img-top phone-size2">
                <div class="ps-3 border-start">
                    <h5 class="">Product Name : ${phone.name} </h5>
                    <p class="fw-light">Release Date : ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
                    <h6>Main Features</h6>
                    <p class="fw-light">Chip Set: ${phone.mainFeatures.chipSet}</p>
                    <p class="fw-light">Display Size: ${phone.mainFeatures.displaySize}</p>
                    <p class="fw-light">Memory: ${phone.mainFeatures.memory}</p>
                    <p class="fw-light">Storage: ${phone.mainFeatures.storage}</p>
                    <h6>Other Features</h6>
                    <p class="fw-light">Bluetooth : ${phone.others?.Bluetooth ? phone.others?.Bluetooth : 'Not available'}</p>
                    <p class="fw-light">GPS : ${phone.others?.GPS ? phone.others?.GPS : 'Not available'}</p>
                    <p class="fw-light">NFC : ${phone.others?.NFC ? phone.others?.NFC : 'Not available'}</p>
                    <p class="fw-light">Radio : ${phone.others?.Radio ? phone.others?.Radio : 'Not available'}</p>
                    <p class="fw-light">USB : ${phone.others?.USB ? phone.others?.USB : 'Not available'}</p>
                    <p class="fw-light">WLAN : ${phone.others?.WLAN ? phone.others?.WLAN : 'Not available'}</p>
                    <h6>Sensors</h6>
                    <p class="fw-light">${phone.mainFeatures.sensors[0]}, ${phone.mainFeatures.sensors[1]}, ${phone.mainFeatures.sensors[2]}, ${phone.mainFeatures.sensors[3]}, ${phone.mainFeatures.sensors[4]}, ${phone.mainFeatures.sensors[5]}</p>
                </div>
                
        </div>
    `;
    phoneDetails.appendChild(div);
}


// Show More
const showMoreBtn = document.getElementById('showMore-button');
showMoreBtn.style.display = 'none'
showMoreBtn.addEventListener('click', event => {
    console.log('show more button clicked')

    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))

})

