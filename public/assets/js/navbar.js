$(document).ready(() => {

  // User clicks hamburger menu. Toggle is-active class.
  $('#navbarToggle').on('click', () => {

    $('#navbarItems').toggleClass('is-active');
  });
});