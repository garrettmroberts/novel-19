$(document).ready(() => {
  const addNoteButton = $('#add-note-button');
  const updateNoteButton = $('#update-note-button');
  const noteHelpText = $('#note-help-text');
  const noteInput = $('#note-input');
  const noteInputUpdate = $('#note-input-update');
  const noteUpdateHelpText = $('#note-update-help-text');
  const deleteNoteButton = $('#delete-note-button');
  let isValid = false;
  let placesAutocomplete;

  const getApiKey = function() {
    // get api key
    $.get('/api/key/algolia')
      .then((key) => {
        // Initialize the places library.
        placesAutocomplete = places({
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
    });
  }
  getApiKey();


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
        addNote(data);
        // window.location.replace('/');
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
        // window.location.replace('/');
        location.reload();
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
      // if (!data) {
      //   return;
      // }
      addLocation(data);
      // addNote(data);
    }
  });

  // When update is clicked hit api routes with data.
  updateNoteButton.on('click', () => {
    event.preventDefault();

    // Value was stored in local storage in profile.js.
    let noteId = localStorage.getItem('noteId');

    if (isValid) {
      $.ajax({
        url: '/api/note/update',
        method: 'PUT',
        data: {
          body: noteInputUpdate.val().trim(),
          id: noteId
        }
      })
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.log(err);
          location.reload();
        });
    }
  });

  // When delete is clicked hit api route to delete data.
  deleteNoteButton.on('click', () => {
    event.preventDefault();

    // Value was stored in local storage in profile.js
    let noteId = localStorage.getItem('noteId');

    $.ajax({
      url: '/api/note/delete',
      type: 'DELETE',
      data: { id: noteId }
    })
      .then(() => {
        location.reload();
      })
      .catch((err) => {
        console.log(err);
        location.reload();
      });
  });

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

  // Function: validates user input for updating note body.
  const validateUpdateInput = function() {
    let length = noteInputUpdate.val().trim().length;
    // Should be 1-120 characters.
    if (length > 0 && length < 121) {
      noteInputUpdate.removeClass('is-danger');
      noteUpdateHelpText.addClass('is-invisible');
      isValid = true;
    }
    else {
      noteInputUpdate.addClass('is-danger');
      noteUpdateHelpText.removeClass('is-invisible');
      isValid = false;
    }
  };

  // Whenever user presses a key in the note's textarea, validate input length.
  noteInput.on('keyup', validateInput);
  noteInputUpdate.on('keyup', validateUpdateInput);

});
