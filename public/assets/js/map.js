$(document).ready(() => {
  var myMap;

  // Gets user coords in order to center map
  function buildMap(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(res => {
        const userCoords = [res.coords.latitude, res.coords.longitude];

        // Creates a new map using user coords
        myMap = L.map('mapid').setView(userCoords, 11);

        // Styles newly created map
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/dark-v10',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1IjoiZ2FycmV0dG1yb2JlcnRzIiwiYSI6ImNrN2Rxcm4zYjAwbmkzZm50NXh5d211MnEifQ.QfPRfpUkyKGIjSdjfAzMkg'
        }).addTo(myMap);
      });
    }
    // Otherwise, creates a generic map
    else {
      alert('You need to enable location services for best app experience.');
      // Creates a new map using generic coords
      var userCoords = ['40.115791', '-100.603986'];
      myMap = L.map('mapid').setView(userCoords, 4);

      // Styles newly created map
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/dark-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZ2FycmV0dG1yb2JlcnRzIiwiYSI6ImNrN2Rxcm4zYjAwbmkzZm50NXh5d211MnEifQ.QfPRfpUkyKGIjSdjfAzMkg'
      }).addTo(myMap);
    }

    callback();
  }

  function populatePins() {
    $.ajax({
      url:'/api/notes/all',
      type: 'GET'
    }).then(res => {
      // Returns notes left by users with a status of '1'
      res.filter(data => data.User.status === '1');
      res.forEach(data => {
        let note = data.body;
        let latLong = [parseFloat(data.Location.latitude), parseFloat(data.Location.longitude)];
        let marker = L.marker(latLong).addTo(myMap);
        marker.bindPopup(note);
      });
    });
  }

  buildMap(populatePins);
});
