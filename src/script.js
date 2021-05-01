
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
}

// Itse kartan luonti
var mymap = L.map("mapid").setView([65.01207, 25.46508], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

places =
    '[{\
        "index": 0,\
        "name": "Toripolliisi",\
        "description": "Kaarlo Mikkonen on tehnyt pronssisen Toripolliisi-veistoksen, joka paljastettiin \
                        vuonna 1987. Patsashanketta ajoi eteenpäin Kaija-Rita Koivisto silloisena taidemuseon \
                        näyttelysihteerinä. Teoksella viitataan torilla järjestystä valvonneisiin kolmeen \
                        toripoliisiin vuosina 1934-79. (Mitat 220 x 150 x 112 cm)",\
        "image" : "../img/Toripolliisi.jpg",\
        "coordinates": {\
            "lat": 65.01331428120065,\
            "lng": 25.46478943017074\
        },\
        "question": "Minä vuonna Toripolliisi-veistos on valmistunut?",\
        "choice1": {\
            "answer1": "1934",\
            "isCorrect1": false\
        },\
        "choice2": {\
            "answer2": "1979",\
            "isCorrect2": false\
        },\
        "choice3": {\
            "answer3": "1987",\
            "isCorrect3": true\
        },\
        "points": 25\
	},\
	{\
        "index": 1,\
		"name": "Teekkaritalo",\
		"description": "Teekkaritalo on vuokrakiinteistö, jota vuokrataan yksityisille, yhteisöille ja \
                        yrityksille. Teekkaritalo on vakiintunut oululaisen Teekkariperinteen asemaan, \
                        ja se on rakennettu 1992-1993.",\
        "image" : "../img/teekkaritalo.jpg",\
		"coordinates": {\
			"lat": 65.06398519487213,\
			"lng": 25.483934585339266\
		},\
        "question": "Minä vuonna Teekkaritalo on valmistunut?",\
        "choice1": {\
            "answer1": "1987",\
            "isCorrect1": false\
        },\
        "choice2": {\
            "answer2": "1993",\
            "isCorrect2": true\
        },\
        "choice3": {\
            "answer3": "1995",\
            "isCorrect3": false\
        },\
        "points": 25\
	},\
    {\
        "index": 2,\
		"name": "YTHS",\
		"description": "Ylioppilaiden terveydenhoitosäätiö (YTHS) tarjoaa terveyden- ja sairaanhoidon \
                        palveluita perustutkintoa suorittaville yliopisto- ja korkeakouluopiskelijoille. \
                        Palvelut ovat monipuolisia (terveystarkastukset, suun terveydenhoito, mielenterveys, \
                        yms.)",\
        "image" : "../img/yths.jpg",\
		"coordinates": {\
			"lat": 65.05788651804497,\
			"lng": 25.471437673697775\
		},\
        "question": "YTHS on lyhenne Yliopistojen terveydenhoitosäätiöstä. Totta vai tarua?",\
        "choice1": {\
            "answer1": "Totta",\
            "isCorrect1": true\
        },\
        "choice2": {\
            "answer2": "Tarua",\
            "isCorrect2": false\
        },\
        "points": 25\
	},\
    {\
        "index": 3,\
		"name": "Valkea",\
		"description": "Valkea on ainutlaatuinen kahdesta korttelista ja niitä yhdistävästä katetusta \
                        Kesäkadusta muodostuva noin 50 liikkeen ja ravintolan kauppakeskuskokonaisuus \
                        Oulun sydämessä.",\
        "image" : "../img/valkea.jpg",\
		"coordinates": {\
			"lat": 65.011631,\
			"lng": 25.472617\
		},\
        "question": "Valkeassa on noin...",\
        "choice1": {\
            "answer1": "60",\
            "isCorrect1": false\
        },\
        "choice2": {\
            "answer2": "40",\
            "isCorrect2": false\
        },\
        "choice3": {\
            "answer3": "50 liikettä ja ravintolaa.",\
            "isCorrect3": true\
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
        return `<img src='${place.image}' height="auto" width="250px"/><h2>${place.name}</h2><p>${place.description}</p> 
                <button id="${place.name}" onclick="createSurvey(${place.index})">${place.name}-kysely</button>`;
    }
    return `<h2>${place.name}</h2><p>${place.description}</p> 
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

    if (place.hasOwnProperty('choice3')) {
        let { answer3, isCorrect3 } = place.choice3;

        return `<p>${kysymys}<br><br>a) ${answer1}<br>b) ${answer2}<br>c) ${answer3}</p>
        <button id="${answer1}" onclick="checkAnswer(${place.points}, ${isCorrect1}, ${place.index});">a.</button>
        <button id="${answer2}" onclick="checkAnswer(${place.points}, ${isCorrect2}, ${place.index});">b.</button>
        <button id="${answer3}" onclick="checkAnswer(${place.points}, ${isCorrect3}, ${place.index});">c.</button>`;
    } else {
        return `<p>${kysymys}<br><br>a) ${answer1}<br>b) ${answer2}</p>
        <button id="${answer1}" onclick="checkAnswer(${place.points}, ${isCorrect1}, ${place.index});">a.</button>
        <button id="${answer2}" onclick="checkAnswer(${place.points}, ${isCorrect2}, ${place.index});">b.</button>`;
    }
}

var alreadyAnswered = [];

function checkAnswer(points, token, index) {
    if (token == true && !alreadyAnswered.includes(index)) {
        update(points);
        alreadyAnswered.push(index);
        alert("Correct!");
        if (currentStep == MAX_STEPS) {
            alert("Congratulations! You win!");
        }
    } else if (alreadyAnswered.includes(index) && token == true) {
        alert("You have already answered!");
    } else {
        alert("Try again!");
    }
}

// Generic pinnin luominen kartalle
// var popup = L.popup();
// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(mymap);
// }
// mymap.on("click", onMapClick);
