$(document).ready(() => {
  // My Profile button is clicked on index page. Get request to get profile page.
  $('#myProfileButton').on('click', () => {
    $.get('/profile')
      .then((data) => {
        $('#member-name').text(data.username);
        $('#member-year-born').text(data.age);
        $('#member-status').text(data.status);

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
});