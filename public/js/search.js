const searchPosts = document.getElementById('search-posts');
const searchBtn = document.getElementById('seach-submit');
const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit' , (e) => {
    e.preventDefault();
    if (searchPosts.value !== "") {
        const searchValue = searchPosts.value;
        document.location.replace(`/search/${searchValue}`)    
    }
});

searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (searchPosts.value !== "") {
        const searchValue = searchPosts.value;
        document.location.replace(`/search/${searchValue}`)    
    }
});


