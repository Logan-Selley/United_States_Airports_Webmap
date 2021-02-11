window.onload = function() {
    // set up Leaflet map
    var mymap = L.map('map', {
        center: [40, -105],
        zoom: 4,
        maxZoom: 10,
        minZoom: 3,
        detectRetina: true
    });
    // add basemap
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mymap);

    // add airport points
    var airports = null;
    var markers = L.markerClusterGroup();
    airports = L.geoJson.ajax("assets/airports.geojson", {
        attribution: 'Airport Data &copy; catalog.data.gov | State Airport Count &copy; Mike Bostock, D3 | Base Map &copy; CartoDB | Made By Logan Selley',
        // set marker id according to Control Tower status
        pointToLayer: function(feature, latlng) {
            var id = 0;
            if (feature.properties.CNTL_TWR == "Y") {
                id = 0
            } else {
                id = 1 // no ATC
            }
            marker = L.marker(latlng, {
                icon: L.divIcon({ // Plane Icon with variable color
                    className: 'fa fa-plane marker-color-' + (id + 1).toString()
                })
            })
            markers.addLayer(marker);
            return marker;
        },
        // add Name popup to each airport point
        onEachFeature: function(feature, layer) {
            layer.bindPopup(feature.properties.AIRPT_NAME);
        }
    });
    // add airports to map
    markers.addTo(mymap);

    // set of colors for airport icons
    var colors = chroma.scale('Set1').mode('lch').colors(2);

    // Add style classes for each marker color
    for (i = 0; i < 2; i++) {
        $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
    };

    // Add US-State polygons
    L.geoJson.ajax("assets/us-states.geojson", {
        style: style
    }).addTo(mymap);

    // color ramp
    colors = chroma.scale('PuBu').colors(6);

    // set color ramp values
    function setColor(density) {
        var id = 0
        if (density > 19) {
            id = 5;
        } else if (density > 14 && density <= 19) {
            id = 4
        } else if (density > 11 && density <= 14) {
            id = 3
        } else if (density > 9 && density <= 11) {
            id = 2
        } else if (density > 6 && density <= 9) {
            id = 1
        } else { id = 0 }
        return colors[id];
    }

    // set US-State polygon style and fill Color according to airport density
    function style(feature) {
        return {
            fillColor: setColor(feature.properties.count),
            fillOpacity: 0.4,
            weight: 2,
            opacity: 1,
            color: '#b4b4b4',
            dasharray: '4'
        };
    };

    // Create Leaflet legend control object
    var legend = L.control({
        position: 'topright'
    });

    // Add Legend html content when it's added to the map
    legend.onAdd = function() {
        var div = L.DomUtil.create('div', 'legend');
        div.innerHTML += '<b> Number of Airports</b><br />';
        div.innerHTML += '<i style="background: ' + colors[5] + '; opacity: 0.5"></i><p> 19+ </p>';
        div.innerHTML += '<i style="background: ' + colors[4] + '; opacity: 0.5"></i><p> 14 - 19 </p>';
        div.innerHTML += '<i style="background: ' + colors[3] + '; opacity: 0.5"></i><p> 11 - 13 </p>';
        div.innerHTML += '<i style="background: ' + colors[2] + '; opacity: 0.5"></i><p> 9 - 10 </p>';
        div.innerHTML += '<i style="background: ' + colors[1] + '; opacity: 0.5"></i><p> 6 - 8 </p>';
        div.innerHTML += '<i style="background: ' + colors[0] + '; opacity: 0.5"></i><p> 0 - 5 </p>';
        div.innerHTML += '<hr><b>Air Traffic Control<b><br />';
        div.innerHTML += '<i class="fa fa-plane marker-color-1"></i><p> Has Air Traffic Control Tower </p>';
        div.innerHTML += '<i class="fa fa-plane marker-color-2"></i><p> No Air Traffic Control Tower </p>';
        return div;
    }

    // add legend to map
    legend.addTo(mymap);

    // add scale bar to map
    L.control.scale({
        position: 'bottomleft'
    }).addTo(mymap);
}