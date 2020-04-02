$(document).ready(function () {
  // Getting references to our form and inputs
  const loginform = $('#login');
  const loginUsernameInput = $('#loginUsername');
  const loginPasswordInput = $('#loginPassword');

  // loginUser does a post to our "api/login" route
  function loginUser(username, password) {
    console.log('inside loginUser');
    $.post('/api/login', {
      username: username,
      password: password
    })
      .then(function() {
        console.log('BEFORE REPLACE');
        window.location.replace('/');
        console.log('AFTER REPLACE');
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  loginform.on('submit', function () {
    console.log('inside loginform submit');
    event.preventDefault();
    const userData = {
      username: loginUsernameInput.val().trim(),
      password: loginPasswordInput.val().trim()
    };

    if (!userData.username || !userData.password) {
      return;
    }
    console.log('under if');
    // If we have an username and password run the loginUser function and clear the form
    loginUser(userData.username, userData.password);
    loginUsernameInput.val('');
    loginPasswordInput.val('');
  });
});