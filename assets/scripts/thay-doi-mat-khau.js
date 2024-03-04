const form = document.querySelector("form");

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const password = form.querySelector("input[name='current-password']").value;
  const new_password = form.querySelector("input[name='new-password']").value;
  const confirm_password = form.querySelector("input[name='confirm-password']").value;
  const currentUsername = localStorage.getItem('currentUsername');
  const users = JSON.parse(localStorage.getItem('users'));
  for(var i = 0 ; i < users.length ; i++){
    if(users[i].username === currentUsername){
      current_user = users[i];
      break;
    }
  }
  if(current_user === null){
    alert('Tên tài khoản không chính xác!');
  }
  else if(password !== current_user.password){
    alert("Mật khẩu hiện tại không chính xác!");
  }
  else if(new_password !== confirm_password){
    alert("Nhập lại mật khẩu không khớp");
  }
  else{
    for(var i = 0 ; i < users.length ; i++){
      if(users[i].username === current_user.username){
        users[i].password = new_password;
        break;
      }
    }
    localStorage.setItem('users', JSON.stringify(users));
    alert("Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại!");
    window.location.href= "dang-nhap.html";
  }
});
