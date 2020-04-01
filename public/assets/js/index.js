
(function() {
  var placesAutocomplete = places({
    appId: 'pl9T9H0MC1H7',
    apiKey: 'ca4802ec76ed8a2eab627fc4eae7ddbb',
    container: document.querySelector('#address-input')
  });

  var $address = document.querySelector('#address-value');
  placesAutocomplete.on('change', function(e) {
    $address.textContent = e.suggestion.value;
    console.log($address.textContent);
  });

  placesAutocomplete.on('clear', function() {
    $address.textContent = 'none';
  });

})();