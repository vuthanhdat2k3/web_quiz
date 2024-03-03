// Kiểm tra tính hợp lệ của thông tin đăng ký

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = form.querySelector("input[name='username']").value;
    const email = form.querySelector("input[name='email']").value;
    const password = form.querySelector("input[name='password']").value;
    const confirmPassword = form.querySelector("input[name='confirm_password']").value;
    var user = {
      username: username,
      email: email,
      password: password,
    };
    localStorage.setItem(username, JSON.stringify(user)); 

    if (username === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    else if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
    }
    else {
      alert("Đăng ký thành công!");
    }

});
