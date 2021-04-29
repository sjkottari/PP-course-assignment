
const MAX_STEPS = 100;
var currentStep = 0;

// Progress bar test
function update(points) {
    var element = document.getElementById("myProgressBar");
    currentStep += points;
    var identity = setInterval(scene, 10);
    function scene() {
        if (currentStep > MAX_STEPS) {
            clearInterval(identity);
        } else {
            element.style.width = currentStep + '%';
        }
    }
    if (currentStep == MAX_STEPS) {
        alert("congrats!");
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
        "index": 0,\
        "name": "nimi1",\
        "description": "desc1",\
        "coordinates": {\
            "lat": 65.01207,\
            "lng": 25.46508\
        },\
        "question": "que?",\
        "choice1": {\
            "answer1": "ans1",\
            "isCorrect1": true\
        },\
        "choice2": {\
            "answer2": "ans2",\
            "isCorrect2": false\
        },\
        "choice3": {\
            "answer3": "ans3",\
            "isCorrect3": false\
        },\
        "points": 25\
	},\
	{\
        "index": 1,\
		"name": "nimi2",\
		"description": "desc2",\
        "image" : "https://static.pexels.com/photos/189349/pexels-photo-189349.jpeg",\
		"coordinates": {\
			"lat": 65.06389,\
			"lng": 25.4839\
		},\
        "question": "kuvakysymys",\
        "choice1": {\
            "answer1": "ans1",\
            "isCorrect1": true\
        },\
        "choice2": {\
            "answer2": "ans2",\
            "isCorrect2": false\
        },\
        "choice3": {\
            "answer3": "ans3",\
            "isCorrect3": false\
        },\
        "points": 25\
	}\
]\
';
let placesJSON = JSON.parse(places);

// Tehdään popup markerille
const createPopupContent = (place) => {
    console.log(place)
    // Joko täällä sisällä nappi popuppiin (jos lähtee toimimaan) tai jollain muulla tavalla.
    if (place.image) { // Voidaan tarkistaa onko paikassa kuva
        return `<img src="${place.image}" height="200px "width="200px"/><h2>This is ${place.name}</h2><p>${place.description}</p> 
                <button id="${place.name}" onclick="createSurvey(${place.index})">${place.name}-kysely</button>`;
    }
    return `<h2>This is ${place.name}</h2><p>${place.description}</p> 
            <button id="${place.name}" onclick="createSurvey(${place.index})">${place.name}-kysely</button>`;
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

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function createSurvey(index) {
    modal.style.display = "block";
    var place = placesJSON[index];
    document.getElementById("survey-content").innerHTML = createSurveyContent(place);
}

function createSurveyContent(place) {
    let kysymys = place.question;
    let { answer1, isCorrect1 } = place.choice1;
    let { answer2, isCorrect2 } = place.choice2;
    let { answer3, isCorrect3 } = place.choice3;

    return `<p>${kysymys}<br><br>a) ${answer1}<br>b) ${answer2}<br>c) ${answer3}</p>
    <button id="${answer1}" onclick="checkAnswer(${place.points}, ${isCorrect1}, ${place.index});">a.</button>
    <button id="${answer2}" onclick="checkAnswer(${place.points}, ${isCorrect2}, ${place.index});">b.</button>
    <button id="${answer3}" onclick="checkAnswer(${place.points}, ${isCorrect3}, ${place.index});">c.</button>`;
}

var alreadyAnswered = [];

function checkAnswer(points, token, index) {
    if (token == true && !alreadyAnswered.includes(index)) {
        update(points);
        alreadyAnswered.push(index);
    } else if (alreadyAnswered.includes(index) && token == true) {
        alert("You have already answered!");
    } else {
        alert("Try again!");
    }
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
