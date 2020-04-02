
let coords;

// Initialize the places library.
const placesAutocomplete = places({
  appId: 'pl9T9H0MC1H7',
  apiKey: 'ca4802ec76ed8a2eab627fc4eae7ddbb',
  container: document.querySelector('#address-input')
});

// Gets value from input field and runs autocomplete to guess what the user is trying to type.
const $address = document.querySelector('#address-value');
placesAutocomplete.on('change', (e) => {
  $address.textContent = e.suggestion.value;
  // Get the latlng coordinates from address typed.
  coords = e.suggestion.latlng;
  console.log(coords);
});

// Clears autocomplete.
placesAutocomplete.on('clear', () => {
  $address.textContent = 'none';
});

