let layerList = [];

var map;

map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
      name: "default",
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([106.826797, -6.143013]),
    zoom: 9,
  }),
});

//menampilkan popup
var container = document.getElementById('popup'),
  content_element = document.getElementById('popup-content'),
  closer = document.getElementById('popup-closer');

closer.onclick = function () {
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
      var content = "";
  
      if (feature.get('Place_Name') != null) {
        content +=  '<img src="'+feature.get('Foto')+'" width="200" height="100"/>' + '</h3>' + '</br>';
        content += 'Nama Tempat Wisata: <b>' + feature.get('Place_Name') + '</b>';
        content += 'Provinsi: <b>' + feature.get('City') + '</b>';
      } else {
        content += '<h3 style="text-align: center;">Tidak ada data ditemukan :"(</h3>'
      }
  
      content_element.innerHTML = content;
      overlay.setPosition(coord);
      console.info(feature.getProperties());
    }
  });

function selectLayer(e) {
    if ($(e).is(":checked")) {
      layerList.push($(e).val());
    } else {
      for (let i = 0; i < layerList.length; i++) {
        if (layerList[i] == $(e).val()) {
          layerList.splice(i, 1)
        }
      }
    }
    switchLayer();
  }
  
  function emptyLayer() {
    map.getLayers().forEach(layer => {
      if (layer && layer.get('name') != 'default') {
        map.removeLayer(layer);
      }
    });
  }

  function switchLayer() {
    emptyLayer();
  
    let layers = [
      {
        name: "layer_jawa",
        layer: new ol.layer.Vector({
          source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: './data/Lokasi-Jawa.json',
            name: 'layer_jawa'
          }),
        }),
      },
      {
        name: "layer_tempatwisata",
        layer: new ol.layer.Vector({
          source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: './data/Data-wisata.json'
          }),
  
          style: new ol.style.Style({
            image: new ol.style.Icon(({
              anchor: [0.5, 46],
              anchorXUnits: 'flaticon',
              anchorYUnits: 'pixels',
              src: 'icon/lokasi.png'
            }))
          }),
          name: 'layer_tempatwisata'
        })
      },
    ];
  
    layerList.forEach(layer => {
      switch (layer) {
        case "all":
          layers.forEach(lyr => {
            map.addLayer(lyr.layer);
          });
  
          break;
        case "tempatwisata":
          layers.forEach(lyr => {
            if (lyr.name === "layer_tempatwisata") {
              map.addLayer(lyr.layer);
            }
          });
  
          break;
        case "jawa":
          layers.forEach(lyr => {
            if (lyr.name === "layer_jawa") {
              map.addLayer(lyr.layer);
            }
          });
          default:
          break;
        }
      });
  }
  
  function initMap() {
    let place = ol.proj.fromLonLat([106.826797 , -6.143013]);
  }
  
  $(document).ready(function () {
    initMap();
  })