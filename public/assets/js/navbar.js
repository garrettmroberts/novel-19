$(document).ready(() => {

  // My Profile button is clicked on index page. Get request to get profile page.
  $('#myProfileButton').on('click', () => {
    $.get('/profile')
      .then(() => {
        window.location.replace('/profile');
      })
      .catch((err) => {
        console.log(err);
        window.location.replace('/home');
      });
  });

  // Logout button is clicked. Get request to api route POST /api/logout.
  $('.logoutButton').on('click', () => {
    $.get('/api/logout')
      .then(() => {
        window.location.replace('/home');
      })
      .catch((err) => {
        console.log(err);
        window.location.replace('/home');
      });
  });

  // Home button is clicked. Get request to html route GET /home.
  $('.homeButton').on('click', ()=> {
    $.get('/home')
      .then(() => {
        window.location.replace('/home');
      });
  });

  // Infected button is clicked. PUT request to api route PUT /api/status.
  $('#infectedModalButton').on('click', () => {
    $.ajax({ url: '/api/status', method: 'PUT' })
      .then(() => {
        window.location.replace('/profile');
      });
  });

  // User clicks hamburger menu. Toggle is-active class.
  $('#navbarToggle').on('click', () => {

    $('#navbarItems').toggleClass('is-active');
  });
});