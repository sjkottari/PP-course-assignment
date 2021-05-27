
const MAX_POINTS = 100;
var currentPoints = 0;

// Karttaelementin luonti. Näkymä keskitetään annettuihin koordinaatteihin.
var ouluMap = L.map("mapid", {
    minZoom: 11,
    maxZoom: 13
});

// Lisätään elementtiin itse karttanäkymä (layer). Mukana viite tekijänoikeuksiin.
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(ouluMap);

var ZoomViewer = L.Control.extend({
    onAdd: function(){
        var gauge = L.DomUtil.create('div');
        gauge.style.width = '80px';
        gauge.style.background = 'rgba(255,255,255,0.5)';
        gauge.style.textAlign = 'left';
        ouluMap.on('zoomstart zoom zoomend', function(ev){
            gauge.innerHTML = 'Zoom-taso: ' + ouluMap.getZoom();
        })
        return gauge;
    }
});
(new ZoomViewer).addTo(ouluMap);

ouluMap.setView([65.01207, 25.46508], 11);

// Kartalla esiintyvien paikkojen tiedot ja muuhun toiminnallisuuteen liittyvä data. Koottu JSON-muotoon.
places =
    '[{\
        "index": 0,\
        "name": "Toripolliisi",\
        "description": "Todellisen oululaisen ikonin, Toripolliisin, on tehnyt Kaarlo Mikkonen vuonna 1987. Veistos \
                        on valettu pronssista, ja se on 220cm korkea. Nippelitietoa: n. 75% ihmisistä \
                        tuntee houkutusta selfien ottamiseksi Toripolliisin kanssa!",\
        "image" : "../img/Toripolliisi.jpg",\
        "coordinates": {\
            "lat": 65.01331428120065,\
            "lng": 25.46478943017074\
        },\
        "question": "Mihin seuraavista Toripolliisi-teoksella viitataan?",\
        "choice1": {\
            "answer1": "Kauppahallissa järjestystä valvoneisiin järjestysmiehiin",\
            "isCorrect1": false\
        },\
        "choice2": {\
            "answer2": "Torilla järjestystä vuosina 1934-1979 valvoneisiin toripoliiseihin",\
            "isCorrect2": true\
        },\
        "choice3": {\
            "answer3": "Kadun toisella puolella olevaan Toripolliisi-baariin",\
            "isCorrect3": false\
        },\
        "points": 10\
	},\
	{\
        "index": 1,\
		"name": "Teekkaritalo",\
		"description": "Teekkaritalo on Oulun Kaijonharjussa sijaitseva kokoontumispaikka, johon jokainen fuksi \
                        eksyy vähintään kerran ensimmäisen opiskeluvuotensa aikana. Teekkaritalolla järjestetään \
                        milloin pippaloita, milloin saunailtoja, mutta aina on tunnelma katossa. Teekkaritalo \
                        on rakennettu vuosina 1992-1993, ja sillä on vakiintunut asema oululaisessa teekkariperinteessä. \
                        Ylläpidosta huolehtii Oulun Teekkariyhdistys ry.",\
        "image" : "../img/teekkaritalo.jpg",\
		"coordinates": {\
			"lat": 65.06398519487213,\
			"lng": 25.483934585339266\
		},\
        "question": "Mikä erikoinen liikennemerkki on Teekkaritalon pihamaalla?",\
        "choice1": {\
            "answer1": "Hauskasta menosta ilmoittava merkki",\
            "isCorrect1": false\
        },\
        "choice2": {\
            "answer2": "Lähistön oravista varoittava merkki",\
            "isCorrect2": false\
        },\
        "choice3": {\
            "answer3": "Oksentavista teekkareista varoittava merkki",\
            "isCorrect3": true\
        },\
        "points": 10\
	},\
    {\
        "index": 2,\
		"name": "YTHS",\
		"description": "Ylioppilaiden terveydenhoitosäätiö (YTHS) tarjoaa terveyden- ja sairaanhoidon \
                        palveluita perustutkintoa suorittaville yliopisto- ja muille korkeakouluopiskelijoille. \
                        Palvelut ovat monipuolisia, ja ne kattavat esimerkiksi perusterveyden tarkastukset, \
                        suun terveydenhuollon sekä mielenterveyden",\
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
		"description": "Valkea on Pakkahuoneenkadun ja Kauppurienkadun välissä sijaitseva, kahdesta korttelista \
                        ja niitä yhdistävästä katetusta Kesäkadusta muodostuva noin 50 liikkeen ja ravintolan \
                        kauppakeskuskokonaisuus. Liikkeitä löytyy joka lähtöön: aina kahviloista useisiin \
                        vaatekauppoihin. Valkea sijaitsee aivan Oulun keskustan sydämessä, ja siellä voidaan \
                        monipuolisia yleisötapahtumia",\
        "image" : "../img/valkea.jpg",\
		"coordinates": {\
			"lat": 65.011631,\
			"lng": 25.472617\
		},\
        "question": "Valkeaan pääsee muualtakin kuin katutasolta. Mistä muualta?",\
        "choice1": {\
            "answer1": "Viereisten talojen katolta köysiradalla",\
            "isCorrect1": false\
        },\
        "choice2": {\
            "answer2": "Kallioon louhitusta Kivisydän-parkkihallista",\
            "isCorrect2": true\
        },\
        "choice3": {\
            "answer3": "Otto Karhin puiston läpi kulkevasta kanaalista",\
            "isCorrect3": false\
        },\
        "points": 10\
	},\
    {\
        "index": 4,\
		"name": "Ravintola Pekuri",\
		"description": "Keskustassa oleva Unirestan ravintola Pekuri tarjoaa kaikille, mutta etenkin \
                        opiskelijoille halpaa ja monipuolista ruokaa. Muita Unirestan ravintoloita on \
                        Linnanmaan kampuksella, Kontinkankaan kampuksella sekä Oulun Musiikkikeskuksessa.",\
        "image" : "../img/Pekuri.jpg",\
		"coordinates": {\
			"lat": 65.01204085601731,\
			"lng": 25.46855118348576\
		},\
        "question": "Saako Pekurissa opiskelija-alennusta lounaaseen?",\
        "choice1": {\
            "answer1": "Ei, koska se ei sijaitse millään kampuksella",\
            "isCorrect1": false\
        },\
        "choice2": {\
            "answer2": "No totta kai!",\
            "isCorrect2": true\
        },\
        "points": 10\
	},\
    {\
        "index": 5,\
		"name": "Kontinkankaan kampus",\
		"description": "Kontinkankaan kampuksen Oulussa muodostavat lääketieteellinen tiedekunta sekä biokemian \
                        ja molekyylilääketieteen tiedekunta. Samalla tontilla sijaitsee myös Oulun Yliopistollinen \
                        sairaala, eli jos Wappua viettäessä tulee isompi pipi, suunta on todennäköisesti tänne päin. \
                        Lääkiksen fukseille tämä paikka tulee hyvinkin tutuksi 😎",\
        "image" : "../img/Kontinkangas.jpg",\
		"coordinates": {\
			"lat": 65.00840,\
			"lng": 25.50995\
		},\
        "question": "Mikä tiedekunta ei sijaitse Kontinkankaan kampuksella?",\
        "choice1": {\
            "answer1": "Teknillinen tiedekunta",\
            "isCorrect1": true\
        },\
        "choice2": {\
            "answer2": "Biokemian tiedekunta",\
            "isCorrect2": false\
        },\
        "choice3": {\
            "answer3": "Lääketieteellinen tiedekunta",\
            "isCorrect3": false\
        },\
        "points": 10\
	},\
    {\
        "index": 6,\
		"name": "Linnanmaan liikuntahalli",\
		"description": "Linnanmaan liikuntahalli sijaitsee Linnanmaan kaupunginosassa n. 7 kilometriä \
                        Oulun keskustasta pohjoiseen, lähes yliopiston vieressä. Liikuntahallilla voi \
                        harrastaa monia lajeja kuten koripalloa, lentopalloa, salibandya, sulkapalloa \
                        sekä telinevoimistelua. Mahdollisuudet musiikkiliikunnalle sekä kuntosalilla \
                        käymiseen löytyvät myös. Useat opiskelijajärjestöt tapaavat järjestää täällä \
                        ryhmäliikuntaa.", \
        "image" : "../img/Liikuntahalli.jpg",\
		"coordinates": {\
			"lat": 65.05523,\
			"lng": 25.47151\
		},\
        "question": "Mitä lajia ei voi harrastaa Linnanmaan liikuntahallissa?",\
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
		"name": "Toppilan frisbeegolf-rata",\
		"description": "(Meri-)Toppilan frisbeegolfrata sijaitsee Meri-Toppilan kaupunginosassa \
                        n. 5 kilometrin päässä Oulun keskustasta. Rata perustettiin vuonna 2007 \
                        ja se on saavuttanut suuren suosion etenkin nuorison keskuudessa lyhyen \
                        olemassaolonsa aikana. Radalla on pelattu useita valtakunnallisia kilpailuja \
                        ja se toimi vuoden 2016 Euroopanmestaruuskisojen näyttämönä. Ja ovathan \
                        kumpuilevat niityt merellisessä maisemassa kaunista katseltavaa!",\
        "image" : "../img/frisbeegolf.jpg",\
		"coordinates": {\
			"lat": 65.05134,\
			"lng": 25.42742\
		},\
        "question": "Mikä liitokiekko eli frisbee on paras pitkien matkojen heittoihin?",\
        "choice1": {\
            "answer1": "Putteri",\
            "isCorrect1": false\
        },\
        "choice2": {\
            "answer2": "Pituusdriveri",\
            "isCorrect2": true\
        },\
        "choice3": {\
            "answer3": "Väylädriveri",\
            "isCorrect3": false\
        },\
        "points": 10\
	},\
    {\
        "index": 8,\
		"name": "Ainolan puisto",\
		"description": "Ainolan puisto on kaunis puistoalue Oulun Hupisaarilla. Vehmas, mutta hyvin \
                        hoidettu luonto ja virtaava vesi tekevät puistosta idyllisen paikan viettää \
                        kaunista kesäpäivää. Paikka on myös opiskelijoiden suosiossa etenkin Wapun \
                        aikaan, legendat kertovat juhlimisesta läpi lyhyen yön.",\
        "image" : "../img/Ainola.jpg",\
		"coordinates": {\
			"lat": 65.01895,\
			"lng": 25.47804\
		},\
        "question": "Mikä seuraavista löytyy Ainolan puistosta?",\
        "choice1": {\
            "answer1": "Pohjois-Pohjanmaan museo sekä Oulun taidemuseo",\
            "isCorrect1": true\
        },\
        "choice2": {\
            "answer2": "Hupisaarten teatteri",\
            "isCorrect2": false\
        },\
        "choice3": {\
            "answer3": "Oulun kasvitieteellinen puutarha",\
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
    
    //marker.on("click", flyToLocation(lat, lng));
    //function flyToLocation(lat, lng) {
    //    ouluMap.flyTo([lat, lng], 11);
    //}
};

// Popup-ikkunan luominen karttapinnille. Palauttaa Popupin sisällön yllä olevalle metodille.
const createPopupContent = (place) => {
    if (place.image) {
        return `<img src='${place.image}' class="popupimage"/><h2>${place.name}</h2><p>${place.description}</p> 
                <button id="${place.name}" onclick="createSurvey(${place.index})">Testaa taitosi!</button>`;
    }
    return `<h2>${place.name}</h2><p>${place.description}</p> 
            <button id="${place.name}" onclick="createSurvey(${place.index})">Testaa taitosi!</button>`;
};

// Käydään parsitut paikat läpi, luodaan jokaiselle karttapinni (marker)
for (let i = 0; i < placesJSON.length; i++) {
    createMarker(i);
}

// Haetaan modal-ikkuna (iso koko näytön Popup)
var modal = document.getElementById("myModal");
var modalcontent = document.getElementById("myModalContent");

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
    modalcontent.style.width = "40%";
    modalcontent.style.textAlign = "left";
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
var award = document.getElementById("headeraward");

// Metodi vastauksen tarkistamiseksi. Käyttäjälle viestitään, oliko vastaus oikea,
// vai menikö se väärin. Oikean vastauksen antaminen uudestaan estetään.
function checkAnswer(points, token, index) {
    if (token == true && !alreadyAnswered.includes(index)) {
        update(points);
        alreadyAnswered.push(index);
        if (currentPoints < MAX_POINTS) {
            modalcontent.style.width = "20%";
            modalcontent.style.textAlign = "center";
            document.getElementById("survey-content").innerHTML = returnInfo(points);
        }
        else if (currentPoints == MAX_POINTS) {
            document.getElementById("survey-content").innerHTML = returnAward();
            award.style.display = "inline-block";
        }
    } else if (alreadyAnswered.includes(index) && token == true) {
        modalcontent.style.width = "20%";
        modalcontent.style.textAlign = "center";
        document.getElementById("survey-content").innerHTML = "Olet jo vastannut tähän kysymykseen";
    } else {
        modalcontent.style.width = "20%";
        modalcontent.style.textAlign = "center";
        document.getElementById("survey-content").innerHTML = `<p>Yritä uudestaan! ❌</p>
                                                               <p>Voit sulkea tämän ikkunan klikkaamalla ruksia tai ympäröivää aluetta</p>`;
    }
}

function returnInfo(points) {
    return `<p>Oikein! ✅<br>+${points} pistettä.</p><p>Voit nyt sulkea tämän ikkunan joko klikkaamalla ruksia tai aluetta ikkunan ympärillä</p>`
}

function returnAward() {
    return `<p>Olet voittanut taitomerkin!</p><br><img src='../img/goodjob.png' class="modalpicture"/>`
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
