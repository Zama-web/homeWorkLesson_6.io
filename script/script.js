function changeVal() {
  let cur = $(this);
  let curText = cur.text();
  let input = $('<input>');
  input.val(curText);
  let parent = cur.closest('div');
  parent.prepend(input);
  cur.remove();
  input.on('blur', saveChange);
};

function saveChange() {
  let cur = $(this);
  let curText = cur.val();
  let h2_elem = $('<h2>');
  h2_elem.text(curText);
  let parent = cur.closest('div');
  parent.prepend(h2_elem);
  cur.remove();
}

function getUserById(id) {
  let url = `https://reqres.in/api/users/` + `${id}`;

  $.ajax({
    type: 'GET',
    url,
    success: function (data) {
      userInfo(data.data);
    },
  })
}

function userInfo(user) {

  let container = $('<div>');
  let containerName = $('<h2>');
  let containerEmail = $('<p>')
  let containerAvatar = $('<img>');

  let closeX = $('<div>');
  closeX.addClass('close');
  closeX.text('x');
  container.append(closeX);

  closeX.on('click', function () {
    $(this).closest('.user').remove();
  })

  containerName.text(user.first_name + ' ' + user.last_name);
  containerEmail.text(user.email);
  containerAvatar.attr('src', user.avatar);

  container.append(containerName);
  container.append(containerEmail);
  container.append(containerAvatar);
  container.addClass('user');

  containerName.on('dblclick', changeVal)

  $('.users').append(container);

  return container;
}


$('.myForm').on('submit', function(event) {
  event.preventDefault();
  let title = $('#title').val();
  if (title) {
    getUserById(title);
  }
})

