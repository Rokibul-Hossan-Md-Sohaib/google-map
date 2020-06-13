var map;
var markers=[];
var infoWindow;
function initMap() {
   var losAngeles={
       lat : 34.063380,
       lng : -118.358080
   }
    map = new google.maps.Map(document.getElementById('map'), {
    center: losAngeles,
    zoom: 8,
   
    styles: [
        {elementType: 'geometry', stylers: [{color: '	#242f3e	'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#242f3e'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#242f3e'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#242f3e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#242f3e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
});

    

    infoWindow = new google.maps.InfoWindow();
    
    searchStore();

   
   
    setOnClick();
}

function searchStore(){
    var foundores=[];
    var zipCode =document.getElementById("zip-code").value;
    if(zipCode)
    {
        stores.forEach(function(store){
            var postal =store.address.postalCode.substring(0,5);
            if(postal==zipCode){
                foundStores.push(store)
            }
        })
    } else{
        foundStores=stores;
    }
    clearLocations()
    displayStores(foundStores);
    showStoreMarker(foundStores);
    setOnClick();
    }
    
    function clearLocations() {
        infoWindow.close();
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers.length = 0;
    }


function setOnClick(){
    var storeElements=document.querySelectorAll('.store-container')
    storeElements.forEach(function(elem,index){
        elem.addEventListener('click', function(){
            google.maps.event.trigger(markers[index], 'click')
        })
    })
}

function displayStores(stores){
    var storesHtml="";
    stores.forEach(function(store,index){
        var Address= store.addressLines;
        var PhoneNumber=store.phoneNumber;
        console.log(store);
        storesHtml+=`
        <div class="store-container">
                <div class="store-container-background">
                <div class="store-info-container">
                    <div class="store-address">
                    <span>${Address[0]}</span>
                    
                   <span>${Address[1]}</span>
                </div>
                <div class="store-list-phoneNumber">${PhoneNumber}</div>
            </div>
            <div class="store-number-container">
                <div class="store-number">
                    ${index+1}
                </div>
            </div>
            </div>
        </div>`
    });

    document.querySelector(".store-list").innerHTML=storesHtml;
}

function showStoreMarker(stores){
     var bounds = new google.maps.LatLngBounds();
    stores.forEach(function(store,index)
    {
        var latlng= new google.maps.LatLng(
            store.coordinates.latitude,
            store.coordinates.longitude
        )
        console.log(latlng);
        var name= store.name;
        var address =store.addressLines[0];
        var phone= store.phoneNumber;
        var statusText=store.openStatusText;
         bounds.extend(latlng);
        createMarker(latlng, name, address,phone,statusText, index);
    })
    map.fitBounds(bounds);
}

function createMarker(latlng, name, address,phone,statusText, index) {
    var html = `
    <div class=" store-info-window">
        <div class="store-info-name">
        ${name}
        </div>
        <div class="store-info-status">
        ${statusText}
        </div> 
        <div class=" store-info-address">
        <div class="circle">
        <i class="fas fa-location-arrow"></i>
        </div>
        ${address}
        </div> 
        <div class="store-info-phone">
        <div class="circle">
        <i class="fas fa-phone-volume"></i>
        </div>
        ${phone}
        </div>    
    </div>
    `;

    
    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      label:`${index+1}`,
      icon: 'image/my-icon.png'
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
  }