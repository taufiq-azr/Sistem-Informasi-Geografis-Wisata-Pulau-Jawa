const place =ol.proj.fromLonLat([101.438309,0.510440]);

const riauLayer = new ol.layer.Vector({
  source : new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'data/polygon_riau.json'
  }),
});

const jabarLayer = new ol.layer.Vector({
  source : new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'data/jabar_poligon.json'
  }),
});

const pointLayer =new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url : 'data/banjir.json'
  }),

  style: new ol.style.Style({
    image:new ol.style.Icon(({
      anchor: [0.5,46],
      anchorXUnits: 'flaticon',
      anchorYUnits: 'pixels',
      src: 'icon/water-drop.png'
    }))
  })
});

const rumahSakit =new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url : 'data/sebaran_rumah_sakit.json'
  }),

  style: new ol.style.Style({
    image:new ol.style.Icon(({
      anchor: [0.5,46],
      anchorXUnits: 'flaticon',
      anchorYUnits: 'pixels',
      src: 'icon/hospital.png'
    }))
  })
});


const map = new ol.Map({
    target: 'map',
    layers: [
    new ol.layer.Tile({
        source: new ol.source.OSM(),
      }), riauLayer,pointLayer, jabarLayer, rumahSakit
    ],
    view: new ol.View({
      center: [107.609810, -6.914744],
      zoom: 10,
    }),
  });




//menampilkan popup
var container =document.getElementById('popup'),
content_element=document.getElementById('popup-content'),
closer=document.getElementById('popup-closer');

closer.onclick=function(){
  overlay.setPosition(underfined);
  closer.blur();
  return false;
};

//memunculkan popup overlay
var overlay=new ol.Overlay({
  element:container,
  autoPan: true,
  offset: [0, -10]
});

map.addOverlay(overlay);
var fullScreen=new ol.control.FullScreen();
map.addControl(fullScreen);

//menjalankan fungsu evt atau event
map.on('click',function(evt){
  var feature=map.forEachFeatureAtPixel(evt.pixel,
    function (feature,layer){
      return feature;
    });
    if(feature){
      var geometry =feature.getGeometry();
      var coord=geometry.getCoordinates();

      var content='Nama Daerah: <h3>'+feature.get('nama_rs')+'</h3>';
      content+='jumlah korban: <b>'+feature.get('nama_kabupaten_kota')+'</b>';

      content_element.innerHTML=content;
      overlay.setPosition(coord);
      console.info(feature.getProperties());
    }
});


  