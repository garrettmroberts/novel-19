$(document).ready(() => {
  $('#signupUsernameForm').keyup(() => {
    $('#signupUsername').removeClass('is-danger');
    $('#signupUsername').removeClass('is-success');
    $('#signupUsernameForm').children().remove('p');

    if ($('#signupUsername').val().length < 8) {
      $('#signupUsername').addClass('is-danger');
      $('#signupUsernameForm').append('<p class="help is-danger">Username must be 8 characters or more.</p>');
    }
    else {
      $('#signupUsername').addClass('is-success');
    }
  });

  $('#signupPasswordForm').keyup(() => {
    $('#signupPassword').removeClass('is-danger');
    $('#signupPassword').removeClass('is-success');
    $('#signupPasswordForm').children().remove('p');

    if ($('#signupPassword').val().length < 8) {
      $('#signupPassword').addClass('is-danger');
      $('#signupPasswordForm').append('<p class="help is-danger">Username must be 8 characters or more.</p>');
    }
    else {
      $('#signupPassword').addClass('is-success');
    }
  });

  $('#signupYearForm').keyup(() => {
    $('#birthYear').removeClass('is-danger');
    $('#birthYear').removeClass('is-success');
    $('#signupYearForm').children().remove('p');

    if ($('#birthYear').val() < 1920 || $('#birthYear').val() > 2020) {
      $('#birthYear').addClass('is-danger');
      $('#signupYearForm').append('<p class="help is-danger">Enter a valid year.</p>');
    }
    else {
      $('#birthYear').addClass('is-success');
    }
  });

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

  $('#myNotesModalButton').on('click', function() {
    $('#myNotesModal').addClass('is-active');
  });

  $('#myLocationsModalButton').on('click', () => $('#myLocationsModal').addClass('is-active'));

  $('.deleteButton').on('click', function() {
    $('.modal').removeClass('is-active');
  });
});
