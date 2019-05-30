
$(document).ready(function(){
//  $(document).ready(function){
//         $('.fav-places .btn').click(){
//             console.log('buton');
//             console.log($(this));
//         }
//     }
window.markersList = [];

var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: new google.maps.LatLng(46.298085, 25.100575),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});


loadMarkers();

map.addListener('click', function (e) {
    addMarker(e.latLng, map);
    
    var myMarkersList = JSON.parse(localStorage.getItem('markers'));
    var pin_index = myMarkersList.length - 1;

    $(".fav-places").append(
        '<div class="form" data-pin-index="'+pin_index+'">'+
            '<input type="text" class="nume" placeholder="Nume">'+
            '<input type="text" class="descriere" placeholder="Descriere">'+
            '<a href="javascript:void(0)" class="btn btn-primary btn-sm saveform">Salveaza</a>'+
        '</div>'
    );
    //loadMarkers();
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
    saveMarkers();
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

function initMap() {

}

function showPin(pin_index){
    // show pin on map

}

function saveMarkers()
{
    localStorage.setItem('markers', JSON.stringify(window.markersList));
}

function loadMarkers()
{
    var myMarkersList = localStorage.getItem('markers');
    console.log(myMarkersList);
    if (myMarkersList) {
        window.markersList = JSON.parse(myMarkersList);

        window.markersList.forEach(function (item, i){

            console.log(item);
           new google.maps.Marker({
                position: new google.maps.LatLng(item.lat, item.lng),
                map: map
            });

            var html = '';
            if( item.name == '' || item.descriere == '')
            {
                html = '';
            }

            $(".fav-places").append(
                '<li class="pin" data-lat="'+item.lat+'" data-lng="'+item.lng+'" data-pin-index="'+i+'">'+
                    '<div class="name">'+item.name + '</div>'+
                    '<div class="descriere">'+item.descriere + '</div>'+
                '</li>'
            );

        })    
    }
}

    $('body').on('click','.saveform',function(){
        var form = $(this).parent(),
            pin_index = $(form).data('pin-index'),
            nume = $(form).find('.nume').val();
        // descriere

        // salveaza in localstorage[pin_index]
        console.log(nume);

        

    // var index = this.attr();
    })

    $('body').on('click','.fav-places .pin',function(){
        // show pin harta
        var lat = $(this).data('lat'),
            lng = $(this).data('lng'),
            pin_index = $(this).data('pin-index');

            //showMap(lat, lng);


            // todo -  de folosit pin_index + localstorage
            // localstorage[pin_index]
            // showPin()

        alert('trimite la: ' + lat + ' '+ lng);
    })


  
})