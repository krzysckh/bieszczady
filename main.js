const ustrzyki = [49.0973, 22.6322];
const map = L.map('map').setView(ustrzyki, 12);
const optsel = document.getElementById("options");

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function addopt(t, el, c) {
  const cb = document.createElement("input");
  const l = document.createElement("label");
  const br = document.createElement("br");
  const color = c || 'navyblue';

  cb.id = t;
  cb.name = t;
  cb.type = "checkbox";

  const updatething = thing => {
    if (cb.checked) {
      thing.addTo(map);
      if (thing.setStyle)
        thing.setStyle({color: color});
    } else
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
  { path: "Program-zanocuj-w-lesie.kml"                                 , color: 'orange' },
  { path: "szlaki/dyrekcja.kml"                                         , color: 'black' },
  { path: "szlaki/granice-BdPN.kml"                                     , color: 'blue' },
  { path: "szlaki/granice-Natura.kml"                                   , color: 'green' },
  { path: "szlaki/granice-Otulina.kml"                                  , color: 'red' },
  { path: "szlaki/granice-czynna.kml"                                   , color: 'blue' },
  { path: "szlaki/granice-scisla.kml"                                   , color: 'black' },
  { path: "szlaki/parkingi.kml"                                         , color: 'black' },
  { path: "szlaki/pola.kml"                                             , color: 'black' },
  { path: "szlaki/punkty.kml"                                           , color: 'black' },
  { path: "szlaki/sciezki-berehy_gorne-przebieg.kml"                    , color: 'black' },
  { path: "szlaki/sciezki-berehy_gorne-przystanki.kml"                  , color: 'black' },
  { path: "szlaki/sciezki-bukowe_berdo-przebieg.kml"                    , color: 'black' },
  { path: "szlaki/sciezki-bukowe_berdo-przystanki.kml"                  , color: 'black' },
  { path: "szlaki/sciezki-gorny_san-przebieg.kml"                       , color: 'black' },
  { path: "szlaki/sciezki-gorny_san-przystanki.kml"                     , color: 'black' },
  { path: "szlaki/sciezki-polonina_carynska-przebieg.kml"               , color: 'black' },
  { path: "szlaki/sciezki-polonina_carynska-przystanki.kml"             , color: 'black' },
  { path: "szlaki/sciezki-polonina_wetlinska-przebieg.kml"              , color: 'black' },
  { path: "szlaki/sciezki-polonina_wetlinska-przystanki.kml"            , color: 'black' },
  { path: "szlaki/sciezki-rozsypaniec-krzemien-przebieg.kml"            , color: 'black' },
  { path: "szlaki/sciezki-rozsypaniec-krzemien-przystanki.kml"          , color: 'black' },
  { path: "szlaki/sciezki-suche_rzeki-smerek-przebieg.kml"              , color: 'black' },
  { path: "szlaki/sciezki-suche_rzeki-smerek-przystanki.kml"            , color: 'black' },
  { path: "szlaki/sciezki-ustrzyki_gorne-szeroki_wierch-przebieg.kml"   , color: 'black' },
  { path: "szlaki/sciezki-ustrzyki_gorne-szeroki_wierch-przystanki.kml" , color: 'black' },
  { path: "szlaki/sciezki-ustrzyki_gorne-wolosate-przebieg.kml"         , color: 'black' },
  { path: "szlaki/sciezki-ustrzyki_gorne-wolosate-przystanki.kml"       , color: 'black' },
  { path: "szlaki/sciezki-wielka_rawka-przebieg.kml"                    , color: 'black' },
  { path: "szlaki/sciezki-wielka_rawka-przystanki.kml"                  , color: 'black' },
  { path: "szlaki/sciezki-wolosate-tarnica-przebieg.kml"                , color: 'black' },
  { path: "szlaki/sciezki-wolosate-tarnica-przystanki.kml"              , color: 'black' },
  { path: "szlaki/szlaki-czarny.kml"                                    , color: 'black' },
  { path: "szlaki/szlaki-czerwony.kml"                                  , color: 'red' },
  { path: "szlaki/szlaki-niebieski.kml"                                 , color: 'blue' },
  { path: "szlaki/szlaki-zielony.kml"                                   , color: 'green' },
  { path: "szlaki/szlaki-zolty.kml"                                     , color: 'yellow' },
  { path: "szlaki/wiaty-deszczochrony.kml"                              , color: 'black' },
  { path: "szlaki/wiaty-odpoczynkowe.kml"                               , color: 'black' },
  { path: "szlaki/wiaty-ogniskowe.kml"                                  , color: 'black' },
];

let szlaki = [], campsdata, camps;

window.onload = async () => {
  const res = await fetch('camps.json');
  const campsjson = await res.json();

  campsdata = campsjson.elements.map(c => { return {pos: [c.lat || c.bounds.minlat, c.lon || c.bounds.minlon], data: c.tags} });

  camps = campsdata.map(e => {
    if (e.pos[0] == undefined || e.pos[1] == undefined) return;
    const marker = L.marker(e.pos);
    let text = "<table>";
    for (const [k, v] of Object.entries(e.data)) {
      text += `<tr><td><b>${k}</b></td><td>${v.replace(/[\-_]/g, " ")}</td></tr>`;
    }
    text += "</table>";
    marker.bindPopup(text);
    return marker;
  });
  addopt("Pola namiotowe", camps);

  let ctr = 0;
  kmls.forEach(p => {
    const v = omnivore.kml(p.path);
    console.log(v);
    v.setStyle({color: 'black'});
    szlaki.push({
      path: p.path,
      val: v,
    });
    addopt(p.path, v, p.color);
  });
};
