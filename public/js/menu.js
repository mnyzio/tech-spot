const hamburgerButton = document.getElementById('hamburger-btn');
const navList = document.getElementById('nav-list');

function toggleButton () {
    if (navList.classList.contains('hidden')) {        
        navList.classList.remove('hidden');
    } else {
        navList.classList.add('hidden');
    };
};

hamburgerButton.addEventListener('click', toggleButton)