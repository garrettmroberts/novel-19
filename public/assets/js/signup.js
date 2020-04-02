$(document).ready(() => {
  // Getting references to our form and inputs
  const signUpForm = $('#signup');
  const signUpUsernameInput = $('#signupUsername');
  const signUpPasswordInput = $('#signupPassword');
  const birthYearInput = $('#birthYear');

  // signUpUser does a post to our "api/signup" route
  signUpUser = (username, password, birthYear) => {
    $.post('/api/signup', {
      username: username,
      password: password,
      yearBorn: birthYear
    })
      .then(() => {
        window.location.replace('/');
        // If there's an error, log the error
      })
      .catch((err) => {
        console.log(err);
      });
  };

  signUpForm.on('submit', () => {
    event.preventDefault();
    const userData = {
      username: signUpUsernameInput.val().trim(),
      password: signUpPasswordInput.val().trim(),
      birthYear: birthYearInput.val().trim()
    };

    if (!userData.username || !userData.password || !userData.birthYear) {
      return;
    }
    // If we have an username and password run the loginUser function and clear the form
    signUpUser(userData.username, userData.password, userData.birthYear);
    signUpUsernameInput.val('');
    signUpPasswordInput.val('');
    birthYearInput.val('');
  });
});