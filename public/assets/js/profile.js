$(document).ready(() => {

  // On page load. GET request to retrieve user notes.
  $.get('/api/notes/user')
    .then((data) => {
      console.log('DATA: ', data);
      let userNotesListDiv = $('#user-notes-list');
      // Display each note.
      data.Notes.forEach(note => {

        // Fix date syntax.
        const createdAt = note.createdAt;
        let day = createdAt.split('').slice(5, 7).join('');
        let month = (createdAt.split('').slice(8, 10)).join('');
        let year = (createdAt.split('').slice(0, 4)).join('');
        let time = (createdAt.split('').slice(11, 16)).join('');
        let displayTime = `${month}/${day}/${year} at ${time}`;

        // Fix location syntax.
        let location = note.Location.addressLine.replace('undefined', '');

        let html = `
        <a class="panel-block is-block">
          <div class="columns is-mobile">
            <div class="column has-text-left is-three-quarters profile-note-body">
              <p class="is-size-6 has-text-dark">${note.body}<p>
            </div>
            <div class="column has-text-right profile-note-location">
              <p class="is-size-6 has-text-grey-darker">${location}</p>
            </div>
          </div>
          <div class="columns is-mobile">
            <div class="column has-text-left profile-note-time">
              <p class="is-size-7 has-text-grey is-italic">${displayTime}</p>
            </div>
          </div>
        </a>
        `;
        userNotesListDiv.after(html);
      });
      console.log('AFTER FOREACH: ', userNotesListDiv);
    })
    .catch((err) => {
      console.log(err);
    });

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

  // Update status button is clicked. PUT request to api route PUT /api/status.
  $('.statusButton').on('click', () => {
    $.ajax({ url: '/api/status', method: 'PUT' })
      .then(() => {
        window.location.replace('/profile');
      });
  });
});