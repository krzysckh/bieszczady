const ustrzyki = [49.0973, 22.6322];
const map = L.map('map').setView(ustrzyki, 12);
const optsel = document.getElementById("options");

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function addopt(t, el) {
  const cb = document.createElement("input");
  const l = document.createElement("label");
  const br = document.createElement("br");

  cb.id = t;
  cb.name = t;
  cb.type = "checkbox";

  const updatething = thing => {
    if (cb.checked)
      thing.addTo(map);
    else
      thing.remove();
  };

  cb.addEventListener('change', e => {
    if (!el.addTo)
      el.forEach(updatething);
    else
      updatething(el);
  });

  l.htmlFor = t;
  l.innerHTML = (t.split("/")[1] || t).replace(/[_\-]/g, " ").split(".")[0];

  optsel.appendChild(cb);
  optsel.appendChild(l);
  optsel.appendChild(br);
}

const kmls = [
  "Program-zanocuj-w-lesie.kml",
  "szlaki/dyrekcja.kml",
  "szlaki/granice-BdPN.kml",
  "szlaki/granice-Natura.kml",
  "szlaki/granice-Otulina.kml",
  "szlaki/granice-czynna.kml",
  "szlaki/granice-scisla.kml",
  "szlaki/parkingi.kml",
  "szlaki/pola.kml",
  "szlaki/punkty.kml",
  "szlaki/sciezki-berehy_gorne-przebieg.kml",
  "szlaki/sciezki-berehy_gorne-przystanki.kml",
  "szlaki/sciezki-bukowe_berdo-przebieg.kml",
  "szlaki/sciezki-bukowe_berdo-przystanki.kml",
  "szlaki/sciezki-gorny_san-przebieg.kml",
  "szlaki/sciezki-gorny_san-przystanki.kml",
  "szlaki/sciezki-polonina_carynska-przebieg.kml",
  "szlaki/sciezki-polonina_carynska-przystanki.kml",
  "szlaki/sciezki-polonina_wetlinska-przebieg.kml",
  "szlaki/sciezki-polonina_wetlinska-przystanki.kml",
  "szlaki/sciezki-rozsypaniec-krzemien-przebieg.kml",
  "szlaki/sciezki-rozsypaniec-krzemien-przystanki.kml",
  "szlaki/sciezki-suche_rzeki-smerek-przebieg.kml",
  "szlaki/sciezki-suche_rzeki-smerek-przystanki.kml",
  "szlaki/sciezki-ustrzyki_gorne-szeroki_wierch-przebieg.kml",
  "szlaki/sciezki-ustrzyki_gorne-szeroki_wierch-przystanki.kml",
  "szlaki/sciezki-ustrzyki_gorne-wolosate-przebieg.kml",
  "szlaki/sciezki-ustrzyki_gorne-wolosate-przystanki.kml",
  "szlaki/sciezki-wielka_rawka-przebieg.kml",
  "szlaki/sciezki-wielka_rawka-przystanki.kml",
  "szlaki/sciezki-wolosate-tarnica-przebieg.kml",
  "szlaki/sciezki-wolosate-tarnica-przystanki.kml",
  "szlaki/szlaki-czarny.kml",
  "szlaki/szlaki-czerwony.kml",
  "szlaki/szlaki-niebieski.kml",
  "szlaki/szlaki-zielony.kml",
  "szlaki/szlaki-zolty.kml",
  "szlaki/wiaty-deszczochrony.kml",
  "szlaki/wiaty-odpoczynkowe.kml",
  "szlaki/wiaty-ogniskowe.kml",
];

const szlaki = kmls.map(p => { return { path: p, val: omnivore.kml(p) }; });
let campsdata;
let camps;

window.onload = async () => {
  const res = await fetch('camps.json');
  const campsjson = await res.json();

  campsdata = campsjson.elements.map(c => { return {pos: [c.lat || c.bounds.minlat, c.lon || c.bounds.minlon], data: c.tags} });
  camps = campsdata.map(e => {
    if (e.pos[0] == undefined || e.pos[1] == undefined) return;
    const marker = L.marker(e.pos);
    let text = "<table>";
    for (const [k, v] of Object.entries(e.data)) {
      text += `<tr><td><b>${k}</b></td><td>${v}</td></tr>`;
    }
    text += "</table>";
    marker.bindPopup(text);
    return marker;
  });
  addopt("Pola namiotowe", camps);

  szlaki.forEach(s => {
    addopt(s.path, s.val);
  });
};
