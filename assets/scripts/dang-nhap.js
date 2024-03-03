// Kiểm tra tính hợp lệ của thông tin đăng nhập

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = form.querySelector("input[name='username']").value;
    const password = form.querySelector("input[name='password']").value;
    const user = JSON.parse(localStorage.getItem(username));

    if (username === "" || password === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    else if(user === null){
      alert("Tài khoản không tồn tại!");
    }
    else if(password !== user.password){
      alert("Mật khẩu không chính xác!");
    }
    else{
      window.location.href = "../../assets/features/trang-user.html";
    }
});
