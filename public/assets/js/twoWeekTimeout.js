// Changes user status to clear on page load if 14 days have passed since testing positive.
$.ajax({
  url: '/api/users/all',
  type: 'GET'
}).then(function(res) {
  res.forEach(user => {
    const userDate = user.updatedAt.split(/[-T]/)[1];
    const d = new Date();
    const day = d.getDate();
    if (userDate % day >= 14 && user.status === '1') {
      user.status = '0';
    }
  });
});