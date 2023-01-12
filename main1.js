const place = ol.proj.fromLonLat([106.83161793175056 , -6.188907811857472]); //membuat variable baru untuk menyimpan koordinat
//membuat variable baru untuk menampilkan polygon riau


var JawaLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url:'data/Lokasi-Jawa.json'
  })
});

//membuat variable untuk menampilkan data banjir di Riau
var pointLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url:'data/Data-wisata.json'
  }),
  style: new ol.style.Style({
    image: new ol.style.Icon(({
      anchor: [0.5 , 46],
      anchorXUnits: 'fraticon',
      anchorYUnits: 'pixels',
      src: 'icon/lokasi.png'
    }))
  })
});



var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),JawaLayer, pointLayer
  ],
  view: new ol.View({
    center: place, //untuk memanggil peta yang kita cari
    zoom: 11, //mengatur ukuran dari map
  }),
});

//Menampilkan Pop Up
//menampilkan popup
var container = document.getElementById('popup'),
content_element = document.getElementById('popup-content'),
closer = document.getElementById('popup-closer');

closer.onclick = function() {
overlay.setPosition(undefined);
closer.blur();
return false;
};

//memunculkan popup overlay
var overlay = new ol.Overlay({
element: container,
autoPan: true,
offset: [0, -10]
});

map.addOverlay(overlay);
var fullScreen = new ol.control.FullScreen();
map.addControl(fullScreen);

//menjalankan fungsu evt atau event
map.on('click', function (evt) {
var feature = map.forEachFeatureAtPixel(evt.pixel,
    function (feature, layer) {
        return feature;
    });
if (feature) {
    var geometry = feature.getGeometry();
    var coord = geometry.getCoordinates();
    if (feature.get('Place_Name') != null) {
    var content = 'Nama Wisata : <h3>' + feature.get('Place_Name') + '</h3>' + '</b>';
    content +=  '<img src="'+feature.get('Foto')+'" width="200" height="100"/>' + '</h3>' + '</br>';
    content += 'Lokasi : <b>' + feature.get('City') + '</b>' + '</br>';
    content += 'Category : <b>' + feature.get('Category') + '</b>' + '</br>';
    content += 'Biaya Masuk  : <b>' + feature.get('Price') + '</b>' + '</br>';
    content += 'jumlah Pengunjung 2020 : <b>' + feature.get('Jml_pengun') + '</b>' + '</br>';
    content += 'jumlah Pengunjung 2021 : <b>' + feature.get('Jml_peng_1') + '</b>';
    }
    else {
      content += '<h3 style="text-align: center;">Tidak ada data ditemukan :"(</h3>'
    }
    content_element.innerHTML = content;
    overlay.setPosition(coord);
    console.info(feature.getProperties());
    

}
});

