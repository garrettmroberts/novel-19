$(document).ready(function () {
  // Getting references to our form and inputs
  const loginform = $('#login');
  const loginUsernameInput = $('#loginUsername');
  const loginPasswordInput = $('#loginPassword');

  // loginUser does a post to our "api/login" route
  function loginUser(username, password) {
    $.post('/api/login', {
      username: username,
      password: password
    })
      .then(function() {
        window.location.replace('/');
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  loginform.on('submit', function () {
    event.preventDefault();
    const userData = {
      username: loginUsernameInput.val().trim(),
      password: loginPasswordInput.val().trim()
    };

    if (!userData.username || !userData.password) {
      return;
    }
    // If we have an username and password run the loginUser function and clear the form
    loginUser(userData.username, userData.password);
    loginUsernameInput.val('');
    loginPasswordInput.val('');
  });
});