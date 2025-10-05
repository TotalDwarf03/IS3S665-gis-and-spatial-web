/**
 * Loads the Google Maps API script.
 * Once loaded, it initializes the map.
 * @param {string} apiKey 
 * @param {function} callback 
 * @returns {void}
 */
function loadMapsAPI(apiKey, callback) {

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;

    script.onerror = function() {
        console.error("Failed to load Google Maps API script.");
    };

    document.head.appendChild(script);
}

function initMap() {
    const mapOptions = {
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    customMarker = {
        url: './assets/marker.png',
        scaledSize: new google.maps.Size(50, 50) // Scale the icon
    }

    const markers = [
        { position: { lat: 37.7749, lng: -122.4194 }, title: "San Francisco", options: { icon: customMarker } },
        { position: { lat: 34.0522, lng: -118.2437 }, title: "Los Angeles", options: { icon: customMarker } },
        { position: { lat: 36.1699, lng: -115.1398 }, title: "Las Vegas", options: { icon: customMarker } }
    ];

    const infoWindow = new google.maps.InfoWindow();

    // Adjust map when info window is closed
    infoWindow.addListener('close', function() {
        map.fitBounds(bounds, padding = 50);
    });

    markers.forEach(marker => {
        var marker = addMarker(map, marker.position, marker.title, marker.options);
    
        marker.addListener('click', async function() {
            map.setZoom(8);
            map.setCenter(marker.getPosition());

            const content = await fetch(`./markerInfo/${marker.title.toLowerCase().replace(" ", "_")}.html`).then(response => response.text());

            infoWindow.close();
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
        });
    });

    // Recalculate center based on markers
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(marker => {
        bounds.extend(marker.position);
    });
    map.fitBounds(bounds, padding = 50);
}

function addMarker(map, position, title, options = {}) {
    const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: title,
        ...options
    });

    return marker;
}
