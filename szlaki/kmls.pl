#!/usr/bin/perl

my $base = "https://www.bdpn.pl/mapa/kml";

my @a =
  ("sciezki/berehy_gorne/przystanki.kml",
   "sciezki/berehy_gorne/przebieg.kml",
   "sciezki/bukowe_berdo/przystanki.kml",
   "sciezki/bukowe_berdo/przebieg.kml",
   "sciezki/gorny_san/przystanki.kml",
   "sciezki/gorny_san/przebieg.kml",
   "sciezki/polonina_carynska/przystanki.kml",
   "sciezki/polonina_carynska/przebieg.kml",
   "sciezki/polonina_wetlinska/przystanki.kml",
   "sciezki/polonina_wetlinska/przebieg.kml",
   "sciezki/rozsypaniec-krzemien/przystanki.kml",
   "sciezki/rozsypaniec-krzemien/przebieg.kml",
   "sciezki/suche_rzeki-smerek/przystanki.kml",
   "sciezki/suche_rzeki-smerek/przebieg.kml",
   "sciezki/ustrzyki_gorne-szeroki_wierch/przystanki.kml",
   "sciezki/ustrzyki_gorne-szeroki_wierch/przebieg.kml",
   "sciezki/ustrzyki_gorne-wolosate/przystanki.kml",
   "sciezki/ustrzyki_gorne-wolosate/przebieg.kml",
   "sciezki/wielka_rawka/przystanki.kml",
   "sciezki/wielka_rawka/przebieg.kml",
   "sciezki/wolosate-tarnica/przystanki.kml",
   "sciezki/wolosate-tarnica/przebieg.kml",
   "granice/scisla.kml",
   "granice/czynna.kml",
   "granice/Natura.kml",
   "granice/Otulina.kml",
   "granice/BdPN.kml",
   "szlaki/zolty.kml",
   "szlaki/czerwony.kml",
   "szlaki/niebieski.kml",
   "szlaki/zielony.kml",
   "szlaki/czarny.kml",
   "wiaty/deszczochrony.kml",
   "wiaty/odpoczynkowe.kml",
   "parkingi.kml",
   "punkty.kml",
   "wiaty/ogniskowe.kml",
   "pola.kml",
   "dyrekcja.kml");

for my $p (@a) {
  my $f = $p;
  $f =~ s!/!-!g;
  `curl "$base/$p" -o $f`
}
