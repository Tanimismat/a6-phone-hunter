const searchPhone = () => {
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
    console.log(searchText);
    searchField.value = '';
} 