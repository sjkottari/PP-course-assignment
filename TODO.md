# Things to do

## TODO

- Sivun headerin fontin muutos? Muita tyylimuutoksia, jos koetaan tarpeelliseksi?
- Kartan koko (height) skaalautuu näytön koon ja resoluution mukaan? Miten tän vois toteuttaa?
- Progress barin edetessä (scorea saadaan) käyttäjä saa erilaisia badgeja (iso popup-ikkuna)
- Paikkojen kysely-nappi: Annetaanko olla nykyisellään, vai lyhennetäänkö "Kysely"-muotoon?
- Alert-ikkuna kyselyä suorittaessa muotoilla toisin? Esim. käyttää confirm() tai prompt() -metodia sen sijaan
  https://www.w3schools.com/jsref/met_win_confirm.asp & https://www.w3schools.com/jsref/met_win_prompt.asp 
- Ohjelmiston kielen muuttaminen suomeksi? tai pelkästään englanniksi?

## Useful links

- https://leafletjs.com/
- https://wiki.openstreetmap.org/wiki/Using_OpenStreetMap
- https://www.npmjs.com/package/axios
- https://www.mapbox.com/ Hox! maksullinen

## Useful snippets

```javascript
// Leaflet base map
this.map = L.map(
  "mapScreen",
  {
    center: new L.LatLng(LAT, LNG),
    zoom: this.state.currentZoom,
    maxZoom: 18,
    minZoom: 7,
    maxBounds: bounds,
    zoomControl: true,
    layers: new L.TileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="//openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: ["a", "b", "c"],
      }
    ),
  },
  100
);
```
