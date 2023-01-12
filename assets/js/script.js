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
    center: ol.proj.fromLonLat([107.609810, -6.914744]),
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

    if (feature.get('nama_rs') != null) {
      content += '<img class="img-thumbnail" style="width: 100% !important; margin: auto;" src="assets/img/' + feature.get('nama_rs') + '.jpg" alt="rs-image"/><br>';
      content += 'Nama Rumah Sakit: <b>' + feature.get('nama_rs') + '</b>';
      content += 'Provinsi: <b>' + feature.get('nama_kabupaten_kota') + '</b>';
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
      name: "layer_jabar",
      layer: new ol.layer.Vector({
        source: new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          url: 'assets/data/jabar_poligon.json',
          name: 'jabar'
        }),
      }),
    },
    {
      name: "layer_rumah_sakit",
      layer: new ol.layer.Vector({
        source: new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          url: 'assets/data/sebaran_rumah_sakit.json'
        }),

        style: new ol.style.Style({
          image: new ol.style.Icon(({
            anchor: [0.5, 46],
            anchorXUnits: 'flaticon',
            anchorYUnits: 'pixels',
            src: 'icon/hospital.png'
          }))
        }),
        name: 'rumah_sakit'
      })
    },
    {
      name: "layer_aids",
      layer: new ol.layer.Vector({
        source: new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          url: 'assets/data/AIDS.json'
        }),

        style: new ol.style.Style({
          image: new ol.style.Icon(({
            anchor: [0.5, 46],
            anchorXUnits: 'flaticon',
            anchorYUnits: 'pixels',
            src: 'icon/aids.png'
          }))
        }),
        name: 'layer_aids'
      })
    },
    {
      name: "layer_campak",
      layer: new ol.layer.Vector({
        source: new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          url: 'assets/data/campak.json'
        }),

        style: new ol.style.Style({
          image: new ol.style.Icon(({
            anchor: [0.5, 46],
            anchorXUnits: 'flaticon',
            anchorYUnits: 'pixels',
            src: 'icon/aids.png'
          }))
        }),
        name: 'layer_campak'
      })
    },
    {
      name: "layer_dbd",
      layer: new ol.layer.Vector({
        source: new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          url: 'assets/data/DBD.json'
        }),

        style: new ol.style.Style({
          image: new ol.style.Icon(({
            anchor: [0.5, 46],
            anchorXUnits: 'flaticon',
            anchorYUnits: 'pixels',
            src: 'icon/aids.png'
          }))
        }),
        name: 'layer_dbd'
      })
    },
    {
      name: "layer_kusta",
      layer: new ol.layer.Vector({
        source: new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          url: 'assets/data/KUSTA.json'
        }),

        style: new ol.style.Style({
          image: new ol.style.Icon(({
            anchor: [0.5, 46],
            anchorXUnits: 'flaticon',
            anchorYUnits: 'pixels',
            src: 'icon/aids.png'
          }))
        }),
        name: 'layer_kusta'
      })
    },
    {
      name: "layer_malaria",
      layer: new ol.layer.Vector({
        source: new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          url: 'assets/data/MALARIA.json'
        }),

        style: new ol.style.Style({
          image: new ol.style.Icon(({
            anchor: [0.5, 46],
            anchorXUnits: 'flaticon',
            anchorYUnits: 'pixels',
            src: 'icon/aids.png'
          }))
        }),
        name: 'layer_malaria'
      })
    },
    {
      name: "layer_pneumonia",
      layer: new ol.layer.Vector({
        source: new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          url: 'assets/data/PNEUMONIA.json'
        }),

        style: new ol.style.Style({
          image: new ol.style.Icon(({
            anchor: [0.5, 46],
            anchorXUnits: 'flaticon',
            anchorYUnits: 'pixels',
            src: 'icon/aids.png'
          }))
        }),
        name: 'layer_pneumonia'
      })
    },
    {
      name: "layer_tbc",
      layer: new ol.layer.Vector({
        source: new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          url: 'assets/data/TBC.json'
        }),

        style: new ol.style.Style({
          image: new ol.style.Icon(({
            anchor: [0.5, 46],
            anchorXUnits: 'flaticon',
            anchorYUnits: 'pixels',
            src: 'icon/aids.png'
          }))
        }),
        name: 'layer_tbc'
      })
    },
    {
      name: "layer_tetanus",
      layer: new ol.layer.Vector({
        source: new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          url: 'assets/data/TETANUS.json'
        }),

        style: new ol.style.Style({
          image: new ol.style.Icon(({
            anchor: [0.5, 46],
            anchorXUnits: 'flaticon',
            anchorYUnits: 'pixels',
            src: 'icon/aids.png'
          }))
        }),
        name: 'layer_tetanus'
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
      case "rs":
        layers.forEach(lyr => {
          if (lyr.name === "layer_rumah_sakit") {
            map.addLayer(lyr.layer);
          }
        });

        break;
      case "jabar":
        layers.forEach(lyr => {
          if (lyr.name === "layer_jabar") {
            map.addLayer(lyr.layer);
          }
        });

        break;
      case "aids":
        layers.forEach(lyr => {
          if (lyr.name === "layer_aids") {
            map.addLayer(lyr.layer);
          }
        });

        break;

      case "dbd":
        layers.forEach(lyr => {
          if (lyr.name === "layer_dbd") {
            map.addLayer(lyr.layer);
          }
        });

        break;

      case "campak":
        layers.forEach(lyr => {
          if (lyr.name === "layer_campak") {
            map.addLayer(lyr.layer);
          }
        });

        break;

      case "kusta":
        layers.forEach(lyr => {
          if (lyr.name === "layer_kusta") {
            map.addLayer(lyr.layer);
          }
        });

        break;

      case "malaria":
        layers.forEach(lyr => {
          if (lyr.name === "layer_malaria") {
            map.addLayer(lyr.layer);
          }
        });

        break;

      case "pneumonia":
        layers.forEach(lyr => {
          if (lyr.name === "layer_pneumonia") {
            map.addLayer(lyr.layer);
          }
        });

        break;

      case "tbc":
        layers.forEach(lyr => {
          if (lyr.name === "layer_tbc") {
            map.addLayer(lyr.layer);
          }
        });

        break;

      case "tetanus":
        layers.forEach(lyr => {
          if (lyr.name === "layer_tetanus") {
            map.addLayer(lyr.layer);
          }
        });

        break;
      default:
        break;
    }
  });
}

function initMap() {
  let place = ol.proj.fromLonLat([101.438309, 0.510440]);
}

$(document).ready(function () {
  initMap();
})

