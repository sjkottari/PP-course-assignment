
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

// 1. Pinnin sekä popupin luonti kartalle
var marker = L.marker([65.01207, 25.46508]).addTo(mymap);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.");

// 2. Pinni jossa on mukana kuva
var picMarker = L.marker([65.06389, 25.48390]).addTo(mymap);
var picPopup = L.popup({ maxHeight: 200 });
function pictureClick(e) {
    picPopup
        .setContent('<img src="https://static.pexels.com/photos/189349/pexels-photo-189349.jpeg" height="200px "width="200px"/>'
            + '<br>Look at this beautiful pic<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod '
            + 'tempor incididunt ut labore et dolore magna aliqua. Arcu risus quis varius quam quisque id diam. Faucibus '
            + 'scelerisque eleifend donec pretium vulputate.')
        .openOn(mymap);
}
picMarker.bindPopup(picPopup).on("click", pictureClick);

// Generic pinnin luominen kartalle
var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}
mymap.on("click", onMapClick);

/*
var testMarker = L.marker([65.03048297027293, 25.411479986524917]).addTo(mymap);
var buttonPopup = L.popup();

var container = L.DomUtil.create('div');
startBtn = this.createButton('Start from this location', container),
destBtn = this.createButton('Go to this location', container);
div.innerHTML = ''+startBtn+ '&nbsp;&nbsp;&nbsp;&nbsp;' + destBtn ; 

function popupButtons(e) {
    buttonPopup
        .setLatLng(e.latlng)
        .setContent('You clicked the map at ' + e.latlng.toString() + '<br>')
        .openOn(mymap);
}

L.DomEvent.on(startBtn, 'click', () => {
    alert("toto");
});
  
L.DomEvent.on(destBtn, 'click', () => {
    alert("tata");
});

function createButton(label: string, container: any) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

testMarker.bindPopup(buttonPopup).on("click", popupButtons);
*/