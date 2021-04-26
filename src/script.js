
// Progress bar test
function update() {
    var element = document.getElementById("myProgressBar");
    var width = 1;
    var identity = setInterval(scene, 10);
    function scene() {
        if (width >= 100) {
            clearInterval(identity);
        } else {
            width++;
            element.style.width = width + '%';
        }
    }
}

// Itse kartan luonti
var mymap = L.map("mapid").setView([65.01207, 25.46508], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

places =
    '[{\
    "name": "nimi1",\
    "description": "desc1",\
		"coordinates": {\
			"lat": 65.01207,\
			"lng": 25.46508\
		}\
	},\
	{\
		"name": "nimi2",\
		"description": "desc2",\
        "image" : "https://static.pexels.com/photos/189349/pexels-photo-189349.jpeg",\
		"coordinates": {\
			"lat": 65.06389,\
			"lng": 25.4839\
		}\
	}\
]\
';
let placesJSON = JSON.parse(places);

// Tehdään popup markerille
const createPopupContent = (place) => {
    // Joko täällä sisällä nappi popuppiin (jos lähtee toimimaan)
    // tai jollain muulla tavalla.
	if (place.image) { // Voidaan tarkistaa onko paikassa kuva
		return `<img src="${place.image}" height="200px "width="200px"/><h2>This is ${place.name}</h2><p>${place.description}</p>`;
	}
	return `<h2>This is ${place.name}</h2><p>${place.description}</p> <button id="${place.name}"></button>`;
};

// Luodaan marker
const createMarker = (index) => {
	let place = placesJSON[index]; // Paikka muuttujaan
	let { lat, lng } = place.coordinates; // Avataan sijainti paikasta
	let marker = L.marker([lat, lng]).addTo(mymap); // Luodaan marker sijaintiin
	marker.bindPopup(createPopupContent(place)); // Lisätään popup joka luodaan
};

// Loopataan paikat
for (let i = 0; i < placesJSON.length; i++) {
	createMarker(i);
}

// Generic pinnin luominen kartalle
var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}
mymap.on("click", onMapClick);
