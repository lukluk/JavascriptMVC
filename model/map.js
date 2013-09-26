var Map = {
     map: null,
        loadResults: function (data) {
            var items, markers_data = [];
            items = data.data.result;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];

                if (item.location.lat != undefined && item.location.lng != undefined) {
                    var icon = '/img/' + item.type + '.png';
                    markers_data.push({
                        lat: item.location.lat,
                        lng: item.location.lng,
                        title: item.name,
                        icon: {
                            size: new google.maps.Size(32, 32),
                            url: icon
                        }
                    });
                }
            }
            map.addMarkers(markers_data);
        },

        _event: function () {
            $(document).on('click', '.pan-to-marker', function (e) {
                e.preventDefault();

                var position, lat, lng, $index;

                $index = $(this).data('marker-index');

                position = map.markers[$index].getPosition();

                lat = position.lat();
                lng = position.lng();

                map.setCenter(lat, lng);
            });
        },
        _init: function () {
            map = new GMaps({
                div: '#map',
                lat: -12.043333,
                lng: -77.028333
            });

            map.on('marker_added', function (marker) {
                var index = map.markers.indexOf(marker);
                $('#results').append('<li><a href="#" class="pan-to-marker" data-marker-index="' + index + '">' + marker.title + '</a></li>');

                if (index == map.markers.length - 1) {
                    map.fitZoom();
                }
            });

            var xhr = $.getJSON('/api/map/searchBy/' + phonegab.gps.long + '/' + phonegab.gps.lat);
            xhr.done(loadResults);
        }

}