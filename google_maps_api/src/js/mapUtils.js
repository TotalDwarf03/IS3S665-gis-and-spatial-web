/**
 * Loads the Google Maps API script.
 * @returns {void}
 */
function loadMapsAPI(apiKey) {

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;

    script.onerror = function() {
        console.error("Failed to load Google Maps API script.");
    };

    document.head.appendChild(script);
}

function initMap() {
    const mapOptions = {
        center: new google.maps.LatLng(37.7749, -122.4194), // San Francisco
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
