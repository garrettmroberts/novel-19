$(document).ready(function () {
  // Getting references to our form and inputs
  const signUpForm = $('#signup');
  const usernameInput = $('#username');
  const passwordInput = $('#password');
  const birthYearInput = $('#birthYear');

  // loginUser does a post to our "api/signup" route
  function signUpUser(username, password, birthYear) {
    $.post('/api/signup', {
      username: username,
      password: password,
      birthYear: birthYear
    })
      .then(function() {
        window.location.replace('/');
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  signUpForm.on('submit', function () {
    event.preventDefault();
    const userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
      birthYear: birthYearInput.val().trim()
    };

    if (!userData.username || !userData.password || !userData.birthYear) {
      return;
    }
    // If we have an username and password run the loginUser function and clear the form
    signUpUser(userData.username, userData.password, userData.birthYear);
    usernameInput.val('');
    passwordInput.val('');
    birthYear.val('');
  });
});