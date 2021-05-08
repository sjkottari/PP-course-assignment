
const MAX_POINTS = 100;
var currentPoints = 0;

// Karttaelementin luonti. Näkymä keskitetään annettuihin koordinaatteihin.
var ouluMap = L.map("mapid").setView([65.01207, 25.46508], 11);

// Lisätään elementtiin itse karttanäkymä (layer). Mukana viite tekijänoikeuksiin.
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(ouluMap);

// Kartalla esiintyvien paikkojen tiedot ja muuhun toiminnallisuuteen liittyvä data. Koottu JSON-muotoon.
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
        "points": 10\
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
        "points": 10\
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
            "isCorrect1": false\
        },\
        "choice2": {\
            "answer2": "Tarua",\
            "isCorrect2": true\
        },\
        "points": 10\
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
        "points": 10\
	},\
    {\
        "index": 4,\
		"name": "Pekuri",\
		"description": "Keskustassa oleva Unirestan ravintola Pekuri tarjoaa kaikille, mutta etenkin \
                        opiskelijoille halpaa ja monipuolista ruokaa. Muita Unirestan ravintoloita on \
                        Linnanmaan kampuksella, Kontinkankaan kampuksella sekä Oulun Musiikkikeskuksessa.",\
        "image" : "../img/Pekuri.jpg",\
		"coordinates": {\
			"lat": 65.01204085601731,\
			"lng": 25.46855118348576\
		},\
        "question": "Missä ravintola Pekuri sijaitsee?",\
        "choice1": {\
            "answer1": "Linnanmaan kampuksella",\
            "isCorrect1": false\
        },\
        "choice2": {\
            "answer2": "Keskustassa",\
            "isCorrect2": true\
        },\
        "choice3": {\
            "answer3": "Kontinkankaan kampuksella",\
            "isCorrect3": false\
        },\
        "points": 10\
	},\
    {\
        "index": 5,\
		"name": "Kontinkankaan kampus",\
		"description": "Kontinkankaan kampuksen Oulussa muodostavat lääketieteellinen tiedekunta ja biokemian \
                        ja molekyylilääketieteen tiedekunta sekä Oulun yliopistosairaala.",\
        "image" : "../img/Kontinkangas.jpg",\
		"coordinates": {\
			"lat": 65.00840,\
			"lng": 25.50995\
		},\
        "question": "Mikä tiedekunta ei sijaitse kontinkankaan kampuksella?",\
        "choice1": {\
            "answer1": "Teknillinen tiedekunta",\
            "isCorrect1": true\
        },\
        "choice2": {\
            "answer2": "Biokemian tiedekunta",\
            "isCorrect2": false\
        },\
        "choice3": {\
            "answer3": "Biokemian tiedekunta",\
            "isCorrect3": false\
        },\
        "points": 10\
	},\
    {\
        "index": 6,\
		"name": "Linnanmaan liikuntahalli",\
		"description": "Linnanmaan liikuntahalli sijaitsee Linnanmaan kaupunginosassa \
                        n. 7 kilometriä Oulun keskustasta pohjoiseen. \
                        Lajit: koripallo, kuntosaliharjoittelu, lentopallo, musiikkiliikunta, \
                        salibandy, sulkapallo ja telinevoimistelu.",\
        "image" : "../img/Liikuntahalli.jpg",\
		"coordinates": {\
			"lat": 65.05523,\
			"lng": 25.47151\
		},\
        "question": "Mitä lajia ei voi harrastaa liikuntahallissa?",\
        "choice1": {\
            "answer1": "Telinevoimistelu",\
            "isCorrect1": false\
        },\
        "choice2": {\
            "answer2": "Salibandy",\
            "isCorrect2": false\
        },\
        "choice3": {\
            "answer3": "Bouldering",\
            "isCorrect3": true\
        },\
        "points": 10\
	},\
    {\
        "index": 7,\
		"name": "Frisbeegolf-rata Toppila",\
		"description": "Meri-Toppilan frisbeegolfrata sijaitsee Oulussa n. viiden kilometrin \
                        päässä keskustasta Meri-Toppilan kaupunginosassa meren rannassa. Rata \
                        perustettiin vuonna 2007 ja se on saavuttanut suuren suosion jo lyhyen \
                        olemassaolonsa aikana. Radalla on pelattu useita valtakunnallisia kilpailuja \
                        ja kisa toimi vuoden 2016 Euroopanmestaruuskisojen näyttämönä.",\
        "image" : "../img/frisbeegolf.jpg",\
		"coordinates": {\
			"lat": 65.05134,\
			"lng": 25.42742\
		},\
        "question": "Minkä vuoden EM kisoissa pelattiin tällä radalla?",\
        "choice1": {\
            "answer1": "2019",\
            "isCorrect1": false\
        },\
        "choice2": {\
            "answer2": "2017",\
            "isCorrect2": false\
        },\
        "choice3": {\
            "answer3": "2016",\
            "isCorrect3": true\
        },\
        "points": 10\
	},\
    {\
        "index": 8,\
		"name": "Ainolan puisto",\
		"description": "Ainolan puisto on keidas keskellä Oulua, Vehmas mutta hoidettu luonto ja virtaava \
                        vesi tekevät puistosta idyllisen paikan viettää kaunista kesäpäivää.",\
        "image" : "../img/Ainola.jpg",\
		"coordinates": {\
			"lat": 65.01895,\
			"lng": 25.47804\
		},\
        "question": "Ainolan puisto sijaitsee…",\
        "choice1": {\
            "answer1": "Keskustassa",\
            "isCorrect1": true\
        },\
        "choice2": {\
            "answer2": "Linnanmaalla",\
            "isCorrect2": false\
        },\
        "choice3": {\
            "answer3": "Kontinkankaalla",\
            "isCorrect3": false\
        },\
        "points": 10\
	},\
    {\
        "index": 9,\
		"name": "Linnanmaan kampus",\
		"description": "Linnanmaan kampus on Oulun yliopiston pääkampus, ja se sisältää monet \
                        tiedeyksiköt sekä tiedekunnat - mukaan lukien Tieto- ja sähkötekniikan \
                        tiedekunnan (TST) tilat. TST on maailmanlaajuisesti johtavia ICT-alaa \
                        kehittäviä tiedeyhteisöjä, joka rakentaa kestävää ja turvallista \
                        digitaalista tulevaisuutta. Tutkinto-ohjelmia TST:llä ovat mm. \
                        Tietojenkäsittelytiede sekä tietotekniikka.",\
        "image" : "../img/linnanmaa-kampus.jpg",\
		"coordinates": {\
			"lat": 65.05931353751602,\
			"lng": 25.466291762398097\
		},\
        "question": "Mikä seuraavista tutkinto-ohjelmista ei ole osa TST:tä?",\
        "choice1": {\
            "answer1": "Tietojenkäsittelytiede",\
            "isCorrect1": false\
        },\
        "choice2": {\
            "answer2": "Konetekniikka",\
            "isCorrect2": true\
        },\
        "choice3": {\
            "answer3": "Elektroniikka- ja tietoliikennetekniikka",\
            "isCorrect3": false\
        },\
        "points": 10\
	}\
]\
';

// Parsitaan yllä oleva JSON-data
let placesJSON = JSON.parse(places);

// Karttapinnin luonti
const createMarker = (index) => {
    let place = placesJSON[index];
    let { lat, lng } = place.coordinates;
    let marker = L.marker([lat, lng]).addTo(ouluMap); // Lisätään marker kartalle.
    marker.bindPopup(createPopupContent(place)); // Yhdistetään marker popup-ikkunaan.
};

// Popup-ikkunan luominen karttapinnille. Palauttaa Popupin sisällön yllä olevalle metodille.
const createPopupContent = (place) => {
    if (place.image) {
        return `<img src='${place.image}' height="auto" width="200px"/><h2>${place.name}</h2><p>${place.description}</p> 
                <button id="${place.name}" onclick="createSurvey(${place.index})">Quiz</button>`;
    }
    return `<h2>${place.name}</h2><p>${place.description}</p> 
            <button id="${place.name}" onclick="createSurvey(${place.index})">Quiz</button>`;
};

// Käydään parsitut paikat läpi, luodaan jokaiselle karttapinni (marker)
for (let i = 0; i < placesJSON.length; i++) {
    createMarker(i);
}

// Haetaan modal-ikkuna (iso koko näytön Popup)
var modal = document.getElementById("myModal");

// Haetaan elementti, jolla suljetaan modal-ikkuna (ruksi)
var span = document.getElementsByClassName("close")[0];

// Modal-ikkunan sulkeminen ruksilla
span.onclick = function () {
    modal.style.display = "none";
}

// Modal-ikkunan sulkeminen muualta klikkaamalla
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Luodaan quiz (kysely). Quiz sijoitetaan modal-ikkunaan.
function createSurvey(index) {
    modal.style.display = "block";
    var place = placesJSON[index];
    document.getElementById("survey-content").innerHTML = createSurveyContent(place);
}

// Luodaan sisältö quizille. 
function createSurveyContent(place) {
    let kysymys = place.question;
    let { answer1, isCorrect1 } = place.choice1;
    let { answer2, isCorrect2 } = place.choice2;

    // Tarkastetaan, annetaanko käyttäjälle kolmatta vastausvaihtoehtoa.
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

// Taulukko oikeiden vastausten indeksien säilömiseksi
var alreadyAnswered = [];

// Metodi vastauksen tarkistamiseksi. Käyttäjälle viestitään, oliko vastaus oikea,
// vai menikö se väärin. Oikean vastauksen antaminen uudestaan estetään.
function checkAnswer(points, token, index) {
    if (token == true && !alreadyAnswered.includes(index)) {
        update(points);
        alreadyAnswered.push(index);
        alert(" Correct!\n" + "+" + points + " points");
        if (currentPoints == MAX_POINTS) {
            alert("Congratulations! You win!");
        }
    } else if (alreadyAnswered.includes(index) && token == true) {
        alert("You have already answered!");
    } else {
        alert("Try again!");
    }
}

// Pisteet-edistymispalkin päivittäminen suoritettujen quizzien mukaan
function update(points) {
    var element = document.getElementById("myProgressBar");
    currentPoints += points;
    setInterval(scene, 10);
    function scene() {
        element.style.width = currentPoints + '%';
        element.innerHTML = currentPoints + "%";
    }
}
