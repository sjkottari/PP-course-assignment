# Things to do

## TODO

- Pop upeihin kuvia, videoita... Muuta toiminnallisuutta kuin tekstiä? Esimerkiksi vieritettävä popup-näkymä
- Popupien klikkaaminen kasvattaa progress barin scorea? Popupeista voisi avautua monivalintakysely, jonka oikein suorittaminen kasvattaisi scorea? Tätä voisi kokeilla toteuttaa.
    - Vaihtoehtoisesti sivun reunassa (alhaalla) voisi olla yksi kyselylinkki, josta avautuu popup ja jonka voi suorittaa scoren kasvattamiseksi.
- Kun score on MAX, tulee koko näkymän popup, jossa saa viimeisen(?) badgen ja kenties fuksipisteitä?
- Progress barin edetessä (scorea saadaan) käyttäjä saa erilaisia badgeja (iso popup-ikkuna)

## Useful links

- https://leafletjs.com/
- https://wiki.openstreetmap.org/wiki/Using_OpenStreetMap
- https://www.npmjs.com/package/axios
- https://www.mapbox.com/ Hox! maksullinen

## Useful snippets

```javascript
// Leaflet base map
this.map = L.map('mapScreen', {
            center: new L.LatLng(LAT, LNG),
            zoom: this.state.currentZoom,
            maxZoom: 18,
            minZoom:7,
            maxBounds: bounds,
            zoomControl: true,
            layers: new L.TileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="//openstreetmap.org/copyright">OpenStreetMap</a>',
                subdomains: ['a','b','c']
            })
            
        }, 100)
```
