// Gets user coords in order to center map
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(res => {
    const userCoords = [res.coords.latitude, res.coords.longitude];

    // Creates a new map using user coords
    var mymap = L.map('mapid').setView(userCoords, 11);

    // Styles newly created map
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/dark-v10',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiZ2FycmV0dG1yb2JlcnRzIiwiYSI6ImNrN2Rxcm4zYjAwbmkzZm50NXh5d211MnEifQ.QfPRfpUkyKGIjSdjfAzMkg'
    }).addTo(mymap);
  });
}
else {
  alert('You need to enable location services for best app experience.');
  // Creates a new map using generic coords
  var userCoords = ['40.115791', '-100.603986'];
  mymap = L.map('mapid').setView(userCoords, 4);

  // Styles newly created map
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ2FycmV0dG1yb2JlcnRzIiwiYSI6ImNrN2Rxcm4zYjAwbmkzZm50NXh5d211MnEifQ.QfPRfpUkyKGIjSdjfAzMkg'
  }).addTo(mymap);
}

$('#infectedModalButton').on('click', function() {
  $('#infectedModal').addClass('is-active');
});

$('#signUpModalButton').on('click', function() {
  $('#signUpModal').addClass('is-active');
});

$('#signInModalButton').on('click', function() {
  $('#signInModal').addClass('is-active');
});

$('#statsButton').on('click', function() {
  $('#d3Modal').addClass('is-active');
});

$('#addNoteModalButton').on('click', function() {
  $('#addNoteModal').addClass('is-active');
});

$('#myNotesModalButton').on('click', () => $('#myNotesModal').addClass('is-active'));
$('#myLocationsModalButton').on('click', () => $('#myLocationsModal').addClass('is-active'));

$('.deleteButton').on('click', function() {
  $('.modal').removeClass('is-active');
});
