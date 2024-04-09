document.addEventListener('DOMContentLoaded', function() {
    var apiKey = 'wbcDrCUEl7QDLcoXIZy7LOZ1lxqW7AetYtBippF632L1CKJ0UR1RIc07'; // Your actual Pexels API key
    var currentIndex = 1; // Start index for image fetching

    function fetchAndDisplayImage() {
        var backgroundContainer = document.getElementById('background-container');

        // Change query if needed
        var url = `https://api.pexels.com/v1/search?query=farmers&per_page=1&page=${currentIndex}`;

        fetch(url, {
            headers: {
                Authorization: apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.photos.length > 0) {
                var photo = data.photos[0];
                // Set the background image to the first photo's src
                backgroundContainer.style.backgroundImage = `url(${photo.src.original})`;
                backgroundContainer.style.backgroundSize = 'cover';
                backgroundContainer.style.backgroundPosition = 'center center';
                backgroundContainer.style.backgroundRepeat = 'no-repeat';
            } else {
                console.error('No photos found.');
            }
        })
        .catch(error => console.error('Error fetching images:', error));
    }

    fetchAndDisplayImage(); // Fetch and display the initial image

    // Fetch and display a new image every 30 seconds
    setInterval(function() {
        currentIndex++;
        fetchAndDisplayImage();
    }, 30000);
});
