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
  let h2_elem = $('<h4>');
  h2_elem.text(curText);
  let parent = cur.closest('div');
  parent.prepend(h2_elem);
  cur.remove();
}

function getUserById () {
  $.ajax({
    url: 'https://reqres.in/api/users',
    success: function(data) {
      userInfo(data);
    }
  })
}

function userInfo(data){
  for (let i=0; i<data.data.length; i++){
  let userId = data.data[i];
  console.log(userId);

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

  containerName.text(userId.first_name + ' ' + userId.last_name);
  containerEmail.text(userId.email);
  containerAvatar.attr('src', userId.avatar);

  container.append(containerName);
  container.append(containerEmail);
  container.append(containerAvatar);
  container.addClass('user');

  containerName.on('dblclick', changeVal)

  $('.users').append(container);
  }
}


$('.myForm').on('submit', function(event){
  event.preventDefault();
  let title = $('#title').val();
  console.log(title);

  $('.users').append(getUserById());
})

