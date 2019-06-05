
$(document).ready(function () {
    //  $(document).ready(function){
    //         $('.fav-places .btn').click(){
    //             console.log('buton');
    //             console.log($(this));
    //         }
    //     }
    window.markersList = [];
    window.nameList = [];
    window.descriptionList = [];

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: new google.maps.LatLng(46.298085, 25.100575),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });


    loadMarkers();

    map.addListener('click', function (e) {
        addMarker(e.latLng, map);

        var myMarkersList = JSON.parse(localStorage.getItem('markers'));

        if (!myMarkersList) {
            myMarkersList = [];
        }
        var pin_index = myMarkersList.length;

        $(".fav-places").append(
            '<div class="form" data-pin-index="' + pin_index + '">' +
            '<input type="text" class="nume" placeholder="Nume">' +
            '<input type="text" class="descriere" placeholder="Descriere">' +
            '<a href="javascript:void(0)" class="btn btn-primary btn-sm saveform">Salveaza</a>' +
            '</div>'
        );
        //loadMarkers();

        localStorage.setItem('markers', JSON.stringify(markersList));
    })

    // Adds a marker to the map and push to the array.
    function addMarker(location, map) {
        var mymarker = {
            name: '',
            descriere: '',
            lat: location.lat(),
            lng: location.lng()
        }

        new google.maps.Marker({
            position: location,
            map: map
        });

        window.markersList.push(mymarker);
        // aici iar cod de adaugat in lista
    }

    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setMapOnAll(null);
    }

    // Shows any markers currently in the array.
    function showMarkers() {
        setMapOnAll(map);
    }

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }


    function loadMarkers() {
        var myMarkersList = localStorage.getItem('markers');
        //console.log(myMarkersList);
        if (myMarkersList) {
            window.markersList = JSON.parse(myMarkersList);

            window.markersList.forEach(function (item, i) {

                if (!window.mapPin) {
                    window.mapPin = [];
                }

                window.mapPin.push(new google.maps.Marker({
                    position: new google.maps.LatLng(item.lat, item.lng),
                    map: map
                }));


                $(".fav-places").append(
                    '<li class="pin" data-lat="' + item.lat + '" data-lng="' + item.lng + '" data-pin-index="' + i + '">' + item.name + ' ' + item.descriere +
                    '<a href="javascript:;" class="delete-marker" data-index="' + i + '" data-marker-index="' + (window.mapPin.length - 1) + '">X</a>' +
                    '</li>'
                );

            })


        }
    }

    $('body').on('click', '.saveform', function () {
        var form = $(this).parent(),
            pin_index = $(form).data('pin-index'),
            nume = $(form).find('.nume').val(),
            // descriere
            descriere = $(form).find('.descriere').val();

        var myMarkersList = JSON.parse(localStorage.getItem('markers'));
        myMarkersList[pin_index].name = nume;
        myMarkersList[pin_index].descriere = descriere;
        localStorage.setItem('markers', JSON.stringify(myMarkersList));

    })

    $('body').on('click', '.fav-places .pin', function () {
        // show pin harta
        var lat = $(this).data('lat'),
            lng = $(this).data('lng'),
            pin_index = $(this).data('pin-index');

        //showMap(lat, lng);


        // todo -  de folosit pin_index + localstorage
        // localstorage[pin_index]
        localStorage.setItem('pin_index', JSON.stringify(pin_index));
        // showPin()

        //alert('trimite la: ' + lat + ' ' + lng);

        map.setCenter({lat:lat, lng:lng});
        map.setZoom(15);

        
    })

    $('body').on('click', '.fav-places .delete-marker', function (e) {
        e.stopPropagation();
        var pin_index = $(this).data('index'),
            marker_index = $(this).data('marker-index');
        
        window.mapPin[marker_index].setMap(null);
        

        var myMarkersList = JSON.parse(localStorage.getItem('markers'));
        myMarkersList.splice(pin_index, 1);
        localStorage.setItem('markers', JSON.stringify(myMarkersList));


        $(this).parent().remove();
    })

})

function loadInfo() {
    var nume = localStorage.getItem('name');
    var descriere = localStorage.getItem('descriere');
    if (nume) {
        console.log(name);
        window.nameList.forEach(function (i, item) {
            $(".fav-places").append(
                '<p class="pin2" data-name="' + name + '>' +
                '</p>'
            );
        });
    }
    if(descriere) {
        console.log(descriere);
        window.descriptionList.forEach(function (i, item) {
            $(".fav-places").append(
                '<p class="pin3" data-description="' + descriere + '>' +
                '</p>'
            );
        });
    }
}