$(document).ready(() => {
  // On page load. GET request to retrieve user notes.
  $.get('/api/notes/user')
    .then((data) => {
      let userNotesListDiv = $('#user-notes-list');

      if (data.Notes.length < 1) {
        let html = `
        <a class="panel-block is-block">
          <div>
            <p class="is-size-6 has-text-centered has-text-dark is-italic">You haven't added any notes yet.</p>
          </div>
        </a>
        `;

        userNotesListDiv.after(html);
        return;
      }
      // Display each note.
      data.Notes.forEach(note => {
        console.log('NOTE: ', note);

        // Fix date syntax.
        const createdAt = note.createdAt.split('');
        let date = (createdAt.slice(8, 10)).join('') + '/' + (createdAt.slice(5, 7)).join('') + '/' + (createdAt.slice(0, 4)).join('');
        let time = (createdAt.slice(11, 16)).join('');
        let displayTime = `${date} at ${time}`;

        // Fix location syntax.
        let location = note.Location.addressLine.replace('undefined', '');

        // Note to be displayed on profile page
        let html = `
        <a class="panel-block is-block updateNotePanel">
          <div class="columns is-mobile">
            <div class="column has-text-left is-three-quarters profile-note-body">
              <p class="is-size-6 has-text-dark" id="profile-note-body-text>${note.body}<p>
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
          <div class="is-hidden profile-note-id">${note.id}</div>
        </a>
        `;
        userNotesListDiv.after(html);

        // Note panel is cicked. The user is presented with updateNote modal. Added after note
        // list panels have loaded.
        $('.updateNotePanel').on('click', function() {
          // Store ID in local storage for user when user clicks to update.
          localStorage.setItem('noteId', $(this)[0].lastElementChild.textContent);

          $('#updateNoteModal').addClass('is-active');
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });

  // Update status button is clicked. PUT request to api route PUT /api/status.
  $('.statusButton').on('click', () => {
    $.ajax({ url: '/api/status', method: 'PUT' })
      .then(() => {
        window.location.replace('/profile');
      });

    $('#infectedModal').addClass('is-active');
    setTimeout(function() { $('#infectedModal').removeClass('is-active'); }, 2000);
  });

  // NOTE: button to add note (class="addNoteModalButton" has functionality in index.js).
});
