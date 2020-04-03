$(document).ready(() => {
  const addNoteButton = $('#add-note-button');
  const noteInput = $('#note-input');
  const noteHelpText = $('#note-help-text');
  let isValid = false;
  let coords;


  // Initialize the places library.
  const placesAutocomplete = places({
    appId: 'pl9T9H0MC1H7',
    apiKey: 'ca4802ec76ed8a2eab627fc4eae7ddbb',
    container: document.querySelector('#address-input')
  });

  // Gets value from input field and runs autocomplete to guess what the user is trying to type.
  const address = $('#address-value');
  placesAutocomplete.on('change', (e) => {
    address.textContent = e.suggestion.value;
    // Get the data from the address typed.
    coords = e.suggestion.latlng;
    addressLine = e.suggestion.name + ' ' + e.suggestion.city;
    country = e.suggestion.country;
    state = e.suggestion.administrative;
    zipcode = e.suggestion.postcode;
    latitude = e.suggestion.latlng.lat;
    longitude = e.suggestion.latlng.lng;
  });

  // Clears autocomplete.
  placesAutocomplete.on('clear', () => {
    address.textContent = 'none';
  });

  // addLocation does a post to our "api/addlocation" route
  addLocation = (data) => {
    console.log('location');
    $.post('/api/addlocation', {
      addressLine: data.addressLine,
      country: data.country,
      state: data.state,
      zipcode: data.zipcode,
      latitude: data.latitude,
      longitude: data.longitude

    })
      .then(() => {
        window.location.replace('/');
        // If there's an error, log the error
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // addNote does a post to our "api/addnote" route
  addNote = (data) => {
    console.log('note');
    $.post('/api/addnote', {
      body: data.note,
      addressLine: data.addressLine

    })
      .then(() => {
        window.location.replace('/');
        // If there's an error, log the error
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // When save is clicked hit api routes with data.
  addNoteButton.on('click', () => {
    event.preventDefault();

    if (isValid) {
      const data = {
        addressLine: addressLine,
        country: country,
        state: state,
        zipcode: zipcode,
        latitude: latitude,
        longitude: longitude,
        note: noteInput.val().trim()
      };
      addLocation(data);
      if (!data.note) {
        return;
      }
      addNote(data);
    }
  });

  // Tyler's code ====================================================
  // Function: validates user input
  const validateInput = function() {
    let length = noteInput.val().trim().length;
    // Should be 1-120 characters.
    if (length > 0 && length < 121) {
      noteInput.removeClass('is-danger');
      noteHelpText.addClass('is-invisible');
      isValid = true;
    }
    else {
      noteInput.addClass('is-danger');
      noteHelpText.removeClass('is-invisible');
      isValid = false;
    }
  };

  // Whenever user presses a key in the note's textarea, validate input length.
  noteInput.on('keyup', validateInput);
  // =================================================================

  $('#myNotesModalButton').on('click', function(event) {
    $.ajax({
      url: '/api/notes/user',
      type: 'GET'
    }).then((results) => {
      console.log(results.Notes);
    });
  });
});
